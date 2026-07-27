"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Home mid-page — stylised laptop showing a dashboard.
 *
 * The screen content is painted into an offscreen 2D canvas and used as a
 * texture, so the "dashboard" is real pixels rather than a flat colour and
 * needs no image asset.
 */

const SCREEN_W = 1024;
const SCREEN_H = 640;

function useDashboardTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background
    ctx.fillStyle = "#0B0B0F";
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    // Sidebar
    ctx.fillStyle = "#131319";
    ctx.fillRect(0, 0, 190, SCREEN_H);
    ctx.fillStyle = "#F94706";
    ctx.beginPath();
    ctx.roundRect(28, 32, 26, 26, 8);
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i === 1 ? "#6670FF" : "#2A2A34";
      ctx.beginPath();
      ctx.roundRect(28, 96 + i * 42, i === 1 ? 130 : 110, 14, 7);
      ctx.fill();
    }

    // Header
    ctx.fillStyle = "#F5F5F7";
    ctx.beginPath();
    ctx.roundRect(226, 40, 220, 20, 6);
    ctx.fill();
    ctx.fillStyle = "#3A3A45";
    ctx.beginPath();
    ctx.roundRect(226, 72, 330, 12, 6);
    ctx.fill();

    // Stat cards
    const statColors = ["#F94706", "#6670FF", "#00CC99"];
    for (let i = 0; i < 3; i++) {
      const x = 226 + i * 258;
      ctx.fillStyle = "#16161D";
      ctx.beginPath();
      ctx.roundRect(x, 112, 232, 96, 14);
      ctx.fill();
      ctx.fillStyle = statColors[i];
      ctx.beginPath();
      ctx.roundRect(x + 20, 134, 70, 26, 6);
      ctx.fill();
      ctx.fillStyle = "#2E2E38";
      ctx.beginPath();
      ctx.roundRect(x + 20, 172, 130, 12, 6);
      ctx.fill();
    }

    // Chart panel
    ctx.fillStyle = "#16161D";
    ctx.beginPath();
    ctx.roundRect(226, 232, 490, 350, 14);
    ctx.fill();

    // Area chart
    const points: Array<[number, number]> = [];
    for (let i = 0; i <= 10; i++) {
      const x = 260 + i * 42;
      const y = 500 - (Math.sin(i * 0.75) * 0.5 + 0.5) * 190 - 20;
      points.push([x, y]);
    }
    const gradient = ctx.createLinearGradient(0, 280, 0, 540);
    gradient.addColorStop(0, "rgba(102,112,255,0.55)");
    gradient.addColorStop(1, "rgba(102,112,255,0.02)");
    ctx.beginPath();
    ctx.moveTo(points[0][0], 540);
    points.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.lineTo(points[points.length - 1][0], 540);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.strokeStyle = "#66FFD9";
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.stroke();

    // Right-hand list panel
    ctx.fillStyle = "#16161D";
    ctx.beginPath();
    ctx.roundRect(742, 232, 250, 350, 14);
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = "#00CC99";
      ctx.beginPath();
      ctx.arc(772, 274 + i * 52, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2E2E38";
      ctx.beginPath();
      ctx.roundRect(794, 266 + i * 52, 160 - i * 12, 14, 7);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }, []);
}

function Laptop() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useDashboardTexture();

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={groupRef} rotation={[0.08, 0, 0]}>
        {/* Base */}
        <RoundedBox args={[3.4, 0.16, 2.3]} radius={0.06} position={[0, -0.72, 0.25]}>
          <meshStandardMaterial color="#1a1a1f" metalness={0.75} roughness={0.28} />
        </RoundedBox>

        {/* Trackpad */}
        <RoundedBox args={[1.1, 0.02, 0.7]} radius={0.02} position={[0, -0.63, 0.85]}>
          <meshStandardMaterial color="#26262e" metalness={0.5} roughness={0.4} />
        </RoundedBox>

        {/* Keyboard deck */}
        <RoundedBox args={[2.9, 0.02, 1.0]} radius={0.02} position={[0, -0.63, -0.15]}>
          <meshStandardMaterial color="#101014" metalness={0.4} roughness={0.6} />
        </RoundedBox>

        {/* Lid */}
        <group position={[0, -0.66, -0.85]} rotation={[-1.35, 0, 0]}>
          <RoundedBox args={[3.4, 2.2, 0.09]} radius={0.05} position={[0, 1.1, 0]}>
            <meshStandardMaterial color="#141419" metalness={0.65} roughness={0.3} />
          </RoundedBox>

          {/* Screen */}
          <mesh position={[0, 1.1, 0.052]}>
            <planeGeometry args={[3.16, 1.98]} />
            {texture ? (
              <meshBasicMaterial map={texture} toneMapped={false} />
            ) : (
              <meshBasicMaterial color="#0B0B0F" />
            )}
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function DeviceMockup() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.6, 5.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 4, 3]} intensity={70} color="#66FFD9" />
          <pointLight position={[-4, -2, 3]} intensity={45} color="#F94706" />
          <pointLight position={[4, 1, 2]} intensity={30} color="#6670FF" />
          <Laptop />
        </Suspense>
      </Canvas>
    </div>
  );
}
