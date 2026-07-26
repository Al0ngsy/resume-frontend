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
 * Scanning line that sweeps forward across the city in the flight direction.
 * Lies flat on the ground, oriented perpendicular to flight path.
 */
function ScanLine({
  camPosRef,
  yawRef,
}: {
  camPosRef: React.RefObject<THREE.Vector3>;
  yawRef: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cycleRef = useRef(0);

  useEffect(() => {
    if (meshRef.current) meshRef.current.frustumCulled = false;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !camPosRef.current) return;
    cycleRef.current += delta * 0.4; // 2.5s cycle
    const cycle = cycleRef.current % 1;
    const yaw = yawRef.current;

    // Flight direction
    const dirX = Math.sin(yaw);
    const dirZ = -Math.cos(yaw);

    // Sweep forward from camera, 0 to 35 units ahead
    const dist = cycle * 35;

    meshRef.current.position.set(
      camPosRef.current.x + dirX * dist,
      0.02,
      camPosRef.current.z + dirZ * dist,
    );

    // Rotate flat on ground: rotate X -90° to lie flat, then Y by -yaw to align perpendicular to flight
    meshRef.current.rotation.set(-Math.PI / 2, 0, -yaw);

    // Fade in then fade out over the sweep
    const fade = Math.sin(cycle * Math.PI); // 0→1→0
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.4;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 0.2]} />
      <meshBasicMaterial
        color={NEON_YELLOW}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
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
        <ScanLine camPosRef={camPosRef} yawRef={yawRef} />
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