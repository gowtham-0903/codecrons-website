import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  color?: "orange" | "purple" | "mint" | "teal" | "default";
  className?: string;
}

// TODO: Implement badge / tag chip component
// orange  → bg-accent-orange/10 text-accent-orange
// purple  → bg-accent-purple/10 text-accent-purple
// mint    → bg-accent-mint/10 text-accent-teal
// teal    → bg-accent-teal/10 text-accent-teal
// default → bg-fg-faint text-fg-muted
export default function Badge({ label, color = "default", className }: BadgeProps) {
  // TODO: implement color variants
  return (
    <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-semibold", className)}>
      {label}
    </span>
  );
}
