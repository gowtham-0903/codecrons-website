export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

// TODO: Replace with real Codecrons service descriptions
export const services: Service[] = [
  {
    id: "software-development",
    number: "01",
    title: "Custom Software Development",
    description:
      "TODO: Add description for custom software development service.",
    tags: ["Web Apps", "APIs", "Backend", "Frontend"],
  },
  {
    id: "saas-products",
    number: "02",
    title: "SaaS Product Development",
    description: "TODO: Add description for SaaS product development service.",
    tags: ["SaaS", "Subscriptions", "Dashboards", "Multi-tenant"],
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI & Automation",
    description: "TODO: Add description for AI and automation service.",
    tags: ["AI", "Machine Learning", "Zapier", "n8n", "Bots"],
  },
  {
    id: "ui-ux-design",
    number: "04",
    title: "UI/UX Design",
    description: "TODO: Add description for UI/UX design service.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
  },
  {
    id: "mobile-apps",
    number: "05",
    title: "Mobile App Development",
    description: "TODO: Add description for mobile app development service.",
    tags: ["React Native", "iOS", "Android", "Cross-platform"],
  },
  {
    id: "consulting",
    number: "06",
    title: "Tech Consulting",
    description: "TODO: Add description for tech consulting service.",
    tags: ["Architecture", "Code Review", "Strategy", "Audits"],
  },
];
