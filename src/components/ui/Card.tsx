import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean; // enable hover lift + border color change
}

// TODO: Implement card component
// Default: white bg, border-border, rounded-2xl, p-6
// hover=true: adds hover:shadow-lg hover:border-accent-purple transition
export default function Card({ hover = false, className, children, ...props }: CardProps) {
  // TODO: implement
  return (
    <div
      className={cn(
        "bg-bg border border-border rounded-2xl p-6",
        hover && "transition-all cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
