export interface Service {
  id: string;
  number: string;
  title: string;
  /** One-liner used on the home page preview cards. */
  summary: string;
  /** Longer copy used on the /services page. */
  description: string;
  /** Concrete deliverables, shown as a checklist on /services. */
  deliverables: string[];
  tags: string[];
}

export const services: Service[] = [
  {
    id: "software-development",
    number: "01",
    title: "Custom Software Development",
    summary:
      "Production web applications built on a modern, type-safe stack — designed to survive real traffic.",
    description:
      "We build web applications end to end: data model, API, interface, and the deployment pipeline that ships them. Every project starts with a short discovery phase so we agree on scope before a line of code is written, and lands on infrastructure you own — no proprietary lock-in, no black boxes.",
    deliverables: [
      "Architecture and data-model design",
      "REST or tRPC APIs with typed contracts",
      "Responsive, accessible front-end",
      "CI/CD pipeline and staging environment",
      "Handover documentation and code walkthrough",
    ],
    tags: ["Web Apps", "APIs", "Backend", "Frontend"],
  },
  {
    id: "saas-products",
    number: "02",
    title: "SaaS Product Development",
    summary:
      "Multi-tenant platforms with billing, auth, and admin tooling ready from day one.",
    description:
      "Turning a product idea into a subscription business takes more than a landing page. We build the parts every SaaS needs — tenant isolation, role-based access, Stripe billing, usage metering, and an internal admin panel — so you can focus on the features that actually differentiate you.",
    deliverables: [
      "Multi-tenant architecture and role-based access",
      "Stripe subscriptions, trials, and usage metering",
      "Customer-facing analytics dashboards",
      "Internal admin and support tooling",
      "Onboarding flows and transactional email",
    ],
    tags: ["SaaS", "Subscriptions", "Dashboards", "Multi-tenant"],
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI & Automation",
    summary:
      "LLM features and workflow automation wired into the tools your team already uses.",
    description:
      "We integrate language models where they earn their keep: document processing, support triage, structured extraction, and internal copilots. Every integration ships with evaluation criteria and cost controls, so you know what it does well, where it fails, and what it costs per run before it reaches customers.",
    deliverables: [
      "RAG pipelines over your own documents",
      "Structured extraction and classification",
      "Support and back-office copilots",
      "Workflow automation across your existing tools",
      "Evaluation harness and cost monitoring",
    ],
    tags: ["AI", "LLM Integration", "RAG", "Automation"],
  },
  {
    id: "ui-ux-design",
    number: "04",
    title: "UI/UX Design",
    summary:
      "Interface design grounded in real flows, delivered as a system your developers can build from.",
    description:
      "Design here is not a decorative layer added at the end. We map the actual user journeys, prototype the difficult screens first, and deliver a component library with defined states, spacing, and typography — so what gets built matches what was designed.",
    deliverables: [
      "User flows and information architecture",
      "Wireframes and clickable prototypes",
      "High-fidelity interface design",
      "Reusable component and design-token library",
      "Accessibility review against WCAG AA",
    ],
    tags: ["Figma", "Prototyping", "Design Systems", "Accessibility"],
  },
  {
    id: "mobile-apps",
    number: "05",
    title: "Mobile App Development",
    summary:
      "Cross-platform apps from one codebase, shipped to both stores without the duplicated effort.",
    description:
      "We build mobile apps in React Native so iOS and Android share a single codebase, dropping to native modules only where it genuinely matters. That includes the parts teams usually underestimate: offline behaviour, push notifications, deep links, and the store submission process itself.",
    deliverables: [
      "iOS and Android from one React Native codebase",
      "Offline-first data sync",
      "Push notifications and deep linking",
      "App Store and Play Store submission",
      "Over-the-air update pipeline",
    ],
    tags: ["React Native", "iOS", "Android", "Cross-platform"],
  },
  {
    id: "consulting",
    number: "06",
    title: "Tech Consulting",
    summary:
      "An outside read on your architecture, codebase, and delivery process — with a plan attached.",
    description:
      "Sometimes you do not need another pair of hands, you need a straight answer. We audit existing systems and report on what is actually slowing you down: architecture, performance, security posture, or delivery process. You get a prioritised, costed plan rather than a list of complaints.",
    deliverables: [
      "Architecture and scalability review",
      "Codebase and dependency audit",
      "Performance and Core Web Vitals profiling",
      "Security posture assessment",
      "Prioritised, costed remediation roadmap",
    ],
    tags: ["Architecture", "Code Review", "Audits", "Strategy"],
  },
];

/** The four shown on the home page preview grid. */
export const featuredServices = services.slice(0, 4);
