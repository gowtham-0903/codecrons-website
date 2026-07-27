export interface TechItem {
  name: string;
  icon: string; // path under /public/tech/ OR a Lucide icon name
  category: "frontend" | "backend" | "ai" | "tools";
}

// TODO: Add/remove tools to match what Codecrons actually uses
export const techStack: TechItem[] = [
  { name: "Next.js", icon: "/tech/nextjs.svg", category: "frontend" },
  { name: "React", icon: "/tech/react.svg", category: "frontend" },
  { name: "TypeScript", icon: "/tech/typescript.svg", category: "frontend" },
  { name: "Tailwind CSS", icon: "/tech/tailwind.svg", category: "frontend" },
  { name: "Node.js", icon: "/tech/nodejs.svg", category: "backend" },
  { name: "Python", icon: "/tech/python.svg", category: "backend" },
  { name: "PostgreSQL", icon: "/tech/postgresql.svg", category: "backend" },
  { name: "OpenAI", icon: "/tech/openai.svg", category: "ai" },
  { name: "Figma", icon: "/tech/figma.svg", category: "tools" },
  { name: "Framer", icon: "/tech/framer.svg", category: "tools" },
  { name: "Vercel", icon: "/tech/vercel.svg", category: "tools" },
  { name: "GitHub", icon: "/tech/github.svg", category: "tools" },
];
