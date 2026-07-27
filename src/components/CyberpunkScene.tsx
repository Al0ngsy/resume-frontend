"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Dystopian cyberpunk city — free-flight bird's-eye camera.
 *
 * Performance optimizations:
 * - Single InstancedMesh for ALL buildings (1 draw call vs ~600)
 * - Shared geometry + shared materials (3 color variants)
 * - Frame limiting: pauses rendering when tab is hidden
 * - Reduced DPR clamp [1, 1.5] instead of [1, 2]
 * - frameloop="demand" fallback not viable (need continuous animation),
 *   but visibility API pause saves battery when tab is backgrounded
 * - Fog culls distant buildings naturally
 */

const NEON_YELLOW = "#FCEE0A";
const NEON_CYAN = "#00F0FF";
const NEON_RED = "#FF003C";

const CITY_RANGE = 90;
const BLOCK_SPACING = 3;
const BUILDING_MIN_H = 1;
const BUILDING_MAX_H = 8;
const SPEED = 3; // units per second forward flight (was 8 — too fast)

type Building = {
  x: number;
  z: number;
  h: number;
  w: number;
  d: number;
  colorIndex: number; // 0=yellow, 1=cyan, 2=red
  opacity: number;
};

const COLOR_HEX = [NEON_YELLOW, NEON_CYAN, NEON_RED];

function generateBuildings(seed: number): Building[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const buildings: Building[] = [];
  const half = CITY_RANGE / 2;
  const count = Math.floor(CITY_RANGE / BLOCK_SPACING);

  for (let gx = 0; gx < count; gx++) {
    for (let gz = 0; gz < count; gz++) {
      if (rand() < 0.18) continue;

      const x = gx * BLOCK_SPACING - half + (rand() - 0.5) * 0.5;
      const z = gz * BLOCK_SPACING - half + (rand() - 0.5) * 0.5;
      const h = BUILDING_MIN_H + rand() * (BUILDING_MAX_H - BUILDING_MIN_H);
      const w = 1.2 + rand() * 0.6;
      const d = 1.2 + rand() * 0.6;

      const r = rand();
      const colorIndex = r > 0.75 ? 0 : r > 0.2 ? 1 : 2;
      const opacity = 0.3 + rand() * 0.4;

      buildings.push({ x, z, h, w, d, colorIndex, opacity });
    }
  }
  return buildings;
}

// Reusable temp objects to avoid per-frame allocation
const _matrix = new THREE.Matrix4();
const _position = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _color = new THREE.Color();

/**
 * Instanced city — ALL buildings in a single InstancedMesh draw call.
 * Each frame, every instance's position is wrapped toroidally around
 * the camera. Instance colors are set once at init.
 */
function InstancedCity({
  buildings,
  camPosRef,
}: {
  buildings: Building[];
  camPosRef: React.RefObject<THREE.Vector3>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const halfRange = CITY_RANGE / 2;

  // Init: set per-instance color once + disable frustum culling
  // (instances wrap around the camera, so the mesh's bounding sphere
  // at the origin is meaningless — Three.js would cull it incorrectly)
  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.frustumCulled = false;
    for (let i = 0; i < buildings.length; i++) {
      _color.set(COLOR_HEX[buildings[i].colorIndex]);
      meshRef.current.setColorAt(i, _color);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [buildings]);

  useFrame(() => {
    const mesh = meshRef.current;
    const cam = camPosRef.current;
    if (!mesh || !cam) return;

    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i];

      // Toroidal wrap relative to camera
      let dx = b.x - cam.x;
      let dz = b.z - cam.z;
      dx = ((dx + halfRange) % CITY_RANGE + CITY_RANGE) % CITY_RANGE - halfRange;
      dz = ((dz + halfRange) % CITY_RANGE + CITY_RANGE) % CITY_RANGE - halfRange;

      _position.set(cam.x + dx, b.h / 2, cam.z + dz);
      _scale.set(b.w, b.h, b.d);
      _matrix.compose(_position, new THREE.Quaternion(), _scale);
      mesh.setMatrixAt(i, _matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, buildings.length]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe transparent />
    </instancedMesh>
  );
}

/**
 * Ground plane that follows the camera.
 */
function FollowingGround({
  camPosRef,
}: {
  camPosRef: React.RefObject<THREE.Vector3>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) meshRef.current.frustumCulled = false;
  }, []);

  useFrame(() => {
    if (!meshRef.current || !camPosRef.current) return;
    meshRef.current.position.x = camPosRef.current.x;
    meshRef.current.position.z = camPosRef.current.z;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[300, 300]} />
      <meshBasicMaterial color="#0a0a0f" transparent opacity={0.85} />
    </mesh>
  );
}

