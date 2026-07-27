import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a lift + accent border on hover. */
  hover?: boolean;
}

/** Base surface for every boxed block on the site. */
export default function Card({
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-bg border border-border rounded-2xl p-6",
        hover &&
          "transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-accent-purple hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
