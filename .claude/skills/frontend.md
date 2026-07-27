# Frontend Implementation Guide — Codecrons

This skill covers implementation patterns for every layer of the Codecrons website.
Read the relevant section before implementing each feature.

---

## 1. Component Conventions

### Anatomy of every component

```tsx
"use client"; // only if the component uses hooks or browser APIs

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  // ... other props
}

export default function ComponentName({ className }: Props) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* content */}
    </section>
  );
}
```

- Always accept a `className` prop and forward it with `cn()`.
- Add `"use client"` only when needed — default to server components.
- Export as `default` — one component per file.

---

## 2. Tailwind Conventions

Use CSS variables via the mapped Tailwind tokens (set up in globals.css):

```tsx
// Backgrounds
<div className="bg-bg">        // #FFFFFF
<div className="bg-bg-subtle"> // #FAFAFA — alternating sections

// Text
<p className="text-fg">        // #000000
<p className="text-fg-muted">  // #4D4D4D
<p className="text-fg-faint">  // #F2F2F2

// Accents
<span className="text-accent-orange bg-accent-orange">  // #F94706
<span className="text-accent-purple bg-accent-purple">  // #6670FF
<span className="text-accent-mint">                     // #66FFD9
<span className="text-accent-teal">                     // #00CC99

// Borders
<div className="border border-border"> // rgba(0,0,0,0.08)
```

Never hardcode hex values. Always use the token.

---

## 3. Framer Motion Patterns

### Fade-up on scroll (use for every section)

```tsx
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
};

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map((item) => (
    <motion.li key={item.id} variants={fadeUp}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

### Navbar scroll effect

```tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";

const { scrollY } = useScroll();
const bg = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]);
const shadow = useTransform(scrollY, [0, 60], ["0 0 0 rgba(0,0,0,0)", "0 2px 20px rgba(0,0,0,0.08)"]);

<motion.header style={{ backgroundColor: bg, boxShadow: shadow }}>
```

### Page transition wrapper

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
>
  {children}
</motion.div>
```

---

## 4. React Three Fiber (3D) Patterns

### Canvas setup (always use Suspense)

```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {/* your 3D objects */}
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Floating geometry (HeroScene)

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FloatingShape() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    ref.current.rotation.y += 0.005;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color="#6670FF" wireframe />
    </mesh>
  );
}
```

### Rotating Globe (GlobeScene — About page)

```tsx
import { Sphere, OrbitControls } from "@react-three/drei";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.002; });
  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#6670FF"
        wireframe
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}
```

### Particle field (ParticleField — Blog page)

```tsx
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x -= delta / 10;
  });
  return (
    <Points ref={ref} positions={sphere} stride={3}>
      <PointMaterial size={0.005} color="#66FFD9" sizeAttenuation depthWrite={false} />
    </Points>
  );
}
```

### Spline embed (SplineEmbed wrapper)

```tsx
"use client";
import Spline from "@splinetool/react-spline";

interface Props {
  url: string;
  className?: string;
}

export default function SplineEmbed({ url, className }: Props) {
  return (
    <div className={cn("w-full h-full", className)}>
      <Spline scene={url} />
    </div>
  );
}
```

---

## 5. Marquee / Ticker

```tsx
"use client";
// Uses the CSS animation defined in globals.css (.animate-marquee)

export default function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items]; // duplicate for seamless loop
  return (
    <div className="overflow-hidden w-full py-4 border-y border-border">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className={i % 2 === 0 ? "text-accent-orange font-bold" : "text-accent-purple font-bold"}>
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

---

## 6. Contact Form (React Hook Form + Zod)

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // handle success / error
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* fields */}
    </form>
  );
}
```

### API route (Resend)

```ts
// src/app/api/contact/route.ts
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  // validate with zod, then:
  await resend.emails.send({
    from: "website@codecrons.com",
    to: "hi@codecrons.com",
    subject: `New message from ${body.name}`,
    text: body.message,
  });
  return Response.json({ ok: true });
}
```

---

## 7. MDX Blog Setup

```tsx
// src/app/blog/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const file = fs.readFileSync(
    path.join(process.cwd(), "content/blog", `${params.slug}.mdx`),
    "utf-8"
  );
  const { content, data } = matter(file);
  return (
    <article>
      <h1>{data.title}</h1>
      <MDXRemote source={content} />
    </article>
  );
}
```

### Blog post frontmatter format

```mdx
---
title: "Your Post Title"
date: "2025-01-01"
excerpt: "Short description shown on the blog list page"
coverImage: "/blog/cover.jpg"
author: "Codecrons"
---

Post content here...
```

---

## 8. The `cn()` Utility

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 9. Image Handling

Always use `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/logo.png"          // files in /public are served from /
  alt="Codecrons logo"
  width={140}
  height={40}
  priority                  // add for above-the-fold images
/>
```

---

## 10. Responsive Breakpoints

Use Tailwind's default breakpoints. Design mobile-first:

| Breakpoint | Min width | Usage |
|---|---|---|
| (default) | 0px | Mobile |
| `sm:` | 640px | Large mobile |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide desktop |

The navbar collapses to a hamburger at `md` and below.
3D scenes should be hidden on mobile (`hidden lg:block`) to preserve performance.
