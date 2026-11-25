import type { MetadataRoute } from "next";
import { projects, services, site } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority: number) => ({ url: site.url + p, priority });
  return [
    u("", 1), u("/services", 0.9), ...services.map((s) => u(`/services/${s.slug}`, 0.8)), u("/work", 0.8),
    ...projects.map((p) => u(`/work/${p.slug}`, 0.6)),
    u("/process", 0.7), u("/about", 0.6), u("/contact", 0.9), u("/privacy", 0.1),
  ];
}
