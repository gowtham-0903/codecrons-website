"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

// TODO: Implement ParticleField — subtle animated particles for Blog page background
//
// Scene contents:
//   - 3000–5000 tiny points distributed in a sphere
//   - Slowly rotate on X and Y axis
//   - Color: accent-mint (#66FFD9), small size (~0.003–0.005)
//   - depthWrite: false to avoid z-fighting
//   - Transparent background (no fog)
//
// Note: if you want to use maath/random for sphere distribution, install:
//   npm install maath
// Then: import * as random from "maath/random/dist/maath-random.esm"
//       const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 })

function Particles() {
  const ref = useRef<THREE.Points>(null);

  // Simple random sphere distribution without maath dependency
  const positions = useMemo(() => {
    const count = 4000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * 2;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#66FFD9"
        size={0.004}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
