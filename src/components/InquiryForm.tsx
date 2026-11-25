"use client";
import { useRef, useState } from "react";
import { animate } from "animejs";
import { services, site } from "@/lib/content";

const field = "w-full border-b border-ink/60 bg-transparent py-4 text-lead snug placeholder:text-ink/60 focus:border-ink focus-visible:outline-offset-4";

export function InquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [error, setError] = useState("");
  const btn = useRef<HTMLSpanElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams(location.search);
    const campaign = Object.fromEntries([...params].filter(([k]) => /^(utm_\w+|fbclid)$/.test(k)));
    setState("sending");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) animate(btn.current!, { scaleX: [0, 0.9], duration: 1600, ease: "outExpo" });
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(form), services: form.getAll("services"), campaign }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setState("sent");
    } catch (x) {
      setError(x instanceof Error && x.message ? x.message : "Your message did not go through.");
      setState("failed");
    }
  }

  if (state === "sent")
    return <p role="status" className="text-head tight">Thank you. A person will read this and write back.</p>;

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      <div className="grid gap-8 tab:grid-cols-2 tab:gap-6">
        <label className="block text-sm">Your name<input className={field} name="name" required autoComplete="name" maxLength={120} /></label>
        <label className="block text-sm">Email<input className={field} name="email" type="email" required autoComplete="email" maxLength={200} /></label>
      </div>
      <label className="block text-sm">Current website, if you have one<input className={field} name="website" autoComplete="url" maxLength={300} placeholder="yourcompany.com" /></label>
      <fieldset>
        <legend className="mb-4 text-sm">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <label key={s.slug} className="cursor-pointer border border-ink/60 px-4 py-2 text-base transition-colors has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink">
              <input type="checkbox" name="services" value={s.name} className="sr-only" />{s.name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm">What do people get wrong about you when they see your site?<textarea className={`${field} min-h-32 resize-y`} name="message" required maxLength={4000} /></label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Leave empty<input name="company_fax" tabIndex={-1} autoComplete="off" /></label>
      {state === "failed" && (
        <p role="alert" className="border-l-4 border-signal pl-4 text-base">{error} You can write to <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> instead.</p>
      )}
      <button disabled={state === "sending"} className="relative isolate h-16 overflow-hidden bg-ink px-6 text-left text-lead snug text-white transition-colors hover:bg-coal disabled:cursor-wait">
        <span ref={btn} className="absolute inset-0 -z-10 origin-left scale-x-0 bg-signal" style={state === "sending" ? undefined : { transform: "scaleX(0)" }} aria-hidden="true" />
        {state === "sending" ? "Sending" : "Send inquiry"}
      </button>
    </form>
  );
}
