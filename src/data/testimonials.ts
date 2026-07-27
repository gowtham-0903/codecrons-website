export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  /** Path under /public/testimonials/. Falls back to initials when absent. */
  avatar?: string;
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * Deliberately empty.
 *
 * A testimonial is a quote attributed to a named person at a named company.
 * Inventing those would put words in a real-sounding person's mouth on a
 * public site, so this ships empty rather than filled with plausible fakes —
 * the home page and about page simply skip the section while it is.
 *
 * Add real quotes below (you need at least 3 for the carousel to loop
 * smoothly) and the section appears automatically. Shape:
 *
 *   {
 *     id: "t1",
 *     name: "Priya Nair",
 *     role: "Head of Product",
 *     company: "Northwind Freight",
 *     quote: "They shipped in six weeks what our last vendor quoted six months for.",
 *     avatar: "/testimonials/priya.jpg", // optional
 *   },
 * ─────────────────────────────────────────────────────────────────────────
 */
export const testimonials: Testimonial[] = [];

export const hasTestimonials = testimonials.length > 0;
