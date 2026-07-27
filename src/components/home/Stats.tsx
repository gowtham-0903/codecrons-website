"use client";

import { motion, useInView } from "motion/react-client";
import { useRef, useState, useEffect } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5,  suffix: "+", label: "Years of Experience" },
  { value: 3,  suffix: "",  label: "Products Launched" },
];

// TODO: Implement animated stats section
// Each stat uses a count-up animation when it enters the viewport (useInView)
// Layout: 4 columns on desktop, 2x2 on mobile
// Background: bg-fg (black) to create contrast with surrounding white sections
// Text: text-bg (white)
// Number text: very large (text-6xl), accent-orange color
// Animate on scroll: only triggers once (useInView with once:true)
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  // TODO: style this properly
  return (
    <section className="bg-fg py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <p className="text-5xl font-bold text-accent-orange font-serif">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-bg/70 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
