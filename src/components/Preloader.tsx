"use client";
import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger, utils } from "animejs";
import { markReady } from "@/lib/ready";

/** Anime.js: the mark folds open, the count runs, then the page grid itself folds away. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    if (getComputedStyle(el).display === "none") {
      markReady();
      setGone(true);
      return;
    }
    let dead = false;
    const $ = (s: string) => Array.from(el.querySelectorAll(s));
    const num = el.querySelector(".pl-num")!;
    const count = { v: 0 };
    const intro = createTimeline({ defaults: { ease: "outExpo" } })
      .add($(".facet-a"), { scaleY: [0, 1], duration: 800 }, 100)
      .add($(".facet-b"), { scaleY: [0, 1], duration: 800 }, 420)
      .add(count, { v: 100, duration: 1400, ease: "inOutQuart", onUpdate: () => { num.textContent = String(Math.round(count.v)).padStart(3, "0"); } }, 100)
      .add($(".pl-bar"), { scaleX: [0, 1], duration: 1400, ease: "inOutQuart" }, 100);

    Promise.all([intro.then(), Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))])]).then(() => {
      if (dead) return;
      try { sessionStorage.setItem("btf", "1"); } catch {}
      animate($(".pl-fade"), { opacity: 0, y: -12, duration: 350, ease: "outQuad" });
      animate($(".pl-col"), { scaleY: [1, 0], duration: 900, ease: "inOutQuart", delay: stagger(35, { start: 200 }) }).then(() => !dead && setGone(true));
      setTimeout(markReady, 500);
    });
    return () => { dead = true; intro.pause(); utils.remove(count); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="preloader fixed inset-0 z-[80] text-ink" role="status" aria-label="Loading">
      <div className="absolute inset-0 grid grid-cols-4 tab:grid-cols-8 desk:grid-cols-12" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`pl-col origin-top bg-mist shadow-[1px_0_0_var(--color-mist)] ${i >= 8 ? "hidden desk:block" : i >= 4 ? "hidden tab:block" : ""}`} />
        ))}
      </div>
      <div className="pl-fade site-grid absolute inset-0 items-end pb-6" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="col-span-2 size-16 self-start pt-6 desk:size-20" fill="#101112">
          <path className="facet-a" style={{ transformOrigin: "16px 16px" }} d="M10 3h20l-8 13H2z" />
          <path className="facet-b" style={{ transformOrigin: "16px 16px" }} d="M2 16h20l8 13H10z" opacity=".55" />
        </svg>
        <p className="col-span-full row-start-2 mb-4 max-w-[18ch] text-title tight text-balance tab:col-span-5">You already have an opinion of us.</p>
        <p className="pl-num col-span-full row-start-3 text-mega tight tabular-nums tab:row-start-2 tab:col-span-3 tab:col-start-6 tab:text-right desk:col-start-10 desk:text-figure">000</p>
        <div className="pl-bar absolute inset-x-0 bottom-0 h-1 origin-left bg-signal" />
      </div>
    </div>
  );
}
