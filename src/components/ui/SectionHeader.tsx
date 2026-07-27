import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;       // small tag above the title e.g. "Our Services"
  title: string;        // main heading
  subtitle?: string;    // optional paragraph below
  align?: "left" | "center";
  className?: string;
}

// TODO: Implement section header component
// label  → small uppercase text with accent-orange or accent-purple color + border pill
// title  → large h2 using PT Serif (font-serif)
// subtitle → text-fg-muted, max-w-2xl
// align center → items-center text-center
export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  // TODO: implement
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {label && <span className="text-sm font-semibold text-accent-orange uppercase tracking-widest">{label}</span>}
      <h2 className="font-serif text-4xl font-bold text-fg">{title}</h2>
      {subtitle && <p className="text-fg-muted text-lg">{subtitle}</p>}
    </div>
  );
}
