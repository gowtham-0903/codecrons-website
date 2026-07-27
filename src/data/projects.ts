/**
 * ─────────────────────────────────────────────────────────────────────────
 * SAMPLE DATA — replace before launch.
 *
 * These entries describe the *kind* of work Codecrons does so the portfolio
 * page renders complete, but they are not real client engagements. Swap in
 * genuine projects (and drop cover images into /public/projects/) before
 * this site goes public.
 *
 * `image` is optional — cards fall back to a generated gradient tile when
 * the file is absent, so you can add projects before you have screenshots.
 * ─────────────────────────────────────────────────────────────────────────
 */
export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  /** Path under /public/projects/. Omit to use the gradient fallback. */
  image?: string;
  tags: string[];
  /** Live site or case study. Omit to hide the link. */
  link?: string;
  year: string;
}

export type ProjectCategory = "Web App" | "SaaS" | "AI" | "Mobile";

export const projects: Project[] = [
  {
    id: "logistics-ops-platform",
    title: "Logistics Operations Platform",
    category: "Web App",
    description:
      "A dispatch and fleet-tracking dashboard replacing a spreadsheet workflow, with live vehicle positions and automated route assignment.",
    tags: ["Next.js", "PostgreSQL", "Mapbox"],
    year: "2025",
  },
  {
    id: "subscription-billing-suite",
    title: "Subscription Billing Suite",
    category: "SaaS",
    description:
      "Multi-tenant billing platform with metered usage, proration, dunning, and a self-serve customer portal built on Stripe.",
    tags: ["React", "Node.js", "Stripe"],
    year: "2025",
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence Engine",
    category: "AI",
    description:
      "A retrieval pipeline that reads contracts, extracts structured terms, and flags clauses that deviate from an agreed template.",
    tags: ["Python", "LLM", "Vector DB"],
    year: "2024",
  },
  {
    id: "field-service-app",
    title: "Field Service Mobile App",
    category: "Mobile",
    description:
      "Offline-first React Native app for on-site technicians — job sheets, photo capture, and signature collection that sync when back in range.",
    tags: ["React Native", "SQLite", "Expo"],
    year: "2024",
  },
  {
    id: "analytics-workspace",
    title: "Customer Analytics Workspace",
    category: "SaaS",
    description:
      "Self-serve analytics with a visual query builder, scheduled reports, and embeddable dashboards for downstream customers.",
    tags: ["Next.js", "ClickHouse", "D3"],
    year: "2024",
  },
  {
    id: "support-copilot",
    title: "Support Triage Copilot",
    category: "AI",
    description:
      "An assistant that drafts replies from a help-centre knowledge base, routes tickets by intent, and escalates what it is unsure about.",
    tags: ["Python", "RAG", "Zendesk API"],
    year: "2023",
  },
];

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Web App",
  "SaaS",
  "AI",
  "Mobile",
];
