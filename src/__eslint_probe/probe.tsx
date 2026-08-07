"use client";
import { useRef } from "react";

type Car = { x: number; z: number; vx: number; vz: number };

function FlyingCars({ cars }: { cars: Car[] }) {
  const meshRef = useRef<{ x: number } | null>(null);
  // Option A: ref initialized from prop
  const simRef = useRef(cars);

  useFrame2((delta) => {
    for (let i = 0; i < simRef.current.length; i++) {
      const c = simRef.current[i];
      c.x += c.vx * delta;
      c.z += c.vz * delta;
    }
  });

  // Option B: ref re-assigned from prop each render
  const simRef2 = useRef<Car[]>([]);
  simRef2.current = cars;
  useFrame2((delta) => {
    for (let i = 0; i < simRef2.current.length; i++) {
      const c = simRef2.current[i];
      c.x += c.vx * delta;
      c.z += c.vz * delta;
    }
  });

  void meshRef;
  return null;
}

// stand-in for @react-three/fiber's useFrame
function useFrame2(cb: (delta: number) => void) {
  void cb;
}
