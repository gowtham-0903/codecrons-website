"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

const WORDS = ["We", "build", "software", "that", "makes", "ideas", "real."];

// Floating voxel-style decorative cubes
const CUBES = [
  { left: "52%", top: "6%",  w: 20, h: 20, color: "#F94706", opacity: 0.9, delay: 0 },
  { left: "68%", top: "11%", w: 13, h: 13, color: "#F94706", opacity: 0.65, delay: 0.3 },
  { left: "86%", top: "22%", w: 10, h: 10, color: "#F94706", opacity: 0.45, delay: 0.6 },
  { left: "91%", top: "55%", w: 15, h: 15, color: "#F94706", opacity: 0.7, delay: 0.2 },
  { left: "55%", top: "72%", w: 9,  h: 9,  color: "#F94706", opacity: 0.35, delay: 0.8 },
  { left: "76%", top: "80%", w: 11, h: 11, color: "#6670FF", opacity: 0.4, delay: 0.5 },
  { left: "60%", top: "45%", w: 7,  h: 7,  color: "#00CC99", opacity: 0.35, delay: 1.0 },
];

export default function SpotlightHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef  = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const mouse      = useRef({ x: -9999, y: -9999 });
  const smooth     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const section = sectionRef.current;
    const reveal  = revealRef.current;
    if (!section || !reveal) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      reveal.style.setProperty("--mx", `${smooth.current.x}px`);
      reveal.style.setProperty("--my", `${smooth.current.y}px`);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      style={{ background: "#E8E8E4" }}
    >
      {/* ── Ghost background text ── */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none z-0 overflow-hidden leading-none"
        aria-hidden
      >
        <span
          className="font-serif font-bold whitespace-nowrap"
          style={{
            fontSize: "clamp(110px, 19vw, 420px)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 0.85,
          }}
        >
          Codecrons
        </span>
      </div>

      {/* ── Floating voxel cubes ── */}
      {CUBES.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute pointer-events-none rounded-sm z-10"
          style={{
            left: c.left,
            top: c.top,
            width: c.w,
            height: c.h,
            backgroundColor: c.color,
            opacity: c.opacity,
          }}
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{
            duration: 3 + i * 0.5,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* ── Left: copy ── */}
        <div className="flex flex-col gap-6">

          {/* Status pill */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-black/60"
          >
            <span className="relative flex w-2 h-2" aria-hidden>
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent-teal opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent-teal" />
            </span>
            {site.tagline} · Available for new work
          </motion.span>

          {/* Word-by-word headline */}
          <h1
            className="font-serif font-bold leading-[1.02] tracking-tight text-fg"
            style={{ fontSize: "clamp(2.6rem, 5vw, 5.5rem)" }}
          >
            {WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease: EASE }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="text-black/60 text-lg leading-relaxed max-w-md text-pretty"
          >
            Full-stack product studio building custom software, SaaS platforms,
            AI integrations, and automation — for teams that need it done right
            the first time.
          </motion.p>

          {/* Pill CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/contact" className="group relative inline-flex items-center rounded-full p-2 gap-3 cursor-pointer">
              {/* Expanding dark background */}
              <span
                className="absolute top-1.5 bottom-1.5 left-2 rounded-full bg-fg z-0 group-hover:right-2"
                style={{
                  right: "calc(3rem + 1rem)",
                  transition: "right 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              />
              {/* Label */}
              <span className="relative z-10 font-semibold text-base text-white px-8 py-3 whitespace-nowrap">
                Start a project
              </span>
              {/* Arrow circle */}
              <span
                className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-accent-orange text-white flex-shrink-0"
                style={{ transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)" }}
              >
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </motion.div>

          {/* Proof points */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="flex flex-wrap gap-x-10 gap-y-3 pt-5 border-t border-black/10"
          >
            {[
              { value: "2–6 wks", label: "First release" },
              { value: "Fixed",   label: "Scope & price" },
              { value: "Direct",  label: "Engineer access" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="font-serif font-bold text-xl text-fg">{item.value}</dt>
                <dd className="text-xs text-black/50 mt-0.5">{item.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Right: spotlight character ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.7 }}
          className="relative h-[520px] lg:h-[660px]"
        >
          {/* Base image (always visible) */}
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url(/hero/character-base.png)" }}
          />

          {/* Reveal image — shown only in the spotlight circle */}
          <div
            ref={revealRef}
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: "url(/hero/character-reveal.png)",
              WebkitMaskImage:
                "radial-gradient(circle 300px at var(--mx, -9999px) var(--my, -9999px), white 30%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.1) 75%, transparent 90%)",
              maskImage:
                "radial-gradient(circle 300px at var(--mx, -9999px) var(--my, -9999px), white 30%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.1) 75%, transparent 90%)",
            }}
          />
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-black/40"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.div>
    </section>
  );
}
