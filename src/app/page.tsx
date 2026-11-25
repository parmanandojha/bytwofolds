import { costs, faqs, figures, hero, position, sea, site } from "@/lib/content";
import { JsonLd, faqSchema, homePage, pageMeta } from "@/lib/schema";
import { Cta, Tag } from "@/components/ui";
import { Scene } from "@/components/Scene";
import { ServiceRows } from "@/components/ServiceRows";
import { WorkRail } from "@/components/WorkRail";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";

export const metadata = { ...pageMeta(site.title, site.description, "/"), title: { absolute: site.title } };

export default function Home() {
  return (
    <>
      <JsonLd data={[faqSchema(faqs), homePage]} />

      <section className="relative isolate flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden bg-[#0b0c0d]">
        <Scene eager name="fold" label="A folded metal sheet with small red lights, slowly breathing" className="absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(11_12_13/.9)_22%,transparent_52%,rgb(11_12_13/.9)_92%)] desk:bg-[linear-gradient(to_bottom,transparent_45%,rgb(11_12_13/.88)_82%),linear-gradient(100deg,rgb(11_12_13/.8),transparent_50%)]" aria-hidden="true" />
        <div className="site-grid pt-24 desk:pt-28">
          <h1 data-split data-hero="0" className="col-span-full max-w-[11.5ch] text-hero tight tab:col-span-7 desk:col-span-9">{hero.title}</h1>
          <p data-fade data-hero="0.35" className="col-span-full mt-6 max-w-[34ch] text-lead snug text-white/85">{site.short}</p>
        </div>
        <div className="site-grid mt-auto items-end gap-y-8 pt-64 pb-8 desk:pt-16">
          <div className="order-1 col-span-full tab:col-span-6 desk:order-2 desk:col-span-5 desk:col-start-7">
            <p data-fade data-hero="0.45" className="max-w-[38ch] text-lead snug [text-wrap:pretty]">
              <span className="inline-block w-12 desk:w-20" aria-hidden="true" />
              {hero.body}
            </p>
            <div data-fade data-hero="0.6" className="mt-8"><Cta href="/contact" tall>{hero.cta}</Cta></div>
          </div>
        </div>
      </section>

      <section className="bg-ink section-t" aria-labelledby="position-h">
        <div className="site-grid gap-y-6">
          <Tag as="h2" className="col-span-full">{position.label}</Tag>
          <h3 id="position-h" data-split className="col-span-full max-w-[20ch] text-head tight text-balance desk:col-span-9">{position.title}</h3>
          <p data-fade className="col-span-full text-base leading-relaxed text-ash tab:col-span-5 tab:col-start-4 desk:col-span-4 desk:col-start-9">{position.body}</p>
        </div>
        <dl className="site-grid head-gap gap-y-16">
          {figures.map((f, i) => (
            <div key={f.label} className={`col-span-2 flex flex-col tab:col-span-4 desk:col-span-3 ${i % 2 === 0 ? "desk:col-start-7" : ""}`}>
              <span data-rule className="mb-4 h-px bg-white/20" aria-hidden="true" />
              <dt className="order-3 mt-4 max-w-[26ch] text-sm leading-snug">{f.label}</dt>
              <dd className="order-2 flex items-start gap-2 text-figure tight">
                <span className="tabular-nums"><span data-count={f.value} data-decimals={f.decimals}>{f.value}</span>{f.suffix}</span>
                <span className="mt-2 text-xs tracking-normal text-ash">[{f.unit}]</span>
              </dd>
              <dd className="order-4 mt-2 text-xs text-ash">{f.source}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-ink section-y" aria-labelledby="services-h">
        <div className="site-grid head-pad">
          <Tag className="col-span-2 tab:col-span-2 desk:col-span-3">Services</Tag>
          <h2 id="services-h" className="label col-span-2 tab:col-span-6">Website design, development, AI scripts, Meta ads and care</h2>
        </div>
        <ServiceRows />
        <div className="site-grid pt-12 desk:pt-16">
          <Cta href="/services" className="col-span-full tab:col-start-3 desk:col-span-3 desk:col-start-4">See all services</Cta>
        </div>
      </section>

      <section className="relative isolate flex min-h-[135svh] flex-col overflow-hidden bg-[#0c0d0e] desk:min-h-[150svh]" aria-labelledby="sea-h">
        <Scene name="sea" label="A small folded paper boat with two red lights, alone on a dark sea" className="absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(16_17_18/.9),transparent_35%,transparent_65%,rgb(16_17_18/.85))]" aria-hidden="true" />
        <div className="site-grid gap-y-8 pt-12 desk:pt-16">
          <Tag as="h2" className="col-span-full desk:col-span-3"><span id="sea-h">{sea.label}</span></Tag>
          <p data-split className="col-span-full text-title tight tab:col-span-7 desk:col-span-6 desk:col-start-7">{sea.body}</p>
        </div>
        <dl className="site-grid mt-auto items-end gap-y-8 pb-12 desk:pb-16">
          {sea.stats.map((s, i) => (
            <div key={s.value} className={`col-span-2 flex flex-col tab:col-span-4 ${i ? "desk:col-span-4 desk:col-start-7" : "desk:col-span-4"}`}>
              <dd className="flex flex-wrap items-start gap-x-2 text-figure tight">/{s.value}<span className="mt-2 text-xs tracking-normal text-white/80">[{s.unit}]</span></dd>
              <dt className="mt-2 max-w-[32ch] text-sm leading-snug text-white/85">{s.label}</dt>
            </div>
          ))}
          <p className="col-span-full text-xs leading-snug text-white/80 desk:col-span-2"><a href={sea.sourceUrl} target="_blank" rel="noopener" className="underline underline-offset-4">{sea.source}<span className="sr-only"> (opens in a new tab)</span></a></p>
        </dl>
      </section>

      <section className="bg-slate section-t text-ink" aria-labelledby="costs-h">
        <div className="site-grid"><h2 id="costs-h" className="col-span-full"><Tag>What an outdated website costs a business</Tag></h2></div>
        <ol className="head-gap">
          {costs.map((c, i) => (
            <li key={c.title} className="site-grid gap-y-4 py-8 desk:min-h-40 desk:py-10">
              <span data-rule className="col-span-full mb-4 h-px bg-ink/25" aria-hidden="true" />
              <span className="label col-span-full tab:col-span-1 desk:col-span-3">/ 0{i + 1}</span>
              <h3 data-split className="col-span-full text-title tight tab:col-span-3 desk:col-span-4 desk:col-start-5">{c.title}</h3>
              <p data-fade className="col-span-full max-w-[44ch] text-base leading-snug tab:col-span-4 desk:col-span-4 desk:col-start-9">{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <WorkRail />
      <Process />

      <section id="questions" className="bg-ink section-b" aria-labelledby="faq-h">
        <div className="site-grid head-pad"><h2 id="faq-h" className="col-span-full"><Tag>Questions about website design, AI search and Meta ads</Tag></h2></div>
        <Faq items={faqs} />
      </section>
    </>
  );
}
