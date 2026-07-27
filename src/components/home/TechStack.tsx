"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Boxes,
  Braces,
  Cloud,
  CloudLightning,
  Container,
  CreditCard,
  Database,
  FileCode2,
  GitBranch,
  Hexagon,
  Link2,
  PenTool,
  Smartphone,
  Sparkles,
  Triangle,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { techStack } from "@/data/techStack";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/motion";

/** Maps the `icon` string in data/techStack.ts to a Lucide component. */
const ICONS: Record<string, LucideIcon> = {
  Atom,
  Boxes,
  Braces,
  Cloud,
  CloudLightning,
  Container,
  CreditCard,
  Database,
  FileCode2,
  GitBranch,
  Hexagon,
  Link2,
  PenTool,
  Smartphone,
  Sparkles,
  Triangle,
  Wind,
  Zap,
};

const CATEGORY_COLOR: Record<string, string> = {
  frontend: "group-hover:text-accent-purple",
  backend: "group-hover:text-accent-teal",
  ai: "group-hover:text-accent-orange",
  tools: "group-hover:text-fg",
};

export default function TechStack() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <SectionHeader
          label="Our Stack"
          title="Tools we trust"
          subtitle="Deliberately boring where it should be, modern where it pays off."
          align="center"
        />

        <motion.ul
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {techStack.map((item) => {
            const Icon = ICONS[item.icon] ?? Boxes;
            return (
              <motion.li
                key={item.name}
                variants={scaleIn}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:border-border hover:bg-bg-subtle hover:-translate-y-1"
              >
                <span className="w-12 h-12 rounded-xl border border-border bg-bg-subtle flex items-center justify-center transition-colors duration-300 group-hover:border-accent-purple/40 group-hover:bg-bg">
                  <Icon
                    size={20}
                    className={`text-fg-muted transition-colors duration-300 ${
                      CATEGORY_COLOR[item.category] ?? ""
                    }`}
                  />
                </span>
                <span className="text-xs text-fg-muted font-medium text-center leading-tight transition-colors duration-300 group-hover:text-fg">
                  {item.name}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
