import { projects, work } from "@/lib/content";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/schema";
import { PageHead } from "@/components/PageHead";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata = pageMeta("Website Design Work", "Selected websites and campaigns designed, built and run by ByTwoFolds.", "/work");

export default function Work() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Work", "/work"]])} />
      <PageHead tag={work.label} title={work.title}><p>Look the way your customers look: quickly first, then slowly.</p></PageHead>
      <ul className="grid gap-2 bg-ink section-b tab:grid-cols-2 desk:grid-cols-6">
        {projects.map((p, i) => (
          <li key={p.slug} className={`${i < 2 ? "desk:col-span-3" : "desk:col-span-2"} ${i === projects.length - 1 && i % 2 === 0 ? "tab:max-desk:col-span-2 tab:max-desk:[&>a]:aspect-[8/5]" : ""}`}><ProjectCard p={p} eager={i < 2} /></li>
        ))}
      </ul>
    </>
  );
}
