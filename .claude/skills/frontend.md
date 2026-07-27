# Frontend Implementation Guide — Codecrons

This skill covers implementation patterns for every layer of the Codecrons website.
Read the relevant section before implementing each feature.

---

## Available Skills — Use These

Three skills are installed and should be invoked for specific tasks:

| Skill | Invoke with | Use for |
|---|---|---|
| **motion-react** | `/motion-react` | Any animation — scroll effects, gestures, layout transitions, exit animations, spring physics |
| **ui-ux-pro-max** | `/ui-ux-pro-max:ui-ux-pro-max` | UI/UX design decisions, layout, component design, accessibility, visual hierarchy |
| **framer** | `/framer` | Working with the Framer project directly (canvas edits, CMS, publishing) |

**Rule:** Before writing any animation code, invoke `/motion-react`. Before making design decisions, invoke `/ui-ux-pro-max:ui-ux-pro-max`.

---

## 1. Motion / Animation (motion-react skill)

### Package & Import — CRITICAL

The package is **`motion`** (not `framer-motion`). Use the Next.js App Router–optimised import:

```tsx
// ✅ CORRECT — every animated component file
"use client"
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "motion/react-client"

// ❌ WRONG — do not use these
import { motion } from "framer-motion"         // old package name
import { motion } from "motion/react"           // not tree-shaken for App Router
```

Both `motion` and `framer-motion` v12 are installed; always use `"motion/react-client"` in this project.

### Tailwind conflict rule

**Remove all `transition-*` Tailwind classes from `motion.*` elements.** They conflict.

```tsx
// ❌ WRONG
<motion.div className="transition-all duration-300" whileHover={{ scale: 1.05 }} />

// ✅ CORRECT — Tailwind for styling, Motion for animation
<motion.div className="rounded-xl bg-accent-purple p-4" whileHover={{ scale: 1.05 }} />
```

### Reduced motion (accessibility)

Wrap the root layout in a MotionConfig to respect the user's OS setting:

```tsx
import { MotionConfig } from "motion/react-client"
<MotionConfig reducedMotion="user"><App /></MotionConfig>
```

### Fade-up on scroll (standard section entrance)

```tsx
"use client"
import { motion } from "motion/react-client"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  content
</motion.div>
```

### Stagger children

```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map((item) => (
    <motion.li key={item.id} variants={fadeUp}>{item.name}</motion.li>
  ))}
</motion.ul>
```

### Navbar scroll effect

```tsx
"use client"
import { motion, useScroll, useTransform } from "motion/react-client"

const { scrollY } = useScroll()
const bg = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,1)"])
const shadow = useTransform(scrollY, [0, 60], ["0 0 0 rgba(0,0,0,0)", "0 2px 20px rgba(0,0,0,0.08)"])

<motion.header style={{ backgroundColor: bg, boxShadow: shadow }}>
```

### Page transitions

```tsx
"use client"
import { motion } from "motion/react-client"

<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
  {children}
</motion.div>
```

### Layout animations & shared element transitions

```tsx
// Auto-animate any layout change
<motion.div layout />

// Shared element transition across pages (e.g. project card → project detail)
<motion.div layoutId="project-1-image" />
```

### Exit animations

```tsx
import { AnimatePresence } from "motion/react-client"

// AnimatePresence must STAY mounted — never wrap it in a conditional
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
  )}
</AnimatePresence>
```

### 3D card tilt (Portfolio page)

```tsx
"use client"
import { motion, useMotionValue, useTransform } from "motion/react-client"

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  function handleMouseLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
```

### Scroll progress bar

```tsx
"use client"
import { motion, useScroll } from "motion/react-client"

const { scrollYProgress } = useScroll()
<motion.div
  className="fixed top-0 left-0 right-0 h-1 bg-accent-orange origin-left z-50"
  style={{ scaleX: scrollYProgress }}
/>
```

### Count-up animation

```tsx
"use client"
import { useInView } from "motion/react-client"
import { useEffect, useRef, useState } from "react"

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(to / (1500 / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])

  return <span ref={ref}>{count}{suffix}</span>
}
```

---

## 2. Component Conventions

