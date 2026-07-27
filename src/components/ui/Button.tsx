import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

// TODO: Implement full button component with all variants
// primary   → bg-accent-orange text-white
// secondary → bg-accent-purple text-white
// outline   → border border-fg bg-transparent text-fg hover:bg-fg hover:text-bg
// ghost     → no border, transparent, hover underline
// All variants must have hover + focus-visible ring styles
// Support href prop to render as <a> tag
export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  // TODO: implement
  return (
    <button
      className={cn("inline-flex items-center justify-center font-semibold rounded-full transition-all", className)}
      {...props}
    >
      {children}
    </button>
  );
}
