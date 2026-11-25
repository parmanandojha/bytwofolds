import { projects, site, services } from "./content";

export const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: ["By Two Folds", "TwoFolds", "bytwofolds.co.in"],
  disambiguatingDescription: "Website design, development and Meta ads studio based in Delhi, India. Official website: bytwofolds.co.in.",
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/icon-512.png`,
  image: `${site.url}/opengraph-image`,
  slogan: "Before they trust you, they judge your website.",
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressRegion: "Delhi", addressCountry: "IN" },
  areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide" }],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email, url: `${site.url}/contact`, areaServed: ["IN", "Worldwide"], availableLanguage: ["en"] },
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
  alternateName: ["By Two Folds", "bytwofolds.co.in"],
  url: site.url,
  inLanguage: "en-IN",
  publisher: { "@id": organization["@id"] },
};

export const homePage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${site.url}/#webpage`,
  url: site.url,
  name: site.title,
  description: site.description,
  inLanguage: "en-IN",
  isPartOf: { "@id": website["@id"] },
  about: { "@id": organization["@id"] },
  primaryImageOfPage: `${site.url}/opengraph-image`,
};

export const workList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Websites by ${site.name}`,
  itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${site.url}/work/${p.slug}` })),
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
