# Codecrons Website — Project Guide

This file is the single source of truth for building this project.
Read it fully before writing any code.

---

## Project Overview

**Company:** Codecrons
**What we do:** Full-stack product studio — custom software, SaaS products, AI integrations, and workflow automation for businesses worldwide.
**Website:** https://codecrons.com
**Contact email:** hi@codecrons.com
**GitHub:** https://github.com/gowtham-0903/codecrons-website
**Calendly:** https://calendly.com/codecrons (used in CalendlyEmbed widget on /contact)

---

## Skills — Invoke These Before Writing Code

Three skills are installed for this project. **Read the right skill before starting each task.**

| Skill | Command | When to use |
|---|---|---|
| **motion-react** | `/motion-react` | Any animation — scroll, hover, gestures, exit, layout transitions, spring physics |
| **ui-ux-pro-max** | `/ui-ux-pro-max:ui-ux-pro-max` | UI/UX design decisions, component layout, spacing, visual hierarchy, accessibility |
| **framer** | `/framer` | Editing the Framer source project directly (canvas, CMS, publishing) |

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | TypeScript, SSG/SSR |
| Styling | Tailwind CSS v4 | Utility-first, no CSS modules |
| Animations | **framer-motion** v12 | Use `framer-motion` — NOT `motion/react` or `motion/react-client` |
| 3D (custom scenes) | React Three Fiber + @react-three/drei | Hero, globe, device mockup, particles |
| 3D (decorative) | Spline | Embedded on Services and Contact pages via SplineEmbed.tsx |
| Icons | Lucide React | Only use Lucide — no mixing icon sets |
| Fonts | Public Sans + PT Serif | Loaded via `next/font/google` in layout.tsx |
| Forms | React Hook Form + Zod | Validation on client + server |
| Email | Resend | Contact form submissions → hi@codecrons.com via /api/contact route |
| Blog | MDX (next-mdx-remote) | Posts live in `/content/blog/*.mdx` — no posts created yet |
| Booking | Calendly embed (`react-calendly`) | Inline embed on /contact page |

### Animation import — CRITICAL

**Always use `framer-motion`** in this project. The codebase was standardised on framer-motion, not the `motion` package or `motion/react-client`.

```tsx
"use client"
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion"
```

Never import from `"motion/react"` or `"motion/react-client"` — always use `"framer-motion"`.

### Install commands (run once after cloning)

```bash
npm install
```

All packages are already declared in package.json — a single `npm install` is sufficient.

---

## Logo & Branding Assets (already in /public)

| File | Usage |
|---|---|
| `/public/logo.png` | Dark logo (default, used on light bg via `<Logo />`) |
| `/public/logo-light.png` | Light/inverted logo (used on dark bg via `<Logo invert />`) |
| `/public/logo-mark.png` | Icon-only mark (square favicon or small placement) |
| `/public/hero/character-base.png` | SpotlightHero — base greyscale character image |
| `/public/hero/character-reveal.png` | SpotlightHero — coloured reveal layer (shown in spotlight) |

The `<Logo>` component in `src/components/ui/Logo.tsx` handles the invert logic automatically.

---

## Color Palette

Use these exact CSS variables — defined in `globals.css`. Never hardcode hex values.

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
| `--accent-teal` | `#00CC99` | `text-accent-teal` / `bg-accent-teal` | Status dot, success states |
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

## Site Map & Page Status

| Page | Route | 3D / Special | Status |
|---|---|---|---|
| Home | `/` | Hero scene (R3F), Device mockup (R3F) | ✅ Built |
| Services | `/services` | Spline decorative illustration | ✅ Built |
| Portfolio | `/portfolio` | Portfolio grid with filter tabs | ✅ Built |
| About | `/about` | Rotating 3D globe (R3F) | ✅ Built |
| Blog list | `/blog` | Particle field background (R3F) | ✅ Built |
| Blog post | `/blog/[slug]` | MDX rendering | ✅ Built (no posts yet) |
| Contact | `/contact` | Calendly embed + contact form | ✅ Built |
| 404 | `/not-found` | — | ✅ Built |

---

## Home Page Sections (assembled in `src/app/page.tsx`)

