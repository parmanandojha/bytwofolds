import { Tag } from "./ui";

export function PageHead({ tag, title, children, slate = false }: { tag: string; title: string; children?: React.ReactNode; slate?: boolean }) {
  return (
    <section className={slate ? "mt-14 bg-slate text-ink" : "bg-ink"}>
      <div className={`site-grid gap-y-8 pb-16 desk:pb-24 ${slate ? "pt-16 desk:pt-24" : "pt-36 desk:pt-48"}`}>
        <Tag className="col-span-full">{tag}</Tag>
        <h1 data-split data-hero="0" className="col-span-full max-w-[14ch] text-hero tight desk:col-span-10">{title}</h1>
        {children && <div data-fade data-hero="0.4" className={`col-span-full text-lead snug tab:col-span-6 tab:col-start-3 desk:col-span-5 desk:col-start-7`}>{children}</div>}
      </div>
    </section>
  );
}
