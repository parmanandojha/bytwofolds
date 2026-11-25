import { site, services } from "./content";

export const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/icon-512.png`,
  image: `${site.url}/opengraph-image`,
  knowsAbout: ["Website design", "Website development", "Meta advertising", "Search engine optimisation", "Answer engine optimisation", "Structured data for AI", "Website care"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.answer, url: `${site.url}/services/${s.slug}` },
    })),
  },
};

export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: "en",
  publisher: { "@id": organization["@id"] },
};

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbs = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...items].map(([name, path], i) => ({
    "@type": "ListItem", position: i + 1, name, item: site.url + (path === "/" ? "" : path),
  })),
});

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function pageMeta(title: string, description: string, path: string) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, siteName: site.name, title, description, url: path, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }] },
  };
}
