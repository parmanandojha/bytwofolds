import Link from "next/link";
import { nav, services, site } from "@/lib/content";
import { Mark } from "./Logo";

export function Footer() {
  return (
    <footer className="relative isolate mx-2 mb-2 overflow-hidden bg-slate text-ink">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div data-drift className="absolute top-0 left-1/2 aspect-square w-[130vw] -translate-x-1/2 text-ink/10 tab:w-[78vw] desk:left-[46%] desk:w-[62vw]">
          <Mark className="size-full" />
        </div>
      </div>
      <div className="site-grid gap-y-12 pt-12 pb-40 desk:pt-16 desk:pb-72">
        <Link href="/" className="col-span-full flex items-center gap-2 self-start desk:col-span-3" aria-label={`${site.name} home`}>
          <Mark className="size-6" />
          <span className="snug text-lg font-medium">{site.name}</span>
        </Link>
        <div className="col-span-full desk:col-span-3 desk:col-start-4">
          <a href={`mailto:${site.email}`} className="snug text-lead underline-offset-4 hover:underline">{site.email}</a>
          <p className="snug mt-2 max-w-[34ch] text-base leading-snug">Delhi-based studio building websites for hospitality, interiors, education and professional-services businesses in India and abroad.</p>
        </div>
        <div className="col-span-2 tab:col-span-4 desk:col-span-2 desk:col-start-8">
          <p className="label mb-2">Services we offer</p>
          <ul>
          {services.map((s) => (
            <li key={s.slug} className="py-2 text-sm">{s.name}</li>
          ))}
        </ul>
        </div>
        <div className="col-span-2 tab:col-span-4 desk:col-span-2 desk:col-start-11">
          <p className="label mb-2">Explore</p>
          <ul>
          {[...nav, { label: "Contact", href: "/contact" }].map((n) => (
            <li key={n.href}><Link className="block py-2 text-sm underline-offset-4 hover:underline" href={n.href}>{n.label}</Link></li>
          ))}
        </ul>
        </div>
      </div>
      <div className="site-grid">
        <Link href="/contact" className="group col-span-full justify-self-end text-mega tight">
          <span className="relative block pb-[.1em]">
            Start a Project
            <span className="absolute inset-x-0 bottom-[.04em] h-[.035em] origin-right bg-current transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-0" aria-hidden="true" />
          </span>
        </Link>
      </div>
      <div className="site-grid items-center pt-6 pb-24 text-xs">
        <p className="col-span-2 tab:col-span-4 desk:col-span-3">© {new Date().getFullYear()} {site.name}</p>
        <Link href="/privacy" className="col-span-1 py-2 underline-offset-4 hover:underline desk:col-start-4">Privacy</Link>
        <a href="#main" className="col-span-1 justify-self-end py-2 underline-offset-4 hover:underline desk:col-start-12">Back to top</a>
      </div>
    </footer>
  );
}
