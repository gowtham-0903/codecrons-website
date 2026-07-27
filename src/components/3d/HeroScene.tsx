"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// TODO: Implement HeroScene — abstract 3D floating geometry for the home hero
//
// Scene contents (suggestions — Dhanush can adjust):
//   - 1 large wireframe icosahedron, slowly rotating + floating
//   - 2–3 smaller spheres or octahedra at different positions
//   - A ring / torus orbiting the main shape
//   - Colors: use accent-purple (#6670FF) and accent-orange (#F94706) for materials
//   - Lighting: ambientLight (soft) + pointLight (accent-mint color for glow effect)
//
// Animation: useFrame for continuous rotation + sine-wave float
// The canvas fills its container (w-full h-full absolute inset-0)
// pointer-events: none so it doesn't block text interaction

function FloatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
    ref.current.rotation.y += 0.004;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });
  // TODO: replace with richer scene
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial color="#6670FF" wireframe transparent opacity={0.7} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#66FFD9" />
          <pointLight position={[-5, -3, -5]} intensity={0.5} color="#F94706" />
          <FloatingIcosahedron />
          {/* TODO: add more shapes — spheres, torus, smaller icosahedra */}
        </Suspense>
      </Canvas>
    </div>
  );
}
