import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/content";
import { JsonLd, breadcrumbs, organization, pageMeta } from "@/lib/schema";
import { DetailRows } from "@/components/DetailRows";
import { PageHead } from "@/components/PageHead";
import { Arrow, Tag } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: P) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const m = pageMeta(`${p.name}: ${p.discipline}`, p.summary, `/work/${slug}`);
  return { ...m, openGraph: { ...m.openGraph, images: [{ url: `/work/${slug}-hero.webp`, width: 2160, height: 1350, alt: p.alt.hero }] } };
}

export default async function ProjectPage({ params }: P) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i], next = projects[(i + 1) % projects.length];
  const img = (n: string) => `/work/${p.slug}-${n}.webp`;
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "CreativeWork", name: `${p.name} website`, description: p.summary, url: `${site.url}/work/${p.slug}`, sameAs: p.url, image: site.url + img("hero"), creator: { "@id": organization["@id"] } },
        breadcrumbs([["Work", "/work"], [p.name, `/work/${p.slug}`]]),
      ]} />
      <PageHead tag={`${p.name}: ${p.sector.toLowerCase()} website design, ${p.place}`} title={p.headline}>
        <p>{p.summary}</p>
        <a href={p.url} target="_blank" rel="noopener" className="group mt-6 inline-flex items-center gap-4 py-2 underline underline-offset-4">
          Visit the website<span className="sr-only"> (opens in a new tab)</span>
          <Arrow className="-rotate-45 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </PageHead>
      <div className="overflow-hidden" style={{ background: p.color }}>
        <Image data-parallax src={img("hero")} alt={`${p.name} website: ${p.alt.hero}`} width={2160} height={1350} priority sizes="100vw" className="block h-auto w-full" />
      </div>
      <section className="bg-ink pt-4 pb-8 desk:pb-16" aria-label="Project facts">
        <dl className="site-grid gap-y-8">
          {[["Sector", p.sector], ["Place", p.place], ["Our part", p.discipline]].map(([k, v]) => (
            <div key={k} className="col-span-2 tab:col-span-2 desk:col-span-3"><dt className="label mb-2 text-ash">{k}</dt><dd>{v}</dd></div>
          ))}
          <div className="col-span-full tab:col-span-2 desk:col-span-3">
            <dt className="label mb-2 text-ash">Made up of</dt>
            <dd><ul>{p.built.map((x) => <li key={x} className="pb-2">{x}</li>)}</ul></dd>
          </div>
        </dl>
      </section>
      <section className="bg-ink section-b" aria-labelledby="story">
        <div className="site-grid"><h2 id="story" className="col-span-full"><Tag>The thinking</Tag></h2></div>
        <DetailRows items={p.story} />
      </section>
      <div className="grid gap-2 tab:grid-cols-3">
        <div className="grid place-items-center px-8 py-16 tab:row-span-2" style={{ background: p.color }}>
          <Image data-fade src={img("phone")} alt={`${p.name} website on a phone`} width={780} height={1688} sizes="(min-width: 40rem) 33vw, 80vw" className="h-auto w-full max-w-80 rounded-[6%/3%] shadow-2xl shadow-black/50" />
        </div>
        {(["a", "b"] as const).map((n) => (
          <div key={n} className="overflow-hidden tab:col-span-2">
            <Image src={img(n)} alt={`${p.name} website: ${p.alt[n]}`} width={1800} height={1125} sizes="(min-width: 40rem) 66vw, 100vw" className="block h-auto w-full" />
          </div>
        ))}
      </div>
      <section className="bg-ink section-y" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="site-grid group items-baseline gap-y-2">
          <span className="label col-span-full text-ash tab:col-span-2 desk:col-span-3">Next project</span>
          <span className="col-span-full text-head tight underline decoration-1 underline-offset-8 transition-transform duration-500 group-hover:translate-x-2 tab:col-span-6 desk:col-span-9">{next.name}</span>
        </Link>
      </section>
    </>
  );
}
