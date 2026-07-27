"use client";

import { useEffect, useRef, useState } from "react";
import { InlineWidget } from "react-calendly";
import { site } from "@/lib/site";

/**
 * Inline Calendly booking widget.
 *
 * Mounted only once scrolled near — the widget pulls in its own script and
 * iframe, which is a meaningful cost to pay on initial page load.
 */
export default function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border overflow-hidden bg-bg-subtle"
    >
      {mounted ? (
        <InlineWidget
          url={site.calendlyUrl}
          styles={{ height: "660px" }}
          pageSettings={{
            backgroundColor: "ffffff",
            primaryColor: "F94706",
            textColor: "000000",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
          }}
        />
      ) : (
        <div className="h-[660px] flex items-center justify-center">
          <span className="text-fg-muted text-sm">Loading calendar…</span>
        </div>
      )}
    </div>
  );
}
