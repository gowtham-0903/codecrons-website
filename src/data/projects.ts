export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string; // path under /public/projects/
  tags: string[];
  link?: string;
}

// TODO: Replace with real Codecrons projects
export const projects: Project[] = [
  {
    id: "project-1",
    title: "TODO: Project Name",
    category: "Web App",
    description: "TODO: Short project description.",
    image: "/projects/placeholder.png",
    tags: ["Next.js", "TypeScript"],
    link: "#",
  },
  {
    id: "project-2",
    title: "TODO: Project Name",
    category: "SaaS",
    description: "TODO: Short project description.",
    image: "/projects/placeholder.png",
    tags: ["React", "Node.js"],
  },
  {
    id: "project-3",
    title: "TODO: Project Name",
    category: "AI",
    description: "TODO: Short project description.",
    image: "/projects/placeholder.png",
    tags: ["Python", "OpenAI"],
  },
  {
    id: "project-4",
    title: "TODO: Project Name",
    category: "Mobile",
    description: "TODO: Short project description.",
    image: "/projects/placeholder.png",
    tags: ["React Native"],
  },
];

export const projectCategories = ["All", "Web App", "SaaS", "AI", "Mobile"];
