import { site } from "@/lib/content";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/schema";
import { PageHead } from "@/components/PageHead";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata = pageMeta("Start a Project", "Tell ByTwoFolds about your website, your ads and what you want people to feel when they find you.", "/contact");

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Contact", "/contact"]])} />
      <PageHead tag="Contact ByTwoFolds about a website or Meta ads" title="Tell us who you really are." slate>
        <p>Write it plainly. You do not need a brief. Or email <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </PageHead>
      <section className="join-prev bg-slate section-b text-ink" aria-label="Inquiry form">
        <div className="site-grid"><div className="col-span-full tab:col-span-7 tab:col-start-2 desk:col-span-6 desk:col-start-7"><InquiryForm /></div></div>
      </section>
    </>
  );
}
