export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Path under /public/team/. Falls back to initials when absent. */
  photo?: string;
}

/**
 * Replace with the real Codecrons team. Cards render initials when `photo`
 * is omitted, so you can list people before you have headshots. The About
 * page hides the team section entirely while this array is empty.
 */
export const team: TeamMember[] = [
  {
    id: "founder",
    name: "Dhanush Selva",
    role: "Founder & Engineering Lead",
    bio: "Leads architecture and delivery across every Codecrons engagement.",
  },
];

export interface Value {
  /** Lucide icon name — mapped in the About page. */
  icon: string;
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    icon: "Gem",
    title: "Quality",
    description:
      "Typed end to end, reviewed before merge, and tested where it counts. We would rather ship a smaller thing properly than a larger thing twice.",
  },
  {
    icon: "Gauge",
    title: "Speed",
    description:
      "Short cycles with something working in front of you early. You see progress weekly, not at a single reveal three months in.",
  },
  {
    icon: "Eye",
    title: "Transparency",
    description:
      "Fixed scope, clear pricing, and direct access to the people building it. No account managers relaying messages, no surprise invoices.",
  },
  {
    icon: "Lightbulb",
    title: "Pragmatism",
    description:
      "We pick boring technology on purpose and reserve the novel choices for where they genuinely pay off. Your stack should still be maintainable in three years.",
  },
];
