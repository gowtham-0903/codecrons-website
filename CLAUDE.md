# Codecrons Website — Project Guide

This file is the single source of truth for building this project.
Read it fully before writing any code.

---

## Project Overview

**Company:** Codecrons
**What we do:** Full-stack product studio — custom software, SaaS products, AI integrations, and workflow automation for businesses worldwide.
**Contact email:** hi@codecrons.com
**Book a call:** https://calendly.com/codecrons (update when live Calendly is ready)

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | TypeScript, SSG/SSR |
| Styling | Tailwind CSS v4 | Utility-first, no CSS modules |
| Page animations | Framer Motion | Scroll reveals, page transitions |
| 3D (custom scenes) | React Three Fiber + @react-three/drei | Hero, globe, device mockup, particles |
| 3D (decorative) | Spline | Embedded on Services and Contact pages |
| UI primitives | shadcn/ui | Accessible base components |
| Icons | Lucide React | Only use Lucide — no mixing icon sets |
| Fonts | Public Sans + PT Serif | Loaded via `next/font/google` |
| Forms | React Hook Form + Zod | Validation on client + server |
| Email | Resend | Contact form submissions → hi@codecrons.com |
| Blog | MDX (next-mdx-remote) | Posts live in `/content/blog/*.mdx` |
| Booking | Calendly embed | Inline embed on Contact page |

### Install commands (run once)

```bash
npm install framer-motion lucide-react clsx tailwind-merge
npm install @react-three/fiber @react-three/drei three
npm install @types/three --save-dev
npm install @splinetool/react-spline
npm install react-hook-form zod @hookform/resolvers
npm install resend
npm install next-mdx-remote gray-matter
```

---

## Logo

The logo image file will be placed in the `/public` folder by the project owner.
Reference it as `/logo.png` (or `/logo.svg`). Use a text fallback `Codecrons` if the file does not exist yet.

---

## Color Palette

Use these exact CSS variables — defined in `globals.css`. Never hardcode hex values; use the variables or the mapped Tailwind classes.

| Variable | Hex | Tailwind class | Usage |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `bg-bg` | Page background |
| `--bg-subtle` | `#FAFAFA` | `bg-bg-subtle` | Alternating sections |
| `--fg` | `#000000` | `text-fg` | Headlines, primary text |
| `--fg-muted` | `#4D4D4D` | `text-fg-muted` | Body copy, secondary text |
| `--fg-faint` | `#F2F2F2` | `text-fg-faint` | Disabled / placeholder |
| `--accent-orange` | `#F94706` | `text-accent-orange` / `bg-accent-orange` | Primary CTAs, highlights |
| `--accent-purple` | `#6670FF` | `text-accent-purple` / `bg-accent-purple` | Tags, hover states, badges |
| `--accent-mint` | `#66FFD9` | `text-accent-mint` / `bg-accent-mint` | 3D glow, neon highlights |
| `--accent-teal` | `#00CC99` | `text-accent-teal` / `bg-accent-teal` | Secondary CTAs, success states |
| `--border` | `rgba(0,0,0,0.08)` | `border-border` | Card borders, dividers |

---

## Typography

| Role | Font | Weight | Class |
|---|---|---|---|
| Display / H1 | PT Serif | 700 | `font-serif font-bold` |
| H2–H3 | Public Sans | 700–800 | `font-sans font-bold` |
| Body | Public Sans | 400 | `font-sans` |
| Caption / label | Public Sans | 500–600 | `font-sans font-medium` |

---

## Site Map & 3D Assignment

| Page | Route | 3D Element |
|---|---|---|
| Home | `/` | **Scene 1:** Abstract floating geometric shapes (R3F) in hero<br>**Scene 2:** 3D device mockup showing a dashboard (R3F) mid-page |
| Services | `/services` | Spline decorative illustration (right-side accent) |
| Portfolio | `/portfolio` | Floating 3D cards with hover tilt effect (R3F) |
| About | `/about` | Rotating 3D globe — "global reach" concept (R3F) |
| Blog | `/blog` | Subtle animated particle field background (R3F) |
| Contact | `/contact` | Spline decorative scene + inline Calendly embed |

