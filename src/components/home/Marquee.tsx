"use client";

// TODO: Implement infinite horizontal marquee / ticker
// Items should alternate text-accent-orange and text-accent-purple
// Each item prefixed with ✦ symbol
// Speed: ~28s per full cycle (controlled by CSS animation in globals.css .animate-marquee)
// The items list is duplicated to create a seamless loop
// Pause on hover: add hover:[animation-play-state:paused] class to the inner div
// Borders: border-y border-border on the outer wrapper

const ITEMS = [
  "Custom Software",
  "SaaS Development",
  "AI Integration",
  "Workflow Automation",
  "Web Applications",
  "Mobile Apps",
  "UI/UX Design",
  "Tech Consulting",
  "API Development",
  "Cloud Solutions",
];

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS];

  // TODO: implement full styled version
  return (
    <div className="overflow-hidden w-full py-5 border-y border-border bg-bg-subtle">
      <div className="flex gap-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`text-sm font-bold tracking-wide ${
              i % 2 === 0 ? "text-accent-orange" : "text-accent-purple"
            }`}
          >
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}
