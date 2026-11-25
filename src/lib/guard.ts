import "server-only";
// Best effort, per server instance. Put a platform rate limit in front for heavy traffic.
const hits = new Map<string, number[]>();

export function limited(req: Request, bucket: string, max: number, windowMs = 600_000) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const key = `${bucket}:${ip}`, now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) return true;
  recent.push(now);
  if (hits.size > 5000) hits.clear();
  hits.set(key, recent);
  return false;
}

/** Browsers send Origin on POST: refuse other websites using our endpoints. */
export function foreign(req: Request) {
  const o = req.headers.get("origin");
  if (!o) return false;
  try { return new URL(o).host !== (req.headers.get("x-forwarded-host") ?? req.headers.get("host")); } catch { return true; }
}

export const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
