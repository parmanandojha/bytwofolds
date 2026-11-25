import { processPage as p, site } from "@/lib/content";
import { JsonLd, breadcrumbs, faqSchema, pageMeta } from "@/lib/schema";
import { Faq } from "@/components/Faq";
import { StageRail } from "@/components/StageRail";
import { Cta } from "@/components/ui";

export const metadata = pageMeta("Our Website Process", "How ByTwoFolds designs, builds, launches and grows a website: eight stages, what you get from each and what we need from you.", "/process");

const id = (f: number, name: string) => `${f}-${name.toLowerCase().replace(/\s+/g, "-")}`.replace(/^/, "stage-");

export default function ProcessPage() {
  const total = p.folds.reduce((n, f) => n + f.stages.length, 0);
  return (
    <>
      <JsonLd data={[breadcrumbs([["Process", "/process"]]), faqSchema(p.faq)]} />

      <section className="flex min-h-[calc(100svh-1rem)] flex-col bg-ink" aria-labelledby="p-h">
        <div className="site-grid gap-y-8 pt-32 desk:pt-40">
          <h1 id="p-h" data-split data-hero="0" className="col-span-full max-w-[13ch] text-hero tight desk:col-span-8">{p.title}</h1>
          <p data-fade data-hero="0.4" className="col-span-full leading-relaxed text-ash tab:col-span-5 desk:col-span-4">{p.intro}</p>
        </div>
        <div className="mt-auto grid gap-2 pt-16 tab:grid-cols-[5fr_3fr]">
          {p.folds.map((f, i) => (
            <a key={f.name} href={`#fold-${i}`} data-fade data-hero={0.5 + i * 0.12} className={`group relative isolate flex min-h-64 flex-col justify-between gap-8 overflow-hidden p-6 desk:min-h-80 ${i ? "bg-mist text-ink" : "bg-slate text-ink"}`}>
              <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" aria-hidden="true" />
              <span className="flex items-start justify-between gap-6">
                <span className="text-title tight">{f.name}</span>
                <span className="label pt-2">{f.stages.length} stages</span>
              </span>
              <span className="flex flex-wrap gap-x-6 gap-y-2 text-lead snug">
                {f.stages.map((s, n) => <span key={s.name}><span className="mr-2 text-xs align-super">{(i ? p.folds[0].stages.length : 0) + n + 1}</span>{s.name}</span>)}
              </span>
            </a>
          ))}
        </div>
      </section>

      {p.folds.map((fold, f) => {
        const light = f === 0;
        const start = f ? p.folds[0].stages.length : 0;
        const ids = fold.stages.map((s) => id(f, s.name));
        return (
          <section key={fold.name} id={`fold-${f}`} className={`section-y ${light ? "bg-slate text-ink" : "bg-mist text-ink"}`} aria-labelledby={`fold-h-${f}`}>
            <div className="site-grid items-end gap-y-6 head-pad">
              <h2 id={`fold-h-${f}`} data-split className="col-span-full text-head tight desk:col-span-7">{fold.name}</h2>
              <p data-fade className="col-span-full max-w-[36ch] text-lead snug desk:col-span-5 desk:col-start-8">{fold.summary}</p>
            </div>
            <div className="site-grid">
              <div className="hidden desk:col-span-6 desk:block">
                <StageRail names={fold.stages.map((s) => s.name)} start={start} ids={ids} light />
              </div>
              <ol className="col-span-full flex flex-col gap-2 desk:col-span-5 desk:col-start-8">
                {fold.stages.map((s, n) => (
                  <li key={s.name} id={ids[n]} className="flex flex-col bg-white desk:min-h-[72svh]">
                    <div className="flex items-baseline justify-between gap-6 p-6">
                      <h3 className="text-head tight">{s.name}</h3>
                      <span className="label shrink-0">{start + n + 1} of {total}</span>
                    </div>
                    <p className="max-w-[40ch] px-6 pb-12 text-lead snug">{s.body}</p>
                    <dl className="mt-auto grid tab:grid-cols-2">
                      <div className="flex min-h-40 flex-col justify-between gap-6 bg-ink p-6 text-white"><dt className="label flex items-center gap-2"><span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />You get</dt><dd className="leading-snug">{s.get}</dd></div>
                      <div className="flex min-h-40 flex-col justify-between gap-6 border-t border-ink/15 p-6"><dt className="label">We need</dt><dd className="leading-snug">{s.need}</dd></div>
                    </dl>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}

      <section className="bg-ink section-y" aria-labelledby="promises">
        <div className="site-grid head-pad"><h2 id="promises" data-split className="col-span-full max-w-[14ch] text-head tight">What you can hold us to</h2></div>
        <ul className="grid px-4 tab:grid-cols-3 tab:px-6">
          {p.promises.map((x, n) => (
            <li key={x.title} data-fade={n * 0.1} className="-mt-px -mr-px flex min-h-64 flex-col justify-between gap-8 border border-white/20 p-6 transition-colors duration-500 hover:bg-signal hover:text-ink desk:min-h-96">
              <h3 className="max-w-[12ch] text-title tight">{x.title}</h3>
              <p className="leading-snug">{x.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink section-b" aria-labelledby="pq">
        <div className="site-grid head-pad items-end gap-y-8">
          <h2 id="pq" data-split className="col-span-full max-w-[14ch] text-head tight desk:col-span-9">Before you work with {site.name}</h2>
          <div className="col-span-full desk:col-span-3 desk:justify-self-end"><Cta href="/contact">Start a project</Cta></div>
        </div>
        <Faq items={p.faq} />
      </section>
    </>
  );
}
