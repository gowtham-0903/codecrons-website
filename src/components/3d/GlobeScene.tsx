"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Line } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * About page — rotating globe representing a remote-first, global studio.
 *
 * Wireframe sphere + inner solid core + glow shell, with markers pinned at
 * real lat/long coordinates and great-circle arcs linking them.
 */

const RADIUS = 2;

/** Cities used as presence markers. */
const CITIES: Array<{ name: string; lat: number; lon: number }> = [
  { name: "Chennai", lat: 13.08, lon: 80.27 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "Berlin", lat: 52.52, lon: 13.4 },
  { name: "São Paulo", lat: -23.55, lon: -46.63 },
];

/** Converts lat/long degrees to a point on the sphere surface. */
function latLonToVector3(lat: number, lon: number, radius = RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function Markers() {
  const points = useMemo(
    () => CITIES.map((c) => latLonToVector3(c.lat, c.lon, RADIUS * 1.01)),
    [],
  );
  const ref = useRef<THREE.Group>(null);

  // Gentle pulse so the markers read as "live".
  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.18;
    group.children.forEach((child, i) => {
      child.scale.setScalar(pulse - (i % 3) * 0.04);
    });
  });

  return (
    <group ref={ref}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#F94706" : "#00CC99"} />
        </mesh>
      ))}
    </group>
  );
}

/** Great-circle arcs connecting a hub city to the others. */
function Arcs() {
  const curves = useMemo(() => {
    const hub = latLonToVector3(CITIES[0].lat, CITIES[0].lon);
    return CITIES.slice(1).map((city) => {
      const end = latLonToVector3(city.lat, city.lon);
      // Lift the midpoint well clear of the surface so the arc bows outside
      // the sphere and stays visible instead of being hidden by the core.
      const mid = hub
        .clone()
        .add(end)
        .normalize()
        .multiplyScalar(RADIUS * 1.7);
      return new THREE.QuadraticBezierCurve3(hub, mid, end).getPoints(48);
    });
  }, []);

  return (
    <>
      {curves.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#66FFD9"
          lineWidth={1.6}
          transparent
          opacity={0.8}
        />
      ))}
    </>
  );
}

function Globe() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={ref} rotation={[0.2, 0, 0.15]}>
      {/* Wireframe shell */}
      <Sphere args={[RADIUS, 48, 48]}>
        <meshStandardMaterial color="#6670FF" wireframe transparent opacity={0.32} />
      </Sphere>

      {/* Solid inner core so the wireframe reads as a volume rather than a cage */}
      <Sphere args={[RADIUS * 0.97, 48, 48]}>
        <meshStandardMaterial
          color="#151529"
          roughness={0.55}
          metalness={0.2}
          transparent
          opacity={0.92}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[RADIUS * 1.06, 32, 32]}>
        <meshBasicMaterial
          color="#66FFD9"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      <Markers />
      <Arcs />
    </group>
  );
}

export default function GlobeScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <pointLight position={[-5, 0, -3]} intensity={40} color="#6670FF" />
          <Globe />
          {/* Drag to spin; zoom/pan stay disabled so the page keeps scrolling. */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
