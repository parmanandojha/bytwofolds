import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
export default function robots(): MetadataRoute.Robots {
  const ai = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended"];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }, { userAgent: ai, allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