---

## Home Page Sections (in order)

1. **Navbar** — Fixed, transparent → solid white on scroll. Logo left, nav links right, "Book a Call" CTA button.
2. **Hero** — Large headline (`<h1>`), sub-tagline, two CTA buttons: "View Our Work" (`/portfolio`) and "Book a Call" (https://calendly.com/codecrons). 3D floating shapes fill the right half.
3. **Marquee** — Infinite horizontal ticker: services / keywords. Speed: slow. Colors: alternating orange and purple text.
4. **Stats** — Animated counters on scroll. Placeholder values: `50+ Projects`, `30+ Clients`, `5+ Years`, `3 Products`.
5. **Services Preview** — 4 cards: Software Development, SaaS Products, AI & Automation, UI/UX Design. Each links to `/services`.
6. **Testimonials** — Auto-scroll carousel. Placeholder testimonials in `data/testimonials.ts`.
7. **Device 3D** — Full-width section. Left: headline + "See our work" CTA (`/portfolio`). Right: 3D device mockup (R3F).
8. **Tech Stack** — Icon grid. Tools listed in `data/techStack.ts`.
9. **Pricing Teaser** — 2 plan cards + custom plan CTA (mailto:hi@codecrons.com). Full pricing can be added to `/services` later.
10. **Footer** — Logo, nav links, social icons, copyright, "hi@codecrons.com".

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, metadata
│   ├── globals.css                 # CSS variables + Tailwind base
│   ├── page.tsx                    # Home page
│   ├── services/
│   │   └── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts            # POST handler — validates + sends email via Resend
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── Stats.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TechStack.tsx
│   │   ├── PricingTeaser.tsx
│   │   └── DeviceSection.tsx
│   ├── 3d/
│   │   ├── HeroScene.tsx           # R3F floating geometry (home hero)
│   │   ├── GlobeScene.tsx          # R3F rotating globe (about page)
│   │   ├── DeviceMockup.tsx        # R3F laptop/device model (home mid)
│   │   ├── ParticleField.tsx       # R3F animated particles (blog)
│   │   └── SplineEmbed.tsx         # Spline scene wrapper (services, contact)
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── SectionHeader.tsx
│       └── Badge.tsx
├── data/
│   ├── services.ts                 # All service listings
│   ├── projects.ts                 # Portfolio items
│   ├── testimonials.ts             # Client testimonials
│   └── techStack.ts                # Tools / tech icons
├── content/
│   └── blog/                       # .mdx files go here
└── lib/
    └── utils.ts                    # cn() helper and shared utilities
```

---

## Git Rules (Read carefully)

- **Never commit directly to `prod`.** Always work on `dev` and open a Pull Request.
- **All your work goes to `dev` branch only.** `prod` is protected and requires a PR review.
- **Do not add co-authors to commits.** Each commit should only have you as the author. No `Co-Authored-By:` lines.
- **Commit message format:** `type: short description` — e.g. `feat: add hero section`, `fix: mobile nav`, `chore: update deps`.
- **PR title** must describe what changed. Include screenshots for UI changes.

---

## Env Variables

Create a `.env.local` file (never commit this):

```env
RESEND_API_KEY=your_resend_api_key_here
```

---

## Skills Reference

See `.claude/skills/frontend.md` for implementation patterns, 3D library usage, Framer Motion recipes, and component conventions.

---

## Notes for the Developer

- The logo file will be at `/public/logo.png` or `/public/logo.svg` — use `next/image` to render it.
- All content (services, projects, testimonials) lives in `/src/data/` — edit those files to update page content.
- For blog posts, create `.mdx` files in `/content/blog/`. Each file needs frontmatter: `title`, `date`, `excerpt`, `coverImage`.
- The "Book a Call" button URL is `https://calendly.com/codecrons` — update this when the real link is ready.
- Contact form submissions go to `hi@codecrons.com` via Resend.