/**
 * Scan lines — neon sweep planes scanning across the city in all 4
 * cardinal directions (forward / backward / left / right relative to
 * flight yaw). Both horizontal (flat on ground) and vertical (standing
 * upright) lines spawn, each with a random phase so they appear at
 * random times, and a rest period between sweeps so spawns feel discrete.
 *
 * Each line is an individual <mesh> (count is small, ~6 per orientation)
 * so per-instance opacity fade works (InstancedMesh shares one material).
 */
const SCAN_LINE_LENGTH = 50;
const SCAN_LINE_THICKNESS = 0.2;
const SCAN_SWEEP_DIST = 35;
const SCAN_H_COUNT = 6;
const SCAN_V_COUNT = 6;
const SCAN_FADE = 0.4;
// Fraction of each cycle spent visibly sweeping; the rest is downtime
// (line invisible), which makes spawns feel discrete rather than looped.
const SWEEP_FRACTION = 0.6;

const SCAN_COLORS = [NEON_YELLOW, NEON_CYAN];

type ScanInstance = {
  direction: number; // 0=forward, 1=backward, 2=left, 3=right
  phase: number; // random 0..1 cycle offset → random spawn time
  speed: number; // cycles per second
  colorIndex: number; // 0=yellow, 1=cyan
};

function generateScanInstances(
  seed: number,
  count: number,
): ScanInstance[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const arr: ScanInstance[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      direction: Math.floor(rand() * 4),
      phase: rand(),
      speed: 0.2 + rand() * 0.3, // 0.2–0.5 cycles/s (~2–5s full cycle)
      colorIndex: rand() > 0.5 ? 0 : 1,
    });
  }
  return arr;
}

// Reusable temp objects for scan-line math
const _scanPos = new THREE.Vector3();
const _scanQuat = new THREE.Quaternion();
const _scanBasis = new THREE.Matrix4();
const _sUp = new THREE.Vector3(0, 1, 0);
const _sDir = new THREE.Vector3();
const _sPerp = new THREE.Vector3();
const _sXa = new THREE.Vector3();
const _sYa = new THREE.Vector3();
const _sZa = new THREE.Vector3();

