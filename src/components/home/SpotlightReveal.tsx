"use client";

import { useRef, useEffect } from "react";

const RADIUS = 220;

const CODE = [
  [
    { t: "import", c: "kw" },
    { t: " { db } ", c: "plain" },
    { t: "from", c: "kw" },
    { t: ' "@/lib/db"', c: "str" },
  ],
  [
    { t: "import", c: "kw" },
    { t: " { auth } ", c: "plain" },
    { t: "from", c: "kw" },
    { t: ' "@/lib/auth"', c: "str" },
  ],
  [],
  [
    { t: "export async function", c: "kw" },
    { t: " GET(", c: "plain" },
    { t: "req", c: "param" },
    { t: ": Request) {", c: "plain" },
  ],
  [
    { t: "  const ", c: "kw" },
    { t: "session", c: "var" },
    { t: " = await ", c: "plain" },
    { t: "auth()", c: "fn" },
  ],
  [
    { t: "  const ", c: "kw" },
    { t: "users", c: "var" },
    { t: " = await ", c: "plain" },
    { t: "db", c: "fn" },
    { t: ".user.", c: "plain" },
    { t: "findMany", c: "fn" },
    { t: "({", c: "plain" },
  ],
  [
    { t: "    where: { orgId: ", c: "plain" },
    { t: "session", c: "var" },
    { t: ".orgId }", c: "plain" },
  ],
  [{ t: "  })", c: "plain" }],
  [
    { t: "  return ", c: "kw" },
    { t: "Response", c: "fn" },
    { t: ".", c: "plain" },
    { t: "json", c: "fn" },
    { t: "(", c: "plain" },
    { t: "users", c: "var" },
    { t: ")", c: "plain" },
  ],
  [{ t: "}", c: "plain" }],
];

const BADGES = [
  { label: "Next.js 15", color: "#ffffff", glow: "#ffffff" },
  { label: "TypeScript", color: "#3178c6", glow: "#3178c6" },
  { label: "PostgreSQL", color: "#336791", glow: "#336791" },
  { label: "Docker", color: "#2496ED", glow: "#2496ED" },
];

// colour maps for base vs glow layer
const BASE_COLORS: Record<string, string> = {
  kw: "#888888",
  plain: "#555555",
  str: "#6a9955",
  param: "#888888",
  var: "#6e6e6e",
  fn: "#777777",
};

const GLOW_COLORS: Record<string, string> = {
  kw: "#66FFD9",
  plain: "#a0a0c0",
  str: "#6670FF",
  param: "#F94706",
  var: "#66FFD9",
  fn: "#F94706",
};

function CodeEditor({ glow }: { glow: boolean }) {
  const colors = glow ? GLOW_COLORS : BASE_COLORS;

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: glow
          ? "radial-gradient(ellipse 70% 60% at 50% 40%, #1a0840 0%, #0a0010 60%, #060006 100%)"
          : "#0a0a0a",
      }}
    >
      {/* dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${glow ? "rgba(102,255,217,0.10)" : "rgba(255,255,255,0.06)"} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* editor chrome */}
      <div className="relative z-10 mx-6 mt-6 rounded-xl overflow-hidden border border-white/[0.07] flex flex-col shadow-2xl">
        {/* title bar */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]"
          style={{ background: glow ? "#140828" : "#111111" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span
            className="ml-3 text-[11px] font-mono"
            style={{ color: glow ? "#66FFD9" : "#444444" }}
          >
            src/app/api/users/route.ts
          </span>
        </div>

        {/* code body */}
        <div
          className="p-4 font-mono text-[12px] leading-[1.7]"
          style={{ background: glow ? "#0e0618" : "#0c0c0c" }}
        >
          {CODE.map((line, li) => (
            <div key={li} className="flex items-center gap-0">
              <span
                className="select-none mr-4 text-[10px] w-4 text-right shrink-0"
                style={{ color: glow ? "rgba(102,255,217,0.2)" : "#2a2a2a" }}
              >
                {li + 1}
              </span>
              <span>
                {line.length === 0 ? (
                  <>&nbsp;</>
                ) : (
                  line.map((tok, ti) => (
                    <span
                      key={ti}
                      style={{
                        color: colors[tok.c],
                        textShadow: glow
                          ? `0 0 8px ${colors[tok.c]}88`
                          : "none",
                      }}
                    >
                      {tok.t}
                    </span>
                  ))
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* tech badges */}
      <div className="relative z-10 flex flex-wrap gap-2 px-6 mt-5">
        {BADGES.map((b) => (
          <span
            key={b.label}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border"
            style={{
              color: glow ? b.glow : "#444444",
              borderColor: glow ? `${b.glow}44` : "#222222",
              background: glow ? `${b.glow}0d` : "#111111",
              boxShadow: glow ? `0 0 12px ${b.glow}22` : "none",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: glow ? b.glow : "#333333",
                boxShadow: glow ? `0 0 6px ${b.glow}` : "none",
              }}
            />
            {b.label}
          </span>
        ))}
      </div>

      {/* bottom glow (only on reveal layer) */}
      {glow && (
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(102,112,255,0.15), transparent)",
          }}
        />
      )}
    </div>
  );
}

export default function SpotlightReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -600, y: -600 });
  const smooth = useRef({ x: -600, y: -600 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    const rev = revealRef.current;
    if (!el || !rev) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    el.addEventListener("mousemove", onMove);

    function tick() {
      const m = mouse.current;
      const s = smooth.current;
      s.x += (m.x - s.x) * 0.1;
      s.y += (m.y - s.y) * 0.1;
      const mask = `radial-gradient(circle ${RADIUS}px at ${s.x}px ${s.y}px, white 25%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.25) 75%, transparent 100%)`;
      rev.style.webkitMaskImage = mask;
      rev.style.maskImage = mask;
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-crosshair select-none"
    >
      {/* base — always visible */}
      <CodeEditor glow={false} />

      {/* reveal — shown only under cursor spotlight */}
      <div ref={revealRef} className="absolute inset-0">
        <CodeEditor glow />
      </div>
    </div>
  );
}