```tsx
"use client" // only when using hooks or browser APIs

import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

export default function ComponentName({ className }: Props) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* content */}
    </section>
  )
}
```

- Always accept `className` and forward it with `cn()`.
- One component per file, `export default`.
- Add `"use client"` only when needed — keep server components where possible.

---

## 3. Tailwind Color Tokens

Use CSS variables, never hardcode hex:

```tsx
bg-bg          // #FFFFFF — page background
bg-bg-subtle   // #FAFAFA — alternating sections
text-fg        // #000000 — headlines
text-fg-muted  // #4D4D4D — body copy
bg-accent-orange  text-accent-orange  // #F94706 — primary CTAs
bg-accent-purple  text-accent-purple  // #6670FF — tags, hover
bg-accent-mint    text-accent-mint    // #66FFD9 — glow, 3D lighting
bg-accent-teal    text-accent-teal    // #00CC99 — secondary CTAs
border-border                          // rgba(0,0,0,0.08)
```

---

## 4. React Three Fiber (3D)

### Canvas setup

```tsx
"use client"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

export default function Scene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {/* 3D objects here */}
        </Suspense>
      </Canvas>
    </div>
  )
}
```

- Always lazy-load 3D components: `dynamic(() => import("@/components/3d/..."), { ssr: false })`
- Hide on mobile: `hidden lg:block` on the wrapper div
- `pointer-events-none` on the canvas wrapper so text/buttons remain clickable

### Continuous rotation + float

```tsx
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function FloatingMesh() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.004
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial color="#6670FF" wireframe transparent opacity={0.7} />
    </mesh>
  )
}
```

### Spline embed

```tsx
"use client"
import Spline from "@splinetool/react-spline"
// npm install @splinetool/react-spline
<Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
```

---

## 5. Marquee / Ticker

```tsx
// Uses .animate-marquee CSS keyframe defined in globals.css
<div className="overflow-hidden w-full py-5 border-y border-border">
  <div className="flex gap-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
    {[...items, ...items].map((item, i) => (
      <span key={i} className={i % 2 === 0 ? "text-accent-orange font-bold" : "text-accent-purple font-bold"}>
        ✦ {item}
      </span>
    ))}
  </div>
</div>
```

---

## 6. Contact Form (React Hook Form + Zod)

```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})
type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    // handle res.ok / error
  }
  // render form fields + errors
}
```

### API route (Resend)

```ts
// src/app/api/contact/route.ts
import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()
  await resend.emails.send({
    from: "website@codecrons.com",
    to: "hi@codecrons.com",
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })
  return Response.json({ ok: true })
}
```

---

## 7. MDX Blog

```tsx
// src/app/blog/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc"
import matter from "gray-matter"
import fs from "fs"
import path from "path"

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const raw = fs.readFileSync(path.join(process.cwd(), "content/blog", `${slug}.mdx`), "utf-8")
  const { content, data } = matter(raw)
  return (
    <article>
      <h1>{data.title}</h1>
      <MDXRemote source={content} />
    </article>
  )
}
```

MDX frontmatter: `title`, `date`, `excerpt`, `coverImage`, `author`

---

## 8. Utilities

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

---

## 9. Image Handling

```tsx
import Image from "next/image"
<Image src="/logo.png" alt="Codecrons" width={160} height={48} priority className="h-10 w-auto" />
```

Logo is at `/public/logo.png`. Always use `next/image`, never `<img>`.

---

## 10. Responsive Breakpoints (mobile-first)

| Tailwind | Min-width | Rule |
|---|---|---|
| default | 0 | Mobile layout |
| `sm:` | 640px | Large mobile |
| `md:` | 768px | Tablet — nav collapses here |
| `lg:` | 1024px | Desktop — 2-col layouts, 3D scenes shown |
| `xl:` | 1280px | Wide desktop |

**3D scenes are always hidden on mobile:** `hidden lg:block` on the 3D wrapper.

---

## 11. Package Install Reference

```bash
# Core (already installed)
npm install motion                           # canonical animation package
npm install @react-three/fiber @react-three/drei three @types/three

# Still needed — run these:
npm install @splinetool/react-spline
npm install react-hook-form zod @hookform/resolvers
npm install resend
npm install next-mdx-remote gray-matter
npm install react-calendly
```
