"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

export default function PortfolioGrid() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active],
  );

  // Hide filters that would produce an empty grid.
  const availableCategories = useMemo(
    () =>
      projectCategories.filter(
        (category) =>
          category === "All" ||
          projects.some((project) => project.category === category),
      ),
    [],
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Filter bar */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {availableCategories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                isActive ? "text-white" : "text-fg-muted hover:text-fg",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{category}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="text-fg-muted text-center py-16">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
