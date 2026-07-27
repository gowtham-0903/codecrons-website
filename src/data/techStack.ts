/**
 * Tech stack grid.
 *
 * `icon` is a Lucide icon name — the grid renders Lucide glyphs rather than
 * brand logos so nothing depends on missing files in /public/tech/.
 * To switch to real brand SVGs later, drop them in /public/tech/ and change
 * TechStack.tsx to render <Image src={`/tech/${slug}.svg`} />.
 */
export interface TechItem {
  name: string;
  /** Lucide icon name — see components/home/TechStack.tsx for the map. */
  icon: string;
  category: "frontend" | "backend" | "ai" | "tools";
}

export const techStack: TechItem[] = [
  { name: "Next.js", icon: "Triangle", category: "frontend" },
  { name: "React", icon: "Atom", category: "frontend" },
  { name: "TypeScript", icon: "FileCode2", category: "frontend" },
  { name: "Tailwind CSS", icon: "Wind", category: "frontend" },
  { name: "React Native", icon: "Smartphone", category: "frontend" },
  { name: "Node.js", icon: "Hexagon", category: "backend" },
  { name: "Python", icon: "Braces", category: "backend" },
  { name: "PostgreSQL", icon: "Database", category: "backend" },
  { name: "Redis", icon: "Zap", category: "backend" },
  { name: "Docker", icon: "Container", category: "backend" },
  { name: "AWS", icon: "Cloud", category: "backend" },
  { name: "Claude / OpenAI", icon: "Sparkles", category: "ai" },
  { name: "LangChain", icon: "Link2", category: "ai" },
  { name: "Vector DBs", icon: "Boxes", category: "ai" },
  { name: "Figma", icon: "PenTool", category: "tools" },
  { name: "Vercel", icon: "CloudLightning", category: "tools" },
  { name: "GitHub", icon: "GitBranch", category: "tools" },
  { name: "Stripe", icon: "CreditCard", category: "tools" },
];

export const techCategories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & Infra" },
  { id: "ai", label: "AI" },
  { id: "tools", label: "Tools" },
] as const;
