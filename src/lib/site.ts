// Single source of truth for site-wide constants.
// Update these when the real Calendly link / socials go live.

export const site = {
  name: "Codecrons",
  tagline: "Full-Stack Product Studio",
  description:
    "Codecrons is a full-stack product studio building custom software, SaaS products, AI integrations, and workflow automation for businesses worldwide.",
  url: "https://codecrons.com",
  email: "hi@codecrons.com",
  bookCallUrl: "/contact",
  // Calendly username/event path used by the inline widget on /contact
  calendlyUrl: "https://calendly.com/codecrons",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/codecrons" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/codecrons" },
  { label: "Twitter / X", href: "https://x.com/codecrons" },
] as const;