1. **Navbar** — Fixed, transparent → frosted glass on scroll. Logo left, nav links, "Book a Call" CTA.
2. **Hero** — `src/components/home/Hero.tsx` — Two-column layout. Left: headline + CTAs + proof points. Right: lazy-loaded R3F scene.
3. **Marquee** — Infinite ticker: services/keywords. Alternating orange/purple text.
4. **Stats** — Animated counters: `50+ Projects`, `30+ Clients`, `5+ Years`, `3 Products`.
5. **ServicesPreview** — 4 cards linking to `/services`.
6. **Testimonials** — Auto-scroll carousel. Data from `data/testimonials.ts`.
7. **DeviceSection** — 3D device mockup (R3F). CTA → `/portfolio`.
8. **TechStack** — Icon grid from `data/techStack.ts`.
9. **PricingTeaser** — 2 plan cards + custom plan CTA.
10. **CTASection** — Full-width CTA banner.
11. **Footer** — Logo, nav, socials, email, copyright.

### Alternative Hero Components (not yet wired to main page)

- **`SpotlightHero.tsx`** — Mouse-spotlight effect with character image reveal. Uses `public/hero/character-base.png` + `character-reveal.png`. Background: `#E8E8E4`. Floating voxel cubes as decoration.
- **`SpotlightReveal.tsx`** — Interactive code editor panel where the mouse spotlight reveals a neon-glowing version of the code. Used as the right-side panel in SpotlightHero.

To switch the hero, swap `<Hero />` for `<SpotlightHero />` in `src/app/page.tsx`.

---

## File Structure

```
codecrons/
├── public/
│   ├── logo.png                    # Main dark logo
│   ├── logo-light.png              # Inverted light logo
│   ├── logo-mark.png               # Icon-only mark
│   └── hero/
│       ├── character-base.png      # SpotlightHero base layer
│       └── character-reveal.png    # SpotlightHero spotlight reveal
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — fonts, metadata, StructuredData
│   │   ├── globals.css             # CSS variables + Tailwind + animations
│   │   ├── page.tsx                # Home page
│   │   ├── not-found.tsx           # 404 page
│   │   ├── robots.ts               # SEO robots
│   │   ├── sitemap.ts              # SEO sitemap
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     # MDX blog post renderer
│   │   ├── contact/page.tsx
│   │   └── api/contact/route.ts    # POST — validates + sends via Resend
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Fixed nav with scroll + mobile menu
│   │   │   ├── Footer.tsx          # Dark footer with logo, links, socials
│   │   │   ├── CTASection.tsx      # Reusable full-width CTA section
│   │   │   ├── StructuredData.tsx  # JSON-LD schema
│   │   │   └── DevWarningFilter.tsx # Suppresses noisy dev console warnings
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Primary hero (R3F scene on right)
│   │   │   ├── SpotlightHero.tsx   # Alt hero — mouse spotlight + character
│   │   │   ├── SpotlightReveal.tsx # Code editor with spotlight reveal effect
│   │   │   ├── Marquee.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── DeviceSection.tsx
│   │   │   ├── TechStack.tsx
│   │   │   └── PricingTeaser.tsx
│   │   ├── 3d/
│   │   │   ├── HeroScene.tsx       # R3F floating geometry (home hero)
│   │   │   ├── GlobeScene.tsx      # R3F rotating globe (about)
│   │   │   ├── DeviceMockup.tsx    # R3F laptop/device (home mid)
│   │   │   ├── ParticleField.tsx   # R3F animated particles (blog)
│   │   │   ├── DecorScene.tsx      # R3F decorative scene
│   │   │   ├── LazyScene.tsx       # Lazy-loads any 3D scene (prevents SSR issues)
│   │   │   └── SplineEmbed.tsx     # Spline wrapper (services, contact)
│   │   ├── contact/
│   │   │   ├── CalendlyEmbed.tsx   # Inline Calendly widget
│   │   │   └── ContactForm.tsx     # React Hook Form + Zod validated form
│   │   ├── portfolio/
│   │   │   ├── PortfolioGrid.tsx   # Filterable grid
│   │   │   └── ProjectCard.tsx     # Individual project card
│   │   ├── services/
│   │   │   └── ServiceList.tsx     # Service listing with deliverables
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx          # Primary/outline/ghost variants
│   │       ├── Card.tsx
│   │       ├── Logo.tsx            # Renders logo.png / logo-light.png
│   │       ├── Reveal.tsx          # Scroll-triggered reveal wrapper
│   │       ├── SectionHeader.tsx
│   │       └── SocialIcon.tsx
│   ├── data/
│   │   ├── services.ts             # 6 services with deliverables and tags
│   │   ├── projects.ts             # 6 portfolio items (sample — replace before launch)
│   │   ├── testimonials.ts         # Client testimonials
│   │   ├── techStack.ts            # Tech icon grid data
│   │   └── team.ts                 # Team member data
│   ├── lib/
│   │   ├── site.ts                 # Site-wide constants (name, URL, email, links)
│   │   ├── motion.ts               # Shared EASE constant + animation presets
│   │   ├── validation.ts           # Zod schemas (contact form, etc.)
│   │   ├── blog.ts                 # MDX blog helpers (read, parse frontmatter)
│   │   └── utils.ts                # cn() helper (clsx + tailwind-merge)
│   └── content/
│       └── blog/                   # .mdx files go here — none created yet
└── .claude/
    └── launch.json                 # Dev server config for Claude Code browser preview
```

