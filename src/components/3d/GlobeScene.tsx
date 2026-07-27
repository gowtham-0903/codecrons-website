"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// TODO: Implement GlobeScene — rotating 3D globe for the About page
//
// Scene contents:
//   - Main sphere: large, wireframe, accent-purple, semi-transparent
//   - Glow layer: slightly larger sphere, accent-mint, very transparent (~0.05 opacity)
//   - Optional: dot markers on the globe surface for city locations
//   - OrbitControls: auto-rotate, damping, disable zoom
//   - Lighting: ambient + a soft directional light
//
// The globe should feel like a "global reach" visualization
// Slowly auto-rotates — users can also drag to rotate (OrbitControls)

function Globe() {
  const ref = useRef<THREE.Mesh>(null);
  // Auto-rotate handled by OrbitControls autoRotate, but useFrame for fine control:
  useFrame(() => {
    // OrbitControls handles rotation — leave this empty or add custom spin
  });

  return (
    <>
      {/* Main wireframe globe */}
      <Sphere ref={ref} args={[2, 48, 48]}>
        <meshStandardMaterial
          color="#6670FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </Sphere>
      {/* Glow layer */}
      <Sphere args={[2.05, 32, 32]}>
        <meshStandardMaterial
          color="#66FFD9"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* TODO: add dot markers for global presence cities */}
    </>
  );
}

export default function GlobeScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-5, 0, -3]} intensity={0.4} color="#6670FF" />
          <Globe />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={false}
            enablePan={false}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
