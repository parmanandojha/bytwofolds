/** Numbered rows on the grid: number, title, body, with a drawn rule above each. */
export function DetailRows({ items, tone = "dark", as: H = "h3" }: { items: { title: string; body: string }[]; tone?: "dark" | "slate"; as?: "h2" | "h3" }) {
  const slate = tone === "slate";
  return (
    <ol className="head-gap">
      {items.map((x, n) => (
        <li key={x.title} className="site-grid gap-y-4 py-8 desk:py-10">
          <span data-rule className={`col-span-full mb-4 h-px ${slate ? "bg-ink/25" : "bg-white/20"}`} aria-hidden="true" />
          <span className={`label col-span-full tab:col-span-1 desk:col-span-3 ${slate ? "" : "text-ash"}`}>/ 0{n + 1}</span>
          <H className="col-span-full text-title tight tab:col-span-3 desk:col-span-4">{x.title}</H>
          <p data-fade className={`col-span-full max-w-[44ch] leading-snug tab:col-span-4 desk:col-start-9 ${slate ? "" : "text-ash"}`}>{x.body}</p>
        </li>
      ))}
    </ol>
  );
}
