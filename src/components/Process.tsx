"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { flow } from "@/lib/content";
import { Cta, Tag } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Process() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ wide: "(min-width: 64rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)" }, (c) => {
      const wide = c.conditions!.wide;
      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-flow]", start: "top 82%", end: wide ? "top 30%" : "bottom 60%", scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>("[data-flow] > li").forEach((el, i) => {
        if (el.dataset.node) tl.from(el.firstElementChild, { scale: 0, rotate: -90, duration: 1, ease: "back.out(1.4)" }, i * 0.6);
        else tl.from(el.children, { autoAlpha: 0, x: wide ? -30 : 0, y: wide ? 0 : 20, duration: 1 }, i * 0.6);
      });
    });
  }, { scope: root });

  const [a, b, c] = flow.nodes;
  const node = (name: string, look: string) => (
    <li data-node="1" className="col-span-full flex tab:col-span-2">
      <span className={`label grid size-32 place-items-center rounded-full text-center desk:size-full desk:max-w-40 desk:aspect-square ${look}`}>{name}</span>
    </li>
  );
  const step = (i: number) => (
    <li className="col-span-full max-w-md self-center tab:col-span-6 desk:col-span-3">
      <h3 className="text-lead snug">{flow.steps[i].name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ash">{flow.steps[i].body}</p>
    </li>
  );
  return (
    <section id="process" ref={root} className="bg-ink section-y" aria-labelledby="process-h">
      <div className="site-grid gap-y-6">
        <Tag className="col-span-full">{flow.label}</Tag>
        <h2 id="process-h" data-split className="col-span-full max-w-[12ch] text-head tight desk:col-span-8">{flow.title}</h2>
      </div>
      <ol data-flow className="site-grid head-gap gap-y-10">
        {node(a, "bg-signal text-ink")}
        {step(0)}
        {node(b, "border border-white/25 bg-coal")}
        {step(1)}
        {node(c, "bg-white text-ink")}
      </ol>
      <div className="site-grid mt-16 desk:mt-20">
        <Cta href="/process" className="col-span-full">See every stage</Cta>
      </div>
    </section>
  );
}
