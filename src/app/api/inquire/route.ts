import { foreign, limited, str } from "@/lib/guard";
import { mailLead, mailReady, type Lead } from "@/lib/mail";

export const runtime = "nodejs";
const fail = (error: string, status: number) => Response.json({ error }, { status });

export async function POST(req: Request) {
  if (foreign(req)) return fail("That request could not be read.", 403);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return fail("That request could not be read.", 400); }
  if (!b || typeof b !== "object") return fail("That request could not be read.", 400);
  if (str(b.company_fax, 10)) return Response.json({ ok: true }); // honeypot

  const lead: Lead = {
    source: b.source === "chat" ? "chat" : "form",
    name: str(b.name, 120).replace(/\s+/g, " "),
    email: str(b.email, 200),
    website: str(b.website, 300),
    message: str(b.message, 4000),
    services: Array.isArray(b.services) ? b.services.slice(0, 10).map((s) => str(s, 60)).filter(Boolean) : [],
    campaign: Object.fromEntries(Object.entries((b.campaign as object) ?? {}).slice(0, 10).map(([k, v]) => [k.slice(0, 40), str(v, 300)])),
    transcript: str(b.transcript, 8000),
    receivedAt: new Date().toISOString(),
  };
  if (!lead.name || !lead.message) return fail("Please add your name and a message.", 400);
  if (!/^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/.test(lead.email)) return fail("Please check your email address.", 400);
  if (limited(req, "inquire", 6)) return fail("That is a lot of messages at once. Please try again in a few minutes.", 429);

  const hook = process.env.INQUIRY_WEBHOOK_URL;
  const jobs: Promise<unknown>[] = [];
  if (mailReady()) jobs.push(mailLead(lead));
  if (hook) jobs.push(fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), signal: AbortSignal.timeout(8000) }).then((r) => { if (!r.ok) throw new Error(`webhook ${r.status}`); }));
  if (!jobs.length) {
    console.error("Inquiry not delivered: set SMTP_USER, SMTP_PASS and INQUIRY_EMAIL_TO.");
    return fail("The form is not connected yet.", 503);
  }
  const done = await Promise.allSettled(jobs);
  done.forEach((d) => d.status === "rejected" && console.error("Inquiry delivery failed:", d.reason?.code ?? d.reason?.message));
  return done.some((d) => d.status === "fulfilled") ? Response.json({ ok: true }) : fail("Your message did not go through.", 502);
}
