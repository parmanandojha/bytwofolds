"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { nav, site } from "@/lib/content";
import { Mark } from "./Logo";
import { Cta } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = scrollY;
    const on = () => {
      setSolid(scrollY > innerHeight * 0.6);
      setHidden(scrollY > last && scrollY > 400);
      last = scrollY;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    main?.setAttribute("inert", "");
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    const wide = matchMedia("(min-width: 64rem)");
    const close = () => setOpen(false);
    addEventListener("keydown", esc);
    wide.addEventListener("change", close);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      animate(menu.current!.querySelectorAll("[data-item]"), { y: [40, 0], opacity: [0, 1], duration: 800, ease: "outExpo", delay: stagger(60, { start: 120 }) });
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      removeEventListener("keydown", esc);
      wide.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-2 text-white transition-[transform,background-color] duration-500 ${solid && !open ? "bg-ink" : ""} ${hidden && !open ? "-translate-y-full focus-within:translate-y-0" : ""}`}
      >
        <div className="site-grid h-16 items-center">
          <Link href="/" className="col-span-2 flex items-center gap-2 tab:col-span-3" aria-label={`${site.name} home`}>
            <Mark className="size-6" />
            <span className="snug text-lg font-medium">{site.name}</span>
          </Link>
          <nav aria-label="Main" className="hidden desk:col-span-6 desk:block">
            <ul className="flex gap-8">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="group label relative block py-4" aria-current={pathname === n.href ? "page" : undefined}>
                    {n.label}
                    <span className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-400 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 flex items-center justify-end gap-4 tab:col-span-5 desk:col-span-3">
            <Cta href="/contact" className="hidden tab:flex">Start a project</Cta>
            <button ref={toggle} className="label -mr-2 p-4 desk:hidden" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <div id="menu" ref={menu} inert={!open} className={`fixed inset-0 z-40 bg-slate pt-24 text-ink transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] desk:hidden ${open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}>
        <div className="absolute inset-x-0 top-0 h-16 bg-ink" aria-hidden="true" />
        <nav aria-label="Mobile" className="site-grid mx-2">
          <ul className="col-span-full">
            {[...nav, { label: "Start a project", href: "/contact" }].map((n) => (
              <li key={n.href} data-item className="border-b border-ink/20">
                <Link href={n.href} onClick={() => setOpen(false)} className="block py-4 text-head tight">{n.label}</Link>
              </li>
            ))}
          </ul>
          <a data-item href={`mailto:${site.email}`} className="col-span-full mt-8 text-lead snug">{site.email}</a>
        </nav>
      </div>
    </>
  );
}
