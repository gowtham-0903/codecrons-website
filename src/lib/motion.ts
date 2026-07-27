import type { Variants } from "framer-motion";

/** Shared easing curve — matches the CSS transitions used across the site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Parent wrapper that staggers its children in sequence. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Child of `staggerContainer`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Standard viewport config so every section triggers consistently. */
export const viewportOnce = { once: true, margin: "-100px" } as const;
