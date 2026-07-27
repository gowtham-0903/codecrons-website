"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";

/** Deterministic gradient per project, used when no cover image exists. */
const FALLBACK_GRADIENTS = [
  "from-accent-purple/60 via-accent-mint/30 to-accent-purple/10",
  "from-accent-orange/55 via-accent-purple/30 to-accent-orange/10",
  "from-accent-teal/55 via-accent-purple/30 to-accent-teal/10",
  "from-accent-purple/55 via-accent-orange/30 to-accent-purple/10",
];

const TILT_RANGE = 8; // degrees

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Raw pointer position within the card, normalised to -0.5…0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [TILT_RANGE, -TILT_RANGE]),
    springConfig,
  ) as MotionValue<number>;
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-TILT_RANGE, TILT_RANGE]),
    springConfig,
  ) as MotionValue<number>;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  const gradient = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];
  const isLink = Boolean(project.link);
  const Wrapper = isLink ? "a" : "div";

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group [transform-style:preserve-3d]"
    >
      <Wrapper
        {...(isLink
          ? {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        className="flex flex-col h-full border border-border rounded-2xl overflow-hidden bg-bg transition-all duration-300 hover:border-accent-purple hover:shadow-xl"
      >
        {/* Cover */}
        <div className="relative h-48 overflow-hidden bg-bg-subtle">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
              aria-hidden
            >
              <span className="font-serif text-5xl font-bold text-bg/70 drop-shadow-sm">
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 3)
                  .join("")}
              </span>
            </div>
          )}

          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-bg/90 backdrop-blur-sm text-[11px] font-semibold text-fg-muted">
            {project.year}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(24px)" }}>
          <div className="flex items-center justify-between gap-3 mb-2">
            <Badge label={project.category} color="purple" />
            {isLink && (
              <ArrowUpRight
                size={17}
                className="text-fg-muted/40 transition-all duration-300 group-hover:text-accent-orange group-hover:rotate-45"
                aria-hidden
              />
            )}
          </div>

          <h3 className="text-lg font-bold text-fg leading-snug">
            {project.title}
          </h3>
          <p className="text-fg-muted text-sm mt-2 leading-relaxed flex-1">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="px-2 py-0.5 rounded-md bg-bg-subtle border border-border text-[11px] text-fg-muted font-medium"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </motion.div>
  );
}
