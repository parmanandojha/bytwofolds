import { about, aboutMore as m } from "@/lib/content";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/schema";
import { PageHead } from "@/components/PageHead";
import { DetailRows } from "@/components/DetailRows";
import { Scene } from "@/components/Scene";
import { Cta, Tag } from "@/components/ui";

export const metadata = pageMeta("About Our Delhi Website Studio", "ByTwoFolds is a Delhi-based website studio. Why we exist: the quiet moment when a stranger opens your website and decides whether to trust you.", "/about");

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbs([["About", "/about"]])} />
      <PageHead tag="About ByTwoFolds, a website studio in Delhi" title={about.title}><p>{about.intro}</p></PageHead>
      <Scene name="sea" label="A small folded paper boat alone on a dark sea" className="relative h-[70svh] overflow-hidden bg-[#0c0d0e] desk:h-[90svh]" />
      <section className="bg-slate section-y text-ink" aria-label="Our reason">
        <div className="site-grid gap-y-10">
          {about.body.map((t) => <p key={t} data-split className="col-span-full text-title tight tab:col-span-7 tab:col-start-2 desk:col-span-8 desk:col-start-4">{t}</p>)}
        </div>
      </section>
      <section className="bg-ink section-t" aria-labelledby="moment">
        <div className="site-grid"><h2 id="moment" data-split className="col-span-full max-w-[16ch] text-head tight desk:col-span-9">{m.moment.title}</h2></div>
        <DetailRows items={m.moment.items} />
      </section>
      <section className="bg-ink section-y" aria-labelledby="name">
        <div className="site-grid gap-y-8">
          <h2 id="name" data-split className="col-span-full text-head tight desk:col-span-5">{m.nameTitle}</h2>
          <div className="col-span-full flex flex-col gap-8 tab:col-span-7 tab:col-start-2 desk:col-span-6 desk:col-start-7">
            {m.name.map((t) => <p key={t} data-fade className="text-title tight">{t}</p>)}
          </div>
        </div>
      </section>
      <section className="bg-slate section-y text-ink" aria-label="Who we work with">
        <div className="site-grid gap-y-14">
          {[[m.fitTitle, m.fit] as const, [m.notFitTitle, m.notFit] as const].map(([t, list], i) => (
            <div key={t} className={`col-span-full tab:col-span-4 desk:col-span-5 ${i ? "desk:col-start-8" : ""}`}>
              <h2 data-split className="text-title tight">{t}</h2>
              <ul className="mt-8">
                {list.map((x) => <li key={x} className="border-t border-ink/25 py-4 text-lead snug">{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-ink section-t" aria-labelledby="how-ai">
        <div className="site-grid"><h2 id="how-ai" className="col-span-full"><Tag>{m.aiTitle}</Tag></h2></div>
        <DetailRows items={m.ai} />
      </section>
      <section className="bg-ink section-y" aria-labelledby="bel">
        <div className="site-grid"><h2 id="bel" className="col-span-full"><Tag>What we hold to</Tag></h2></div>
        <DetailRows items={about.beliefs} />
        <div className="site-grid pt-10 desk:pt-16"><Cta href="/contact" className="col-span-full desk:col-start-4">Start a project</Cta></div>
      </section>
    </>
  );
}
