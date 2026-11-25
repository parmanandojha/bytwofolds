import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceDetails, services, site } from "@/lib/content";
import { JsonLd, breadcrumbs, faqSchema, organization, pageMeta } from "@/lib/schema";
import { Faq } from "@/components/Faq";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Arrow, Cta, Tag } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => services.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: P) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? pageMeta(`${s.name} in Delhi`, s.answer.length > 170 ? `${s.answer.split(". ")[0]}.` : s.answer, `/services/${slug}`) : {};
}

export default async function ServicePage({ params }: P) {
  const { slug } = await params;
  const i = services.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const s = services[i], d = serviceDetails[slug];
  const prev = services[(i + services.length - 1) % services.length], next = services[(i + 1) % services.length];
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Service", name: s.name, serviceType: s.name, description: s.answer, url: `${site.url}/services/${s.slug}`, provider: { "@id": organization["@id"] } },
        faqSchema(s.faq),
        breadcrumbs([["Services", "/services"], [s.name, `/services/${s.slug}`]]),
      ]} />

      <section className="relative isolate mt-14 flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-slate text-ink" aria-labelledby="s-h">
        <ServiceIcon icon={s.icon} stroke={0.2} className="pointer-events-none absolute -right-[30%] top-[12%] -z-10 w-[120%] opacity-70 tab:-right-[10%] tab:w-[80%] desk:-right-[4%] desk:top-1/2 desk:w-[58%] desk:-translate-y-1/2" />
        <div className="site-grid pt-6">
          <nav aria-label="Breadcrumb" className="col-span-3 tab:col-span-6 desk:col-span-9">
            <Link href="/services" className="label inline-flex items-center gap-2 py-2 underline underline-offset-4"><Arrow className="rotate-180" />All services</Link>
          </nav>
          <p className="label col-span-1 py-2 text-right tab:col-span-2 desk:col-span-3">0{i + 1} / 0{services.length}</p>
        </div>
        <div className="site-grid mt-auto gap-y-8 pt-40 pb-8 desk:pb-12">
          <div className="col-span-full desk:col-span-7">
            <p data-fade data-hero="0.1" className="label mb-4 flex items-center gap-2"><span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />{s.name} for businesses in India and abroad</p>
            <h1 id="s-h" data-split data-hero="0" className="max-w-[12ch] text-hero tight">{s.headline}</h1>
          </div>
          <div data-fade data-hero="0.5" className="col-span-full flex flex-col justify-between gap-8 self-end bg-ink p-6 text-white tab:col-span-6 desk:col-span-4 desk:col-start-9">
            <p className="leading-snug">{s.answer}</p>
            <Cta href="/contact">Start a project</Cta>
          </div>
        </div>
      </section>

      <section className="bg-ink section-y" aria-label="Why it matters">
        <div className="site-grid">
          <p data-scrub className="col-span-full text-hero tight desk:col-span-11">{s.story}</p>
        </div>
      </section>

      <section className="bg-ink section-b" aria-labelledby="signs">
        <div className="site-grid gap-x-0! gap-y-8">
          <h2 id="signs" className="col-span-full max-w-[12ch] text-title tight desk:col-span-4">You may need this if</h2>
          <ul className="col-span-full grid tab:grid-cols-2 desk:col-span-8">
            {d.signs.map((x, n) => (
              <li key={x} data-fade={n * 0.08} className="-mt-px -mr-px flex min-h-40 flex-col justify-between gap-8 border border-white/20 p-6 transition-colors duration-500 hover:bg-slate hover:text-ink desk:min-h-56">
                <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
                <span className="text-lead snug">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist section-y text-ink" aria-labelledby="inc">
        <div className="site-grid head-pad"><h2 id="inc" data-split className="col-span-full text-head tight">What is included</h2></div>
        <ol className="grid gap-2 px-4 tab:grid-cols-3 tab:px-6">
          {s.includes.map((x, n) => (
            <li key={x.title} data-fade={n * 0.1} className="group flex min-h-64 flex-col bg-white p-6 transition-colors duration-500 hover:bg-ink hover:text-white tab:min-h-96">
              <span className="text-figure tight">{n + 1}</span>
              <h3 className="mt-auto text-title tight">{x.title}</h3>
              <p className="mt-4 leading-snug">{x.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-ink section-y" aria-labelledby="how">
        <div className="site-grid head-pad"><h2 id="how" data-split className="col-span-full text-head tight">How we do it</h2></div>
        <div className="relative">
          <span className="absolute top-2 right-6 left-6 hidden h-px bg-white/20 desk:block" aria-hidden="true"><span data-fill className="block h-full bg-signal" /></span>
          <ol className="site-grid gap-y-0">
            {d.steps.map((x, n) => (
              <li key={x.title} className="relative col-span-full border-l border-white/20 pb-12 pl-8 last:pb-0 tab:col-span-8 desk:col-span-3 desk:border-0 desk:pb-0 desk:pl-0">
                <span className="absolute top-0 -left-2 grid size-4 place-items-center rounded-full bg-signal desk:relative desk:left-0" aria-hidden="true" />
                <p className="label text-ash desk:mt-8">Step {n + 1}</p>
                <h3 className="mt-2 text-title tight desk:mt-4">{x.title}</h3>
                <p data-fade={n * 0.08} className="mt-4 max-w-[38ch] leading-snug text-ash">{x.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid gap-2 desk:grid-cols-12" aria-label="What you receive and how AI gets to know you">
        <div className="bg-coal p-6 pt-16 desk:col-span-7 desk:p-12 desk:pt-24">
          <h2><Tag>What you receive</Tag></h2>
          <ul className="mt-8 grid tab:grid-cols-2 tab:gap-x-6">
            {d.receive.map((x) => (
              <li key={x} className="flex items-baseline justify-between gap-4 border-t border-white/20 py-6 text-lead snug">{x}<span className="text-signal" aria-hidden="true">+</span></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-16 bg-signal p-6 pt-16 text-ink desk:col-span-5 desk:p-12 desk:pt-24">
          <h2 className="label">How AI gets to know you</h2>
          <p className="text-title tight">{d.ai}</p>
        </div>
      </section>

      <section className="bg-ink section-y" aria-labelledby="sq">
        <div className="site-grid head-pad"><h2 id="sq" data-split className="col-span-full text-head tight">Asked before you</h2></div>
        <Faq items={s.faq} />
      </section>

      <nav className="grid gap-2 tab:grid-cols-2" aria-label="More services">
        {([["Previous", prev], ["Next", next]] as const).map(([label, x], n) => (
          <Link key={label} href={`/services/${x.slug}`} className={`group relative isolate flex min-h-64 flex-col justify-between overflow-hidden bg-coal p-6 transition-colors duration-500 hover:bg-slate hover:text-ink desk:min-h-96 desk:p-8 ${n ? "tab:items-end tab:text-right" : ""}`}>
            <ServiceIcon icon={x.icon} stroke={0.4} className={`pointer-events-none absolute -bottom-[20%] -z-10 w-1/2 opacity-30 ${n ? "left-[-8%]" : "right-[-8%]"}`} />
            <span className="label">{label}</span>
            <span className="text-head tight">{x.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
