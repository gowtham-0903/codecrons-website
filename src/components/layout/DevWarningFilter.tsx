"use client";
import { useEffect } from "react";

// THREE.Clock is deprecated in three@0.177+ but @react-three/fiber still
// uses it internally. Suppress that specific warning until R3F ships a fix.
export default function DevWarningFilter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const original = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
      original(...args);
    };
    return () => {
      console.warn = original;
    };
  }, []);
  return null;
}
