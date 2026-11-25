"use client";
import { useEffect, useRef } from "react";
import { animate, stagger, svg } from "animejs";
import type { Service } from "@/lib/content";
import { iconPaths } from "@/lib/icons";
import { onReady } from "@/lib/ready";

/** Line icon that draws itself the first time it is seen. */
export function ServiceIcon({ icon, className = "", stroke = 0.35 }: { icon: Service["icon"]; className?: string; stroke?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let off = () => {};
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      off = onReady(() => { animate(svg.createDrawable(ref.current!.querySelectorAll<SVGPathElement>("path")), { draw: ["0 0", "0 1"], duration: 1800, ease: "inOutQuad", delay: stagger(160) }); });
    });
    io.observe(ref.current!);
    return () => { io.disconnect(); off(); };
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden="true">
      {iconPaths[icon].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
