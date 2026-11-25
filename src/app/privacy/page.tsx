import { site } from "@/lib/content";
import { pageMeta } from "@/lib/schema";
import { PageHead } from "@/components/PageHead";

export const metadata = pageMeta("Privacy", "How ByTwoFolds handles the information you send through this website.", "/privacy");

export default function Privacy() {
  return (
    <>
      <PageHead tag="Privacy" title="What we keep." />
      <section className="site-grid bg-ink section-b" aria-label="Privacy details">
        <div className="col-span-full flex flex-col gap-6 text-lg leading-relaxed text-white/80 tab:col-span-6 tab:col-start-3 desk:col-span-6 desk:col-start-4">
          <p>When you send the inquiry form we receive your name, email, website, the services you chose, your message and, if you came from an ad, its campaign tags. We use them to reply to you. They reach us by email.</p>
          <p>The chat assistant answers from this website’s content. What you type may be processed by Anthropic’s Claude to write the answer. We do not keep a chat unless you leave your details, in which case that conversation is emailed to us with your question.</p>
          <p>This site stores one value in your browser session so you only see the loading screen once. It sets no advertising or analytics cookies at present. If that changes, this page will say so first.</p>
          <p>To see, correct or delete what we hold about you, write to <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
