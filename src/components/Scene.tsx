"use client";
import { useEffect, useRef } from "react";

const scenes = {
  fold: () => import("@/three/fold").then((m) => m.mountFold),
  sea: () => import("@/three/sea").then((m) => m.mountSea),
};

/** Loads Three.js only when the canvas is near the viewport; the page works without it. */
export function Scene({ name, label, className = "", eager = false }: { name: keyof typeof scenes; label: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    let dead = false, off: (() => void) | undefined;
    const load = () =>
      scenes[name]()
        .then((mount) => {
          if (dead) return;
          off = mount(el);
          el.style.opacity = "1";
        })
        .catch((e) => console.warn("3D scene unavailable", e)); // the dark backdrop stays
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      load();
    }, { rootMargin: "600px" });
    if (eager) load();
    else io.observe(el);
    return () => { dead = true; io.disconnect(); off?.(); };
  }, [name, eager]);
  return <div ref={ref} role="img" aria-label={label} style={{ opacity: 0 }} className={`transition-opacity duration-1000 ${className}`} />;
}
