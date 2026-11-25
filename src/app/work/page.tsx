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
      <ul className="grid gap-2 bg-ink section-b tab:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}><ProjectCard p={p} eager={i < 2} /></li>
        ))}
      </ul>
    </>
  );
}
