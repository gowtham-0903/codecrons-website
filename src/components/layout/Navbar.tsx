"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const BOOK_CALL_URL = "https://calendly.com/codecrons";

// TODO: Implement Navbar
// - Fixed position, full width, z-50
// - Transparent bg at top → solid white bg after scrolling 60px (use Framer Motion useTransform)
// - Logo: use next/image with /public/logo.png (fallback to text "Codecrons" if logo missing)
// - Desktop: logo left, nav links center-right, "Book a Call" button far right
// - Mobile: hamburger icon, slide-down menu with all links + CTA
// - Active link should be underlined or have accent-orange indicator
// - "Book a Call" → opens BOOK_CALL_URL in new tab
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  // TODO: implement full navbar
  return (
    <motion.header
      style={{ backgroundColor: `rgba(255,255,255,${bgOpacity})` } as React.CSSProperties}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Codecrons" width={160} height={48} priority className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-fg-muted hover:text-fg transition-colors font-medium">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={BOOK_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-accent-orange text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Book a Call
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-fg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* TODO: Implement mobile slide-down menu */}
    </motion.header>
  );
}
