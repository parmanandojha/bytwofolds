"use client";
import { useEffect, useState } from "react";

/** Development only: Shift + G shows the 4 / 8 / 12 column grid. */
export function GridOverlay() {
  const [on, set] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest("input,textarea,select");
      if (e.shiftKey && e.key.toLowerCase() === "g" && !typing) set((v) => !v);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);
  if (!on) return null;
  return (
    <div className="site-grid pointer-events-none fixed inset-x-2 inset-y-0 z-[90]" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className={`h-full bg-signal/15 ${i >= 8 ? "hidden desk:block" : i >= 4 ? "hidden tab:block" : ""}`} />
      ))}
    </div>
  );
}
