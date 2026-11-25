import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { JsonLd, organization, website } from "@/lib/schema";
import { Chat } from "@/components/Chat";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { PageTransition } from "@/components/PageTransition";
import { Preloader } from "@/components/Preloader";
import { GridOverlay } from "@/components/GridOverlay";

const host = Host_Grotesk({ subsets: ["latin"], variable: "--font-host", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  category: "business",
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", title: site.title, description: site.description },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { themeColor: "#101112", colorScheme: "dark" };

// Runs before paint so a repeat visit in the same tab never sees the preloader
const boot = `try{if(sessionStorage.getItem("btf"))document.documentElement.classList.add("seen")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={host.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="sr-only z-[100] bg-white px-4 py-4 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
          Skip to content
        </a>
        <noscript><style>{`.preloader{display:none}`}</style></noscript>
        <JsonLd data={[organization, website]} />
        <Preloader />
        <PageTransition />
        <Header />
        <Motion>
          <main id="main" className="panels">{children}</main>
          <Footer />
        </Motion>
        <Chat />
        {process.env.NODE_ENV === "development" && <GridOverlay />}
      </body>
    </html>
  );
}
