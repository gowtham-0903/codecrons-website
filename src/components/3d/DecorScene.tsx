"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, TorusKnot } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * Decorative accent scene used on Services and Contact.
 *
 * A soft distorting blob paired with a slow torus knot — abstract enough to
 * sit beside copy without competing with it. Doubles as the fallback for
 * <SplineEmbed /> until real Spline scene URLs exist.
 */

function Blob() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ref} position={[0.3, 0, 0]}>
        <sphereGeometry args={[1.5, 96, 96]} />
        <MeshDistortMaterial
          color="#6670FF"
          distort={0.42}
          speed={1.6}
          roughness={0.15}
          metalness={0.55}
        />
      </mesh>
    </Float>
  );
}

function Knot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    mesh.rotation.x = t * 0.22;
    mesh.rotation.z = t * 0.14;
  });

  return (
    <TorusKnot ref={ref} args={[2.15, 0.022, 200, 16]}>
      <meshStandardMaterial
        color="#F94706"
        emissive="#F94706"
        emissiveIntensity={0.45}
        roughness={0.35}
      />
    </TorusKnot>
  );
}

export default function DecorScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <pointLight position={[4, 4, 4]} intensity={80} color="#66FFD9" />
          <pointLight position={[-4, -3, 2]} intensity={50} color="#F94706" />
          <Blob />
          <Knot />
        </Suspense>
      </Canvas>
    </div>
  );
}
