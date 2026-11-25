"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { animate } from "animejs";
import { services, startingPoints } from "@/lib/content";
import { ServiceIcon } from "./ServiceIcon";
import { Arrow } from "./ui";

const points = startingPoints.map((p) => ({ ...p, service: services.find((s) => s.slug === p.start)! }));

/** Pick the problem on the left, read the recommended service on the right. */
export function StartPicker() {
  const [on, setOn] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const pick = (i: number) => {
    if (i === on) return;
    setOn(i);
    if (panel.current && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      requestAnimationFrame(() => panel.current && animate(panel.current.querySelectorAll("[data-active] > *"), { y: [20, 0], opacity: [0, 1], duration: 600, ease: "outExpo", delay: (_, n) => (n ?? 0) * 60 }));
  };
  return (
    <div className="site-grid">
      <ul className="col-span-full desk:col-span-7">
        {points.map((p, i) => (
          <li key={p.start} className="border-t border-ink/25 last:border-b">
            <button onClick={() => pick(i)} aria-expanded={on === i} aria-controls={`start-${i}`} className="group flex w-full items-center gap-6 py-6 text-left">
              <span className={`size-4 shrink-0 rounded-full border border-ink transition-colors duration-300 ${on === i ? "bg-signal" : "group-hover:bg-ink/20"}`} aria-hidden="true" />
              <span className={`text-title tight transition-[translate,opacity] duration-500 ${on === i ? "translate-x-2" : "opacity-60 group-hover:opacity-100"}`}>{p.need}</span>
            </button>
            <div className={`grid transition-[grid-template-rows,visibility] duration-500 desk:hidden ${on === i ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}>
              <div className="min-h-0 overflow-hidden">
                <p className="pl-10 leading-snug">{p.why}</p>
                <Link href={`/services/${p.start}`} className="inline-flex items-center gap-4 py-4 pl-10 font-medium underline underline-offset-4">{p.service.name}<Arrow /></Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div ref={panel} className="relative hidden bg-ink text-white desk:col-span-4 desk:col-start-9 desk:block" aria-live="polite">
        {points.map((p, i) => (
          <div key={p.start} id={`start-${i}`} data-active={on === i || undefined} hidden={on !== i} className={`h-full flex-col p-6 ${on === i ? "flex" : ""}`}>
            <ServiceIcon icon={p.service.icon} className="size-32" stroke={0.7} />
            <p className="mt-auto pt-16 text-sm text-ash">{p.why}</p>
            <p className="mt-2 text-title tight">{p.service.name}</p>
            <p className="mt-4 leading-snug text-white/85">{p.service.headline}</p>
            <Link href={`/services/${p.start}`} className="group mt-8 flex h-12 items-center justify-between bg-white pr-2 pl-4 text-ink transition-colors hover:bg-signal">
              <span className="label">See this service</span><Arrow className="mr-2 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
