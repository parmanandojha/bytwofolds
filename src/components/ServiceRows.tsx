"use client";
import Link from "next/link";
import { useRef } from "react";
import { animate, stagger, svg } from "animejs";
import { services, type Service } from "@/lib/content";
import { iconPaths } from "@/lib/icons";


function Row({ s, n }: { s: Service; n: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const enter = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(svg.createDrawable(ref.current!.querySelectorAll<SVGPathElement>("path")), { draw: ["0 0", "0 1"], duration: 900, ease: "inOutQuad", delay: stagger(110) });
  };
  return (
    <Link
      ref={ref}
      href={`/services/${s.slug}`}
      onPointerEnter={enter}
      onFocus={enter}
      className="group relative isolate block text-white transition-colors duration-300 hover:text-ink focus-visible:text-ink"
    >
      <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-slate transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" aria-hidden="true" />
      <span className="site-grid min-h-18 items-center py-4 desk:min-h-22">
        <span className="label hidden text-ash transition-colors group-hover:text-ink tab:col-span-2 tab:block desk:col-span-3">/ {String(n).padStart(2, "0")}</span>
        <span className="col-span-3 text-title tight transition-transform duration-500 ease-out group-hover:translate-x-2 tab:col-span-5 desk:col-span-4">{s.name}</span>
        <span className="hidden max-w-[40ch] text-sm leading-snug opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 desk:col-span-4 desk:block">{s.headline}</span>
        <svg viewBox="0 0 48 48" className="col-span-1 size-10 justify-self-end text-white/60 transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink desk:size-12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          {iconPaths[s.icon].map((d) => <path key={d} d={d} />)}
        </svg>
      </span>
      <span data-rule className="absolute inset-x-4 bottom-0 h-px bg-white/15 tab:inset-x-6 desk:left-[calc(25%+1.125rem)]" aria-hidden="true" />
    </Link>
  );
}

export function ServiceRows() {
  return <ul>{services.map((s, i) => <li key={s.slug}><Row s={s} n={i + 1} /></li>)}</ul>;
}