function ScanLines({
  camPosRef,
  yawRef,
  instances,
  orientation,
}: {
  camPosRef: React.RefObject<THREE.Vector3>;
  yawRef: React.RefObject<number>;
  instances: ScanInstance[];
  orientation: "horizontal" | "vertical";
}) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((m) => {
      if (m) m.frustumCulled = false;
    });
  }, []);

  const geomArgs: [number, number] =
    orientation === "horizontal"
      ? [SCAN_LINE_LENGTH, SCAN_LINE_THICKNESS]
      : [SCAN_LINE_THICKNESS, SCAN_LINE_LENGTH];

  useFrame((state) => {
    const cam = camPosRef.current;
    if (!cam) return;
    const yaw = yawRef.current;
    const t = state.clock.elapsedTime;

    // Direction vectors for the 4 cardinals, relative to flight yaw.
    // forward = (sin, -cos); right is forward rotated +90° about Y.
    const dirTable = [
      [Math.sin(yaw), -Math.cos(yaw)], // 0 forward
      [-Math.sin(yaw), Math.cos(yaw)], // 1 backward
      [-Math.cos(yaw), -Math.sin(yaw)], // 2 left
      [Math.cos(yaw), Math.sin(yaw)], // 3 right
    ];

    for (let i = 0; i < instances.length; i++) {
      const mesh = refs.current[i];
      if (!mesh) continue;
      const inst = instances[i];

      const cycle = (t * inst.speed + inst.phase) % 1;
      const mat = mesh.material as THREE.MeshBasicMaterial;

      if (cycle >= SWEEP_FRACTION) {
        // Downtime: invisible between sweeps (discrete random spawns).
        mat.opacity = 0;
        continue;
      }

      // Local progress within the visible sweep (0..1).
      const local = cycle / SWEEP_FRACTION;
      const d = dirTable[inst.direction];
      _sDir.set(d[0], 0, d[1]).normalize();
      _sPerp.crossVectors(_sUp, _sDir).normalize(); // horizontal perpendicular

      const dist = local * SCAN_SWEEP_DIST;
      // Vertical lines stand on the ground; horizontal lines lie on it.
      const y =
        orientation === "vertical" ? SCAN_LINE_LENGTH / 2 : 0.02;
      _scanPos.set(cam.x + _sDir.x * dist, y, cam.z + _sDir.z * dist);

      // Build an orientation basis from the sweep direction.
      // Geometry is a plane in XY (normal +Z); we map its local axes
      // so the long axis spans perpendicular to the sweep (horizontal)
      // or straight up (vertical), and the thin axis aligns with sweep.
      if (orientation === "horizontal") {
        // geom [LENGTH, THICK]: X(long)->perp, Y(thin)->dir, Z(normal)->up
        _sXa.copy(_sPerp);
        _sYa.copy(_sDir).multiplyScalar(-1);
        _sZa.copy(_sUp);
      } else {
        // geom [THICK, LENGTH]: X(thin)->dir, Y(long)->up, Z(normal)->perp
        _sXa.copy(_sDir);
        _sYa.copy(_sUp);
        _sZa.copy(_sPerp).multiplyScalar(-1);
      }
      _scanBasis.makeBasis(_sXa, _sYa, _sZa);
      _scanQuat.setFromRotationMatrix(_scanBasis);

      mesh.position.copy(_scanPos);
      mesh.quaternion.copy(_scanQuat);

      // Fade in then out over the visible sweep.
      mat.opacity = Math.sin(local * Math.PI) * SCAN_FADE;
    }
  });

  return (
    <>
      {instances.map((inst, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <planeGeometry args={geomArgs} />
          <meshBasicMaterial
            color={SCAN_COLORS[inst.colorIndex]}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

/**
 * Flying cars — small wireframe vehicles zipping between buildings.
 * Uses InstancedMesh (1 draw call for all cars) with per-frame position
 * updates. Each car has its own velocity and wraps toroidally like buildings.
 */
const CAR_COUNT = 30;

type Car = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vz: number;
  colorIndex: number;
};

function generateCars(seed: number): Car[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const cars: Car[] = [];
  const halfRange = CITY_RANGE / 2;

  for (let i = 0; i < CAR_COUNT; i++) {
    const angle = rand() * Math.PI * 2;
    const speed = 2 + rand() * 3;
    cars.push({
      x: rand() * CITY_RANGE - halfRange,
      y: 2 + rand() * 5, // fly at building-mid height
      z: rand() * CITY_RANGE - halfRange,
      vx: Math.cos(angle) * speed,
      vz: Math.sin(angle) * speed,
      colorIndex: rand() > 0.5 ? 0 : 1, // yellow or cyan
    });
  }
  return cars;
}

function FlyingCars({
  cars,
  camPosRef,
}: {
  cars: Car[];
  camPosRef: React.RefObject<THREE.Vector3>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const halfRange = CITY_RANGE / 2;

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.frustumCulled = false;
    for (let i = 0; i < cars.length; i++) {
      _color.set(cars[i].colorIndex === 0 ? NEON_YELLOW : NEON_CYAN);
      meshRef.current.setColorAt(i, _color);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [cars]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const cam = camPosRef.current;
    if (!mesh || !cam) return;

    const dt = Math.min(delta, 0.1); // clamp delta to avoid jumps

    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];

      // Move car
      c.x += c.vx * dt;
      c.z += c.vz * dt;

      // Toroidal wrap relative to camera
      let dx = c.x - cam.x;
      let dz = c.z - cam.z;
      dx = ((dx + halfRange) % CITY_RANGE + CITY_RANGE) % CITY_RANGE - halfRange;
      dz = ((dz + halfRange) % CITY_RANGE + CITY_RANGE) % CITY_RANGE - halfRange;

      // Bob slightly for life
      const bob = Math.sin(state.clock.elapsedTime * 2 + i) * 0.15;

      // Orient car along velocity direction
      const angle = Math.atan2(c.vx, c.vz);
      _position.set(cam.x + dx, c.y + bob, cam.z + dz);
      _scale.set(0.4, 0.15, 0.7); // small elongated box
      const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0));
      _matrix.compose(_position, quat, _scale);
      mesh.setMatrixAt(i, _matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, cars.length]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe transparent opacity={0.8} />
    </instancedMesh>
  );
}

/**
 * Sky vehicles — planes and zeppelins flying high above the city.
 * Same InstancedMesh approach: 1 draw call each, toroidal wrap.
 */
type SkyVehicle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vz: number;
  colorIndex: number;
};

function generateSkyVehicles(seed: number, count: number, minY: number, maxY: number): SkyVehicle[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const vehicles: SkyVehicle[] = [];
  const halfRange = CITY_RANGE / 2;

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const speed = 1.5 + rand() * 2;
    vehicles.push({
      x: rand() * CITY_RANGE - halfRange,
      y: minY + rand() * (maxY - minY),
      z: rand() * CITY_RANGE - halfRange,
      vx: Math.cos(angle) * speed,
      vz: Math.sin(angle) * speed,
      colorIndex: rand() > 0.5 ? 0 : 1,
    });
  }
  return vehicles;
}

