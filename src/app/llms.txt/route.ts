import { about, faqs, processPage, projects, services, site } from "@/lib/content";
export const dynamic = "force-static";
export function GET() {
  const body = `# ${site.name}

> ${site.description}

${about.body[2]}

## Services
${services.map((s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.answer}`).join("\n")}

## Pages
- [Process](${site.url}/process)
- [Work](${site.url}/work)
- [About](${site.url}/about)
- [Contact](${site.url}/contact): ${site.email}

## Work
${projects.map((p) => `- [${p.name}](${site.url}/work/${p.slug}): ${p.summary}`).join("\n")}

## Process
${processPage.folds.map((f) => `### ${f.name}\n${f.stages.map((s) => `- ${s.name}: ${s.body} You get: ${s.get}`).join("\n")}`).join("\n\n")}

## Questions and answers
${[...faqs, ...processPage.faq, ...services.flatMap((s) => s.faq)].map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
