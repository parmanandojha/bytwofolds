"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Sticky index that follows the stages beside it. */
export function StageRail({ names, start, ids, light }: { names: string[]; start: number; ids: string[]; light: boolean }) {
  const [on, setOn] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    ids.forEach((id, i) => ScrollTrigger.create({ trigger: document.getElementById(id), start: "top 55%", end: "bottom 55%", onToggle: (s) => { if (s.isActive) setOn(i); } }));
    const list = document.getElementById(ids[0])!.parentElement!;
    gsap.fromTo(bar.current, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: list, start: "top 55%", end: "bottom 55%", scrub: true } });
  }, { scope: root });

  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo("[data-digit]", { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power4.out" });
  }, { scope: root, dependencies: [on] });

  return (
    <div ref={root} className="sticky top-24 flex h-[calc(100svh-8rem)] max-h-[48rem] flex-col justify-between">
      <p className="overflow-hidden text-[clamp(8rem,19vw,20rem)] leading-[0.8] tight tabular-nums" aria-hidden="true">
        <span data-digit className="block pb-[.08em]">0{start + on + 1}</span>
      </p>
      <nav aria-label="Stages" className="relative pl-6">
        <span className={`absolute inset-y-0 left-0 w-px ${light ? "bg-ink/25" : "bg-white/20"}`} aria-hidden="true"><span ref={bar} className="block h-full w-px bg-signal" /></span>
        <ol>
          {names.map((n, i) => (
            <li key={n}>
              <a href={`#${ids[i]}`} aria-current={on === i ? "step" : undefined} className={`block py-2 text-title tight transition-opacity duration-300 ${on === i ? "" : "opacity-50 hover:opacity-100"}`}>{n}</a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
