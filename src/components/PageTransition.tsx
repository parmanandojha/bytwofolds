"use client";
import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { markBusy, markReady } from "@/lib/ready";
import { projects, services } from "@/lib/content";
import { Mark } from "./Logo";

const names: Record<string, string> = {
  "/": "Home", "/services": "Services", "/work": "Work", "/process": "Process", "/about": "About", "/contact": "Start a project", "/privacy": "Privacy",
  ...Object.fromEntries(services.map((s) => [`/services/${s.slug}`, s.name])),
  ...Object.fromEntries(projects.map((p) => [`/work/${p.slug}`, p.name])),
};

/** The page grid folds up over the old page, names the next one, then folds away. */
export function PageTransition() {
  const root = useRef<HTMLDivElement>(null);
  const state = useRef<"idle" | "covering" | "covered">("idle");
  const tl = useRef<gsap.core.Timeline | null>(null);
  const failsafe = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  const uncover = useCallback(() => {
    const el = root.current;
    if (!el || state.current === "idle") return;
    clearTimeout(failsafe.current);
    state.current = "idle";
    tl.current?.kill();
    tl.current = gsap.timeline({ onComplete: () => { gsap.set(el, { visibility: "hidden" }); } })
      .to(el.querySelectorAll("[data-name]"), { yPercent: -130, duration: 0.45, ease: "power3.in" }, 0.1)
      .to(el.querySelectorAll("[data-mark]"), { autoAlpha: 0, duration: 0.3 }, 0.1)
      .set(el.querySelectorAll("[data-col]"), { transformOrigin: "50% 0%" })
      .call(markReady, undefined, 0.5)
      .to(el.querySelectorAll("[data-col]"), { scaleY: 0, duration: 0.75, ease: "expo.inOut", stagger: 0.03 }, 0.35);
  }, []);

  useEffect(() => {
    // New page is mounted: wait two frames for layout, then reveal it
    let b = 0;
    const a = requestAnimationFrame(() => { b = requestAnimationFrame(uncover); });
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, [pathname, uncover]);

  useEffect(() => {
    const el = root.current!;
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.origin !== location.origin) return;
      if (a.pathname === location.pathname || !(a.pathname in names)) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault(); // next/link sees this and leaves navigation to us
      if (state.current !== "idle") return;
      state.current = "covering";
      const href = a.pathname + a.search + a.hash;
      router.prefetch(href);
      markBusy();
      el.querySelector("[data-name]")!.textContent = names[a.pathname];
      tl.current?.kill();
      tl.current = gsap.timeline()
        .set(el, { visibility: "visible" })
        .set(el.querySelectorAll("[data-col]"), { transformOrigin: "50% 100%", scaleY: 0 })
        .set(el.querySelectorAll("[data-mark]"), { autoAlpha: 1 })
        .to(el.querySelectorAll("[data-col]"), { scaleY: 1, duration: 0.65, ease: "expo.inOut", stagger: 0.03 })
        .fromTo(el.querySelectorAll("[data-name]"), { y: 0, yPercent: 130 }, { yPercent: 0, duration: 0.55, ease: "power4.out" }, 0.4)
        .fromTo(el.querySelectorAll(".facet"), { scaleY: 0, svgOrigin: "16 16" }, { scaleY: 1, duration: 0.5, ease: "expo.out", stagger: 0.12 }, 0.4)
        .call(() => {
          state.current = "covered";
          router.push(href);
          failsafe.current = window.setTimeout(uncover, 5000);
        });
    };
    // Back and forward navigate immediately: never leave the cover up
    const pop = () => { if (state.current !== "idle") { state.current = "covered"; uncover(); } };
    document.addEventListener("click", click, true);
    addEventListener("popstate", pop);
    return () => { document.removeEventListener("click", click, true); removeEventListener("popstate", pop); clearTimeout(failsafe.current); tl.current?.kill(); };
  }, [router, uncover]);

  return (
    <div ref={root} className="invisible fixed inset-0 z-[70]" aria-hidden="true">
      <div className="absolute inset-0 grid grid-cols-4 tab:grid-cols-8 desk:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} data-col className={`bg-slate shadow-[1px_0_0_var(--color-slate)] ${i >= 8 ? "hidden desk:block" : i >= 4 ? "hidden tab:block" : ""}`} style={{ transform: "scaleY(0)" }} />
        ))}
      </div>
      <div className="absolute inset-x-2 inset-y-0 flex flex-col justify-between px-4 py-8 text-ink tab:px-6">
        <div data-mark className="invisible"><Mark animated className="size-12" /></div>
        <div className="overflow-hidden pb-2"><p data-name className="text-hero tight" /></div>
      </div>
    </div>
  );
}
