"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Octahedron } from "@react-three/drei";
import { Suspense, useRef, type ReactNode } from "react";
import * as THREE from "three";

/**
 * Home hero — abstract floating geometry.
 *
 * A large wireframe icosahedron anchors the composition, orbited by a torus
 * ring and three smaller solids. The whole group eases toward the pointer for
 * parallax that reacts without ever capturing the cursor.
 */

function CoreShape() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    mesh.rotation.x = Math.sin(t * 0.3) * 0.4;
    mesh.rotation.y += 0.004;
    mesh.position.y = Math.sin(t * 0.5) * 0.25;
  });

  return (
    <Icosahedron ref={ref} args={[1.7, 1]}>
      <meshStandardMaterial color="#6670FF" wireframe transparent opacity={0.75} />
    </Icosahedron>
  );
}

function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    mesh.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.25) * 0.15;
    mesh.rotation.z = t * 0.18;
  });

  return (
    <Torus ref={ref} args={[2.6, 0.018, 12, 128]}>
      <meshStandardMaterial
        color="#F94706"
        emissive="#F94706"
        emissiveIntensity={0.5}
        roughness={0.4}
      />
    </Torus>
  );
}

const SATELLITES: Array<{
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}> = [
  { position: [2.4, 1.3, -0.6], scale: 0.32, color: "#F94706", speed: 2.1 },
  { position: [-2.5, -0.9, 0.7], scale: 0.24, color: "#00CC99", speed: 1.6 },
  { position: [1.5, -1.8, 1.1], scale: 0.19, color: "#6670FF", speed: 2.6 },
];

function Satellites() {
  return (
    <>
      {SATELLITES.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.4} floatIntensity={1.6}>
          <Octahedron args={[1, 0]} position={s.position} scale={s.scale}>
            {/* Emissive so the solids stay saturated against a white page —
                lit-only materials read almost black at this scene scale. */}
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.85}
              metalness={0.2}
              roughness={0.35}
            />
          </Octahedron>
        </Float>
      ))}
    </>
  );
}

/** Eases the whole group toward the pointer position. */
function ParallaxGroup({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    const group = ref.current;
    if (!group) return;
    group.rotation.y += (pointer.x * 0.28 - group.rotation.y) * 0.04;
    group.rotation.x += (-pointer.y * 0.18 - group.rotation.x) * 0.04;
  });

  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <pointLight position={[5, 5, 5]} intensity={90} color="#66FFD9" />
          <pointLight position={[-5, -3, -5]} intensity={55} color="#F94706" />
          <ParallaxGroup>
            <CoreShape />
            <OrbitRing />
            <Satellites />
          </ParallaxGroup>
        </Suspense>
      </Canvas>
    </div>
  );
}
