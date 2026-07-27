"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "", label: "Products Launched" },
];

/** Counts from 0 to `to` once the element first enters the viewport. */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-fg py-20 overflow-hidden">
      {/* Ambient colour wash */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 bg-accent-purple"
        aria-hidden
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-[0.12] bg-accent-orange"
        aria-hidden
      />

      <dl className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col gap-2"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd className="flex flex-col gap-2">
              <span className="text-5xl lg:text-6xl font-bold text-accent-orange font-serif">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-bg/60 text-sm font-medium tracking-wide">
                {stat.label}
              </span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
