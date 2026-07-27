"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Blog page — ambient particle field.
 *
 * Two counter-rotating shells (mint and purple) so the field has depth
 * without needing post-processing.
 */

const COUNT = 3200;

/** Even-ish distribution inside a sphere of the given radius. */
function sphericalPositions(count: number, radius: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function Shell({
  count,
  radius,
  color,
  size,
  opacity,
  speed,
}: {
  count: number;
  radius: number;
  color: string;
  size: number;
  opacity: number;
  speed: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => sphericalPositions(count, radius), [count, radius]);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;
    points.rotation.x -= (delta * speed) / 12;
    points.rotation.y -= (delta * speed) / 18;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <Shell
            count={COUNT}
            radius={1.9}
            color="#00CC99"
            size={0.006}
            opacity={0.9}
            speed={1}
          />
          <Shell
            count={Math.floor(COUNT / 2)}
            radius={1.35}
            color="#6670FF"
            size={0.009}
            opacity={0.65}
            speed={-1.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
