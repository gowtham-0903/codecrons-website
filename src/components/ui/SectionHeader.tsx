import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small pill above the title, e.g. "Our Services" */
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Use on dark (bg-fg) sections. */
  invert?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  invert = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {label && (
        <span
          className={cn(
            "inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest",
            align === "center" && "self-center",
            invert
              ? "border-bg/20 text-accent-mint"
              : "border-border text-accent-orange",
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              invert ? "bg-accent-mint" : "bg-accent-orange",
            )}
            aria-hidden
          />
          {label}
        </span>
      )}

      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-balance",
          invert ? "text-bg" : "text-fg",
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed max-w-2xl text-pretty",
            invert ? "text-bg/70" : "text-fg-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