---

## Data Files — What Needs Updating Before Launch

| File | Status | Action needed |
|---|---|---|
| `src/data/projects.ts` | Sample data | Replace 6 items with real client work; add images to `/public/projects/` |
| `src/data/testimonials.ts` | Placeholder | Replace with real client quotes |
| `src/data/team.ts` | Placeholder | Fill in real team members |
| `src/data/services.ts` | ✅ Real content | — |
| `src/data/techStack.ts` | ✅ Real content | — |
| `content/blog/` | Empty | Add `.mdx` blog posts |

---

## CSS Utilities (defined in globals.css)

| Class | What it does |
|---|---|
| `.text-gradient` | Animated orange→purple gradient text (used in hero headline) |
| `.dot-grid` | Subtle dotted-grid background texture |
| `.scene-glow` | Purple radial glow behind 3D canvas elements |
| `.animate-marquee` | 28s infinite horizontal scroll (services ticker) |
| `.animate-marquee-slow` | 45s version (testimonials) |
| `.edge-fade` | Mask that fades left/right edges of scroll strips |
| `.prose-codecrons` | Blog typography overrides for @tailwindcss/typography |

---

## Navigation Links (from `src/lib/site.ts`)

```
Home → /
About → /about
Work → /portfolio
Services → /services
Blog → /blog
Contact → /contact
```

"Book a Call" button routes to `/contact` (internal Next.js Link, not external).

---

## Git Rules — CRITICAL

- **Never commit directly to `prod`.** Always work on `dev` and open a Pull Request.
- **All your work goes to `dev` branch only.**
- **Do not add co-authors to commits.** No `Co-Authored-By:` lines.
- **Commit message format:** `type: short description` — e.g. `feat: add hero section`, `fix: mobile nav`, `chore: update deps`
- **PR title** must describe what changed. Include screenshots for UI changes.

---

## Env Variables

Create a `.env.local` file at the root of `/codecrons/` (never commit this):

```env
RESEND_API_KEY=your_resend_api_key_here
```

The `/api/contact` route reads `RESEND_API_KEY` to send emails via Resend to `hi@codecrons.com`.

---

## Dev Server

```bash
cd codecrons
npm run dev
```

Runs on `http://localhost:3000`. A `.claude/launch.json` config is included for the Claude Code browser preview.

---

## Build & Deploy Notes

- **Platform:** Vercel (configured via `.vercel` on deploy — not committed)
- **Domain:** codecrons.com
- **Branch strategy:** `dev` → PR → `prod`
- `npm run build` to check for type errors and build output before pushing

---

## What's Still TODO Before Launch

- [ ] Replace sample portfolio projects with real client work
- [ ] Add real client testimonials
- [ ] Create first blog posts (`/content/blog/*.mdx`)
- [ ] Add `RESEND_API_KEY` to Vercel env vars (contact form won't send without it)
- [ ] Decide whether to keep the original `Hero.tsx` or switch to `SpotlightHero.tsx`
- [ ] Add project screenshot images to `/public/projects/`
- [ ] Verify Calendly embed URL (`https://calendly.com/codecrons`) is live
- [ ] SEO: Add a real OG image (`/public/og-image.png`) — referenced in layout.tsx metadata
- [ ] Add `sharp` config to `next.config.ts` if image optimization warnings appear
