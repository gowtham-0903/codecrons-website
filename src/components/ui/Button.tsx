import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent-orange text-white shadow-sm hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg",
  secondary:
    "bg-accent-purple text-white shadow-sm hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg",
  outline:
    "border-2 border-fg text-fg bg-transparent hover:bg-fg hover:text-bg hover:-translate-y-0.5",
  ghost: "text-fg-muted hover:text-fg underline-offset-4 hover:underline",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: Variant;
  size?: Size;
  /** Renders an anchor / next-link instead of a <button>. */
  href?: string;
  /** Force target="_blank" — inferred automatically for http(s) links. */
  external?: boolean;
  children: ReactNode;
}

/**
 * The single button primitive for the site.
 * Renders <button>, <Link> (internal href), or <a> (http/mailto href).
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (href) {
    const isOutbound = external || /^(https?:|mailto:|tel:)/.test(href);

    if (isOutbound) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