function FlyingSkyVehicles({
  vehicles,
  camPosRef,
  scaleX,
  scaleY,
  scaleZ,
}: {
  vehicles: SkyVehicle[];
  camPosRef: React.RefObject<THREE.Vector3>;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const halfRange = CITY_RANGE / 2;

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.frustumCulled = false;
    for (let i = 0; i < vehicles.length; i++) {
      _color.set(vehicles[i].colorIndex === 0 ? NEON_YELLOW : NEON_CYAN);
      meshRef.current.setColorAt(i, _color);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [vehicles]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const cam = camPosRef.current;
    if (!mesh || !cam) return;

    const dt = Math.min(delta, 0.1);

    for (let i = 0; i < vehicles.length; i++) {
      const v = vehicles[i];

      v.x += v.vx * dt;
      v.z += v.vz * dt;

      let dx = v.x - cam.x;
      let dz = v.z - cam.z;
      dx = ((dx + halfRange) % CITY_RANGE + CITY_RANGE) % CITY_RANGE - halfRange;
      dz = ((dz + halfRange) % CITY_RANGE + CITY_RANGE) % CITY_RANGE - halfRange;

      const bob = Math.sin(state.clock.elapsedTime * 0.8 + i * 2) * 0.2;
      const angle = Math.atan2(v.vx, v.vz);

      _position.set(cam.x + dx, v.y + bob, cam.z + dz);
      _scale.set(scaleX, scaleY, scaleZ);
      const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0));
      _matrix.compose(_position, quat, _scale);
      mesh.setMatrixAt(i, _matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, vehicles.length]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe transparent opacity={0.6} />
    </instancedMesh>
  );
}

function FlightController({
  camPosRef,
  yawRef,
}: {
  camPosRef: React.RefObject<THREE.Vector3>;
  yawRef: React.RefObject<number>;
}) {
  const mouseRef = useRef(0);

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      mouseRef.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useFrame((state, delta) => {
    const targetYaw = mouseRef.current * 0.5;
    yawRef.current += (targetYaw - yawRef.current) * 0.03;

    const yaw = yawRef.current;
    const dirX = Math.sin(yaw);
    const dirZ = -Math.cos(yaw);

    const cam = camPosRef.current;
    cam.x += dirX * SPEED * delta;
    cam.z += dirZ * SPEED * delta;

    const t = state.clock.elapsedTime;
    const baseY = 8 + Math.sin(t * 0.2) * 0.5;

    if (state.camera) {
      state.camera.position.set(cam.x, baseY, cam.z);
      const lookDist = 15;
      state.camera.lookAt(
        cam.x + dirX * lookDist,
        baseY - 2,
        cam.z + dirZ * lookDist,
      );
    }
  });

  return null;
}

/**
 * Pauses the render loop when the tab is hidden (Page Visibility API).
 * Saves CPU/GPU when user switches away.
 */
function VisibilityPause() {
  const setPaused = useState(false)[1];

  useEffect(() => {
    const handleVisibility = () => {
      setPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [setPaused]);

  return null;
}

export default function CyberpunkScene() {
  const camPosRef = useRef(new THREE.Vector3(0, 8, 15));
  const yawRef = useRef(0);
  const buildings = useMemo(() => generateBuildings(42), []);
  const cars = useMemo(() => generateCars(99), []);
  const planes = useMemo(() => generateSkyVehicles(77, 6, 10, 14), []);
  const zeppelins = useMemo(() => generateSkyVehicles(33, 3, 12, 16), []);
  const scanH = useMemo(() => generateScanInstances(101, SCAN_H_COUNT), []);
  const scanV = useMemo(() => generateScanInstances(202, SCAN_V_COUNT), []);

  return (
    <Canvas
      camera={{ position: [0, 8, 15], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#09090b", 12, 38]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 5]} intensity={1.5} color={NEON_YELLOW} />
        <pointLight position={[10, 5, -5]} intensity={1} color={NEON_CYAN} />

        <FollowingGround camPosRef={camPosRef} />
        <InstancedCity buildings={buildings} camPosRef={camPosRef} />
        <FlyingCars cars={cars} camPosRef={camPosRef} />
        {/* Planes: wide flat boxes (wings), high in the sky */}
        <FlyingSkyVehicles vehicles={planes} camPosRef={camPosRef} scaleX={1.5} scaleY={0.2} scaleZ={0.5} />
        {/* Zeppelins: long fat boxes, even higher */}
        <FlyingSkyVehicles vehicles={zeppelins} camPosRef={camPosRef} scaleX={2.5} scaleY={0.8} scaleZ={0.8} />
        <ScanLines
          camPosRef={camPosRef}
          yawRef={yawRef}
          instances={scanH}
          orientation="horizontal"
        />
        <ScanLines
          camPosRef={camPosRef}
          yawRef={yawRef}
          instances={scanV}
          orientation="vertical"
        />
        <FlightController camPosRef={camPosRef} yawRef={yawRef} />
        <VisibilityPause />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.12}
            luminanceSmoothing={0.9}
            radius={0.6}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0008, 0.0008]}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}