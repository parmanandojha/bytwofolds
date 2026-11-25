import { about, aboutMore, costs, faqs, figures, flow, hero, position, processPage, projects, sea, serviceDetails, services, site, startingPoints } from "./content";

/** Everything public on the site as plain text, built from the same copy the pages use. */
export const knowledge = [
  `# ${site.name}\n${site.description}\n${hero.title} ${hero.body}\n${position.body}\nContact page: /contact. Email: ${site.email}`,
  `# Research quoted on the site\n${figures.map((f) => `- ${f.value}${f.suffix} (${f.unit}): ${f.label}. Source: ${f.source}`).join("\n")}\n${sea.body}`,
  ...services.map((s) => {
    const d = serviceDetails[s.slug];
    return `# Service: ${s.name} (/services/${s.slug})\n${s.answer}\n${s.story}\nIncludes: ${s.includes.map((x) => `${x.title}: ${x.body}`).join(" ")}\nSigns you need it: ${d.signs.join(" ")}\nHow: ${d.steps.map((x) => `${x.title}: ${x.body}`).join(" ")}\nYou receive: ${d.receive.join(", ")}\nHow AI gets to know the business: ${d.ai}\n${s.faq.map((f) => `Q: ${f.q} A: ${f.a}`).join("\n")}`;
  }),
  `# Where to start\n${startingPoints.map((x) => `- ${x.need} Start with /services/${x.start}. ${x.why}`).join("\n")}`,
  `# Process (/process)\n${flow.title}\n${processPage.folds.map((f) => `${f.name}: ${f.summary}\n${f.stages.map((s) => `- ${s.name}: ${s.body} Client gets: ${s.get} We need: ${s.need}`).join("\n")}`).join("\n")}\n${processPage.promises.map((p) => `${p.title}: ${p.body}`).join("\n")}\n${processPage.faq.map((f) => `Q: ${f.q} A: ${f.a}`).join("\n")}`,
  `# Work (/work)\n${projects.map((p) => `- ${p.name} (/work/${p.slug}), ${p.sector}, ${p.place}: ${p.summary} ${p.story.map((x) => x.body).join(" ")} Live: ${p.url}`).join("\n")}`,
  `# About (/about)\n${about.body.join("\n")}\n${about.beliefs.map((b) => `${b.title}: ${b.body}`).join("\n")}\n${aboutMore.name.join(" ")}\nBest with: ${aboutMore.fit.join(" ")}\nNot right for: ${aboutMore.notFit.join(" ")}\n${aboutMore.ai.map((a) => `${a.title}: ${a.body}`).join("\n")}`,
  `# Questions\n${faqs.map((f) => `Q: ${f.q} A: ${f.a}`).join("\n")}\n${costs.map((c) => `${c.title}: ${c.body}`).join("\n")}`,
].join("\n\n");

/* ---- Built-in matcher, used when no Claude key is set or the API is unavailable ---- */

type Entry = { keys: string; answer: string };
const entries: Entry[] = [
  ...[...faqs, ...processPage.faq, ...services.flatMap((s) => s.faq)].map((f) => ({ keys: `${f.q} ${f.q}`, answer: f.a })),
  ...services.map((s) => ({ keys: `${s.name} ${s.name} ${s.slug} ${s.answer}`, answer: `${s.answer}\n\nMore: /services/${s.slug}` })),
  ...services.map((s) => ({ keys: `${s.name} include receive deliverables get`, answer: `With ${s.name} you receive: ${serviceDetails[s.slug].receive.join(", ")}.\n\nMore: /services/${s.slug}` })),
  ...processPage.folds.flatMap((f) => f.stages).map((s) => ({ keys: `${s.name} stage ${s.body}`, answer: `${s.name}: ${s.body}` })),
  { keys: "process work steps stages how does it work begin start", answer: `We work in two folds. ${flow.steps.map((s) => `${s.name}: ${s.body}`).join(" ")}\n\nEvery stage: /process` },
  { keys: "services offer do provide help with what", answer: `We offer ${services.map((s) => s.name).join(", ")}.\n\nSee them all: /services` },
  { keys: "work projects portfolio clients examples case studies made built", answer: `Recent work: ${projects.map((p) => `${p.name} (${p.sector})`).join(", ")}.\n\nSee it here: /work` },
  ...projects.map((p) => ({ keys: `${p.name} ${p.name} ${p.sector} ${p.place}`, answer: `${p.summary}\n\nMore: /work/${p.slug}` })),
  { keys: "who are you about company agency bytwofolds name two folds meaning", answer: `${position.body}\n\nMore: /about` },
  { keys: "ai artificial intelligence chatgpt gemini script scripts reading read embed search find", answer: `${services.find((s) => s.slug === "ai-reading-scripts")!.answer}\n\nMore: /services/ai-reading-scripts` },
];
const stop = new Set("a an and are as at be by can could do does for from had has have how i if in is it me my of on or our so that the their they this to us was we what when which who will with would you your yours about tell please know want need get".split(" "));
const stem = (w: string) => w.replace(/(ing|ers|er|ed|es|s)$/, "");
const words = (s: string) => s.toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => !stop.has(w)).map(stem) ?? [];
const docs = entries.map((e) => words(e.keys));
const df = new Map<string, number>();
docs.forEach((d) => new Set(d).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)));

const price = /\b(price|pricing|cost|costs|charge|fee|fees|budget|rate|rates|quote|how much|package|packages)\b/i;

export function localAnswer(q: string) {
  if (/^\s*(hi|hello|hey|namaste|good (morning|afternoon|evening))\b[\s!.]*$/i.test(q)) return "Hello. Ask me about our services, process or work, or tell me what is not working on your website.";
  if (price.test(q)) return "We do not list prices, because the cost depends on the pages, content and ads you need. Leave your details and a person will reply about your project.";
  if (/what (do|does|can) (you|bytwofolds|this company|your (company|agency|team)) (do|offer|provide)|your services|services (do you|you) offer/i.test(q)) return `${faqs.find((f) => f.q === "What does ByTwoFolds do?")!.a}\n\nSee each service: /services`;
  if (/\b(portfolio|case stud|past (work|projects?)|your (recent )?(work|projects|clients)|examples?)\b/i.test(q) && !/\bhow\b/i.test(q)) return `Recent work: ${projects.map((p) => `${p.name} (${p.sector})`).join(", ")}.\n\nSee it here: /work`;
  if (/\b(where|located|location|based|city|country|delhi|address|office)\b/i.test(q)) return "ByTwoFolds is based in Delhi, India, and works with businesses in India and abroad.\n\nMore: /about";
  if (/who (are|is) (you|bytwofolds)/i.test(q)) return `${position.body}\n\nMore: /about`;
  if (/\b(contact|reach you|call you|email|phone|talk to|speak to)\b/i.test(q)) return `Leave your details here, use the form at /contact, or write to ${site.email}.`;
  if (/\b(google|linkedin|tiktok|youtube|bing|twitter|snapchat|pinterest)\b.*\b(ads?|adwords|campaigns?|advertis\w*)\b/i.test(q)) return "No. We run Meta ads only, which means Facebook and Instagram.\n\nMore: /services/meta-ads";
  if (/\b(meta|facebook|instagram|paid)\b.*\b(ads?|campaigns?|advertis\w*)\b/i.test(q)) return `Yes. ${services.find((s) => s.slug === "meta-ads")!.answer}\n\nMore: /services/meta-ads`;
  if (/\b(ai|chatgpt|gemini|perplexity)\b/i.test(q) && !/guarantee|promise/i.test(q)) return /\b(build|make|create|design|develop|made)\b/i.test(q) && /website|site/i.test(q)
    ? "Our service is to design and develop your website around your business, then embed AI reading scripts so AI assistants can understand it.\n\nMore: /services/ai-reading-scripts"
    : `${services.find((s) => s.slug === "ai-reading-scripts")!.answer}\n\nMore: /services/ai-reading-scripts`;
  if (/\b(maintain|maintenance|upkeep|website care|look after)\b/i.test(q)) return `${services.find((s) => s.slug === "website-care")!.answer}\n\nMore: /services/website-care`;
  const ws = [...new Set(words(q))];
  let best = 0, at = -1;
  docs.forEach((d, i) => {
    const score = ws.reduce((s, w) => { const n = d.filter((x) => x === w).length; return n ? s + Math.log(1 + docs.length / df.get(w)!) * Math.min(n, 2) : s; }, 0) / Math.sqrt(8 + d.length);
    if (score > best) { best = score; at = i; }
  });
  return best > 0.5 ? entries[at].answer : "I do not have a sure answer to that from our website, and I would rather not guess. Leave your question and a person will reply.";
}
