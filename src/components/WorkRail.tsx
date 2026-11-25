"use client";
import { useEffect, useRef, useState } from "react";
import { projects, work } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
import { Arrow, Tag } from "./ui";

export function WorkRail() {
  const rail = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  useEffect(() => {
    const r = rail.current!;
    const on = () => setEdge({ start: r.scrollLeft < 8, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 8 });
    on();
    r.addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { r.removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);
  const go = (d: number) =>
    rail.current!.scrollBy({ left: d * rail.current!.firstElementChild!.clientWidth + d * 8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  const btn = "grid size-12 place-items-center bg-ink text-white transition-colors hover:bg-signal disabled:bg-ink/25 disabled:hover:bg-ink/25";
  return (
    <section id="work" className="join-prev" aria-labelledby="work-h">
      <div className="bg-slate text-ink">
        <div className="site-grid items-end gap-y-6 section-t pb-16 desk:pb-20">
          <Tag className="col-span-full">{work.label}</Tag>
          <h2 id="work-h" data-split className="col-span-full max-w-[15ch] text-head tight tab:col-span-6 desk:col-span-8">{work.title}</h2>
          <div className="col-span-full flex gap-2 tab:col-span-2 tab:justify-end desk:col-span-4">
            <button className={btn} onClick={() => go(-1)} disabled={edge.start} aria-label="Previous project"><Arrow className="rotate-180" /></button>
            <button className={btn} onClick={() => go(1)} disabled={edge.end} aria-label="Next project"><Arrow /></button>
          </div>
        </div>
      </div>
      <ul ref={rail} className="no-bar mt-2 flex gap-2 snap-x snap-mandatory overflow-x-auto bg-ink" tabIndex={0} aria-label="Projects">
        {projects.map((p) => (
          <li key={p.slug} className="w-[78%] shrink-0 snap-start tab:w-[calc((100%-.5rem)/2)] desk:w-[calc((100%-1rem)/3)]"><ProjectCard p={p} /></li>
        ))}
      </ul>
    </section>
  );
}
