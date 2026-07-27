"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// TODO: Implement DeviceMockup — 3D laptop/device for the home DeviceSection
//
// Scene contents:
//   - A stylised laptop or monitor shape built from RoundedBox primitives
//   - Screen: a plane/box with a dark material (simulate a dashboard)
//   - Optional: a glowing screen texture or canvas texture showing mock UI
//   - Float component for gentle up/down animation
//   - Lighting: accent-mint point light from above for glow
//
// Alternative: load a real .glb model if you have one (use useGLTF from drei)
//   - Place model at /public/models/laptop.glb
//   - const { scene } = useGLTF("/models/laptop.glb")
//
// The device should feel premium — matte dark body, glowing screen

function LaptopModel() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    // Slight tilt oscillation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Base / keyboard */}
        <RoundedBox args={[3.2, 0.15, 2.2]} radius={0.05} position={[0, -0.6, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        {/* Lid / screen */}
        <RoundedBox args={[3.2, 2.0, 0.1]} radius={0.05} position={[0, 0.55, -1.05]} rotation={[-0.3, 0, 0]}>
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        {/* Screen glow */}
        <RoundedBox args={[2.9, 1.7, 0.01]} radius={0.02} position={[0, 0.55, -0.99]} rotation={[-0.3, 0, 0]}>
          <meshStandardMaterial color="#6670FF" emissive="#6670FF" emissiveIntensity={0.6} />
        </RoundedBox>
        {/* TODO: add more detail — touchpad, keyboard rows, screen content */}
      </group>
    </Float>
  );
}

export default function DeviceMockup() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 4, 2]} intensity={1.5} color="#66FFD9" />
          <pointLight position={[-3, -2, 3]} intensity={0.5} color="#F94706" />
          <LaptopModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
