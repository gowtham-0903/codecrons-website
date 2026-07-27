import { cn } from "@/lib/utils";

type BadgeColor = "orange" | "purple" | "mint" | "teal" | "default";

const COLORS: Record<BadgeColor, string> = {
  orange: "bg-accent-orange/10 text-accent-orange",
  purple: "bg-accent-purple/10 text-accent-purple",
  mint: "bg-accent-mint/20 text-accent-teal",
  teal: "bg-accent-teal/10 text-accent-teal",
  default: "bg-fg-faint text-fg-muted",
};

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  className?: string;
}

/** Small pill used for service tags, project categories, and section labels. */
export default function Badge({
  label,
  color = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
        COLORS[color],
        className,
      )}
    >
      {label}
    </span>
  );
}
