"use client";
import { useId, useState } from "react";

/** Grid of questions. Answers stay in the HTML for search and answer engines. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="site-grid gap-x-0!">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className={`relative col-span-full -mt-px flex flex-col border border-white/20 transition-colors duration-500 tab:col-span-4 desk:min-h-72 ${on ? "bg-slate text-ink" : "bg-ink text-white hover:bg-coal"} -mr-px`}>
            <h3>
              <button className="flex w-full items-start justify-between gap-6 p-6 text-left" aria-expanded={on} aria-controls={`${id}${i}`} onClick={() => setOpen(on ? null : i)}>
                <span className="max-w-[24ch] text-lead snug">{f.q}</span>
                <svg viewBox="0 0 14 14" className={`mt-2 size-3.5 shrink-0 transition-transform duration-500 ${on ? "rotate-45" : ""}`} stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M7 1v12M1 7h12" /></svg>
              </button>
            </h3>
            <div id={`${id}${i}`} className={`grid transition-[grid-template-rows,visibility] duration-500 ${on ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}>
              <p className="min-h-0 overflow-hidden px-6 text-[0.9375rem] leading-relaxed"><span className="block pb-6">{f.a}</span></p>
            </div>
            <button className="grow" tabIndex={-1} aria-hidden="true" onClick={() => setOpen(on ? null : i)} />
          </div>
        );
      })}
    </div>
  );
}
