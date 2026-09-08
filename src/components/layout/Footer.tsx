import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { navLinks, site, socialLinks } from "@/lib/site";
import Logo from "@/components/ui/Logo";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Footer() {
  return (
    <footer className="bg-fg text-bg mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo invert width={235} />
            <p className="text-bg/60 text-sm leading-relaxed max-w-xs">
              A full-stack product studio building custom software, SaaS
              platforms, and AI integrations for teams that need it done
              properly.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-accent-mint hover:underline text-sm w-fit"
            >
              <Mail size={14} />
              {site.email}
            </a>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3" aria-label="Footer">
            <span className="text-xs font-semibold uppercase tracking-widest text-bg/40 mb-1">
              Pages
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-bg/70 hover:text-bg transition-colors text-sm w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials + CTA */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-bg/40 mb-1">
              Connect
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-bg/70 hover:text-bg transition-colors text-sm w-fit"
              >
                <SocialIcon name={link.label} />
                {link.label}
              </a>
            ))}

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent-orange text-white font-semibold text-sm w-fit transition-all hover:opacity-90 hover:-translate-y-0.5"
            >
              Book a Call
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="border-t border-bg/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-bg/40 text-sm">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind, and Three.js.</p>
        </div>
      </div>
    </footer>
  );
}
