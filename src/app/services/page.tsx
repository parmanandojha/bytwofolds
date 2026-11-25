import Link from "next/link";
import { services } from "@/lib/content";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/schema";
import { ServiceIcon } from "@/components/ServiceIcon";
import { StartPicker } from "@/components/StartPicker";
import { Arrow, Cta, Tag } from "@/components/ui";

export const metadata = pageMeta("Website Design, Development and Meta Ads Services", "Five services under one roof: website design, website development, AI reading scripts, Meta ads and website care.", "/services");

const tones = ["bg-coal text-white", "bg-slate text-ink", "bg-mist text-ink", "bg-signal text-ink", "bg-white text-ink"];

export default function Services() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Services", "/services"]])} />
      <section className="flex min-h-[80svh] flex-col bg-ink" aria-labelledby="services-h">
        <div className="site-grid pt-36 desk:pt-48">
          <h1 id="services-h" data-split data-hero="0" className="col-span-full max-w-[14ch] text-hero tight">Everything between the click and the yes.</h1>
        </div>
        <div className="site-grid mt-auto items-end gap-y-12 pt-24 pb-16">
          <ol className="col-span-full flex flex-wrap gap-2 desk:col-span-6">
            {services.map((s, i) => (
              <li key={s.slug} data-fade={0.4 + i * 0.07} data-hero="0.4">
                <a href={`#${s.slug}`} className="block border border-white/30 px-4 py-2 text-sm transition-colors hover:bg-white hover:text-ink">{s.name}</a>
              </li>
            ))}
          </ol>
          <p data-fade data-hero="0.5" className="col-span-full text-lead snug tab:col-span-6 desk:col-span-5 desk:col-start-8">
            Five services, made to work together. Take one, or hand us the whole journey from the first ad someone sees to the page that earns their trust.
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-2">
        {services.map((s, i) => (
          <div key={s.slug} id={s.slug} data-sheet style={{ scrollMarginTop: 8 }} className="[@media(min-width:64rem)_and_(min-height:44rem)]:sticky [@media(min-width:64rem)_and_(min-height:44rem)]:top-2">
            <article className={`relative isolate flex min-h-[36rem] flex-col overflow-hidden desk:min-h-[calc(100svh-1rem)] ${tones[i]}`}>
              <ServiceIcon icon={s.icon} className="pointer-events-none absolute top-8 right-4 -z-10 w-32 opacity-70 tab:right-6 tab:w-44 desk:top-[6%] desk:right-[2%] desk:w-[34%] desk:opacity-60" />
              <div className="site-grid pt-6 desk:pt-24">
                <p className="label col-span-full">/ 0{i + 1}</p>
              </div>
              <div className="site-grid mt-auto gap-y-8 pt-40 pb-8 desk:pt-24 desk:pb-12">
                <div className="col-span-full desk:col-span-7">
                  <h2 className="text-hero tight">{s.name}</h2>
                  <p className="mt-4 text-title tight">{s.headline}</p>
                </div>
                <span className="col-span-full h-px bg-current opacity-30" aria-hidden="true" />
                <p className="col-span-full leading-snug tab:col-span-5 desk:col-span-4">{s.answer}</p>
                <ul className="col-span-full tab:col-span-3 desk:col-span-3 desk:col-start-6">
                  {s.includes.map((x) => <li key={x.title} className="flex gap-2 pb-2"><span aria-hidden="true">+</span>{x.title}</li>)}
                </ul>
                <Link href={`/services/${s.slug}`} className="group col-span-full flex h-18 items-end justify-between self-end bg-ink p-4 text-white transition-colors hover:bg-white hover:text-ink tab:col-span-4 desk:col-span-3 desk:col-start-9">
                  <span className="label">See {s.name}</span><Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      <section className="relative bg-slate section-y text-ink" aria-labelledby="start">
        <div className="site-grid gap-y-8 head-pad">
          <Tag className="col-span-full">Where to start</Tag>
          <h2 id="start" data-split className="col-span-full max-w-[16ch] text-head tight desk:col-span-9">Begin with what hurts.</h2>
        </div>
        <StartPicker />
      </section>

      <section className="bg-ink section-y" aria-label="Start">
        <div className="site-grid items-end gap-y-8">
          <p data-scrub className="col-span-full text-head tight desk:col-span-9">You do not need to know which one. Tell us what people get wrong about you, and we will tell you where to begin.</p>
          <div className="col-span-full desk:col-span-3 desk:justify-self-end"><Cta href="/contact" tall>Start a project</Cta></div>
        </div>
      </section>
    </>
  );
}
