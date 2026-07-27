import Link from "next/link";
import { Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// TODO: Implement Footer
// Layout: 3 columns on desktop, stacked on mobile
// Col 1: Logo + tagline + email link (hi@codecrons.com)
// Col 2: Nav links
// Col 3: Social links (GitHub, LinkedIn, Twitter/X — add real URLs)
// Bottom bar: copyright "© 2025 Codecrons. All rights reserved."
// Background: bg-fg (black), text: text-bg (white)
export default function Footer() {
  return (
    <footer className="bg-fg text-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xl">Codecrons</span>
            <p className="text-bg/60 text-sm leading-relaxed">
              {/* TODO: Add real company tagline */}
              Building software, SaaS, and AI solutions for the modern web.
            </p>
            <a
              href="mailto:hi@codecrons.com"
              className="inline-flex items-center gap-2 text-accent-mint hover:underline text-sm"
            >
              <Mail size={14} />
              hi@codecrons.com
            </a>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-bg/40 mb-1">Pages</span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-bg/70 hover:text-bg transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          {/* TODO: Add real social media URLs */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-bg/40 mb-1">Connect</span>
            <a href="#" className="text-bg/70 hover:text-bg transition-colors text-sm">GitHub</a>
            <a href="#" className="text-bg/70 hover:text-bg transition-colors text-sm">LinkedIn</a>
            <a href="#" className="text-bg/70 hover:text-bg transition-colors text-sm">Twitter / X</a>
          </div>
        </div>

        <div className="border-t border-bg/10 mt-12 pt-6 text-center text-bg/40 text-sm">
          © {new Date().getFullYear()} Codecrons. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
