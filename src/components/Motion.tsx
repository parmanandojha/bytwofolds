"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { onReady } from "@/lib/ready";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * GSAP scroll motion, driven by attributes so sections stay server components:
 *   data-split   text rises line by line      data-fade   block fades up
 *   data-rule    hairline draws across        data-count  number counts up
 *   data-drift   background mark drifts with scroll
 *   data-scrub   words light up with scroll     data-fill   line fills with scroll
 *   data-sheet   stacked sheet recedes as the next arrives
 */
export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.11, anchors: true });
    lenis.current = l;
    (window as unknown as { lenis?: Lenis }).lenis = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null; delete (window as unknown as { lenis?: Lenis }).lenis; };
  }, []);

  useEffect(() => {
    if (!location.hash) lenis.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  useGSAP(
    (_, contextSafe) => {
      const el = root.current!;
      const all = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits: SplitText[] = [];
        let alive = true;
        const heroOnes: gsap.core.Animation[] = [];
        let ready = false;

        all("[data-split]").forEach((t) => {
          const hero = t.hasAttribute("data-hero");
          splits.push(
            SplitText.create(t, {
              type: "lines", mask: "lines", linesClass: "sl", aria: "none", autoSplit: true,
              onSplit: (s) => {
                const a = gsap.from(s.lines, {
                  yPercent: 115, duration: 1.15, ease: "power4.out", stagger: 0.09,
                  delay: hero ? Number(t.dataset.hero || 0) : 0,
                  paused: hero && !ready,
                  scrollTrigger: hero ? undefined : { trigger: t, start: "top 88%", once: true },
                });
                if (hero && !ready) heroOnes.push(a);
                return a;
              },
            }),
          );
        });

        all("[data-fade]").forEach((t) => {
          const hero = t.hasAttribute("data-hero");
          const a = gsap.from(t, {
            autoAlpha: 0, y: 24, duration: 1, ease: "power3.out", delay: Number(t.dataset.fade || t.dataset.hero || 0),
            paused: hero,
            scrollTrigger: hero ? undefined : { trigger: t, start: "top 92%", once: true },
          });
          if (hero) heroOnes.push(a);
        });

        all("[data-rule]").forEach((t) =>
          gsap.from(t, { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 95%", once: true } }),
        );

        all("[data-count]").forEach((t) => {
          const d = Number(t.dataset.decimals || 0);
          const o = { v: 0 };
          gsap.to(o, {
            v: Number(t.dataset.count), duration: 1.8, ease: "expo.out",
            scrollTrigger: { trigger: t, start: "top 90%", once: true },
            onUpdate: () => { t.textContent = o.v.toFixed(d); },
          });
        });

        all("[data-drift]").forEach((t) =>
          gsap.fromTo(t, { yPercent: -18 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: t.parentElement, start: "top bottom", end: "bottom bottom", scrub: true } }),
        );

        all("[data-scrub]").forEach((t) => {
          const sp = SplitText.create(t, { type: "words", aria: "none" });
          splits.push(sp);
          gsap.from(sp.words, { opacity: 0.18, stagger: 0.1, ease: "none", scrollTrigger: { trigger: t, start: "top 80%", end: "bottom 55%", scrub: true } });
        });

        all("[data-fill]").forEach((t) =>
          gsap.from(t, { scaleX: 0, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: t.parentElement, start: "top 75%", end: "top 25%", scrub: true } }),
        );

        all("[data-sheet]").forEach((t, i, list) => {
          if (i === list.length - 1 || !matchMedia("(min-width: 64rem) and (min-height: 44rem)").matches) return;
          gsap.to(t.firstElementChild, { scale: 0.94, ease: "none", transformOrigin: "50% 0%", scrollTrigger: { trigger: list[i + 1], start: "top bottom", end: "top 12%", scrub: true } });
        });

        all("[data-parallax]").forEach((t) =>
          gsap.fromTo(t, { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: t, start: "top bottom", end: "bottom bottom", scrub: true } }),
        );

        const off = onReady(() => { if (alive) { ready = true; heroOnes.forEach((a) => a.play()); } });
        return () => { alive = false; off(); splits.forEach((s) => s.revert()); };
      });
      void contextSafe;
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true },
  );

  return <div ref={root}>{children}</div>;
}
