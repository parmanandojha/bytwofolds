import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { Arrow } from "./ui";

export function ProjectCard({ p, eager = false }: { p: Project; eager?: boolean }) {
  return (
    <Link href={`/work/${p.slug}`} className="group relative block aspect-[4/5] overflow-hidden text-white" style={{ background: p.color }}>
      <Image src={`/work/${p.slug}-hero.webp`} alt="" fill sizes="(min-width: 64rem) 50vw, 100vw" loading={eager ? "eager" : "lazy"} className="object-cover opacity-25 transition-[scale,opacity] duration-1000 ease-out group-hover:scale-105 group-hover:opacity-50" />
      <span className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${p.color} 12%, transparent 70%)` }} aria-hidden="true" />
      <span className="absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-4 tab:inset-x-6 tab:top-6">
        <span className="flex flex-col gap-2">
          <span className="text-title tight">{p.name}</span>
          <span className="text-sm text-white/85">{p.sector}, {p.place}</span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center bg-white text-ink transition-colors duration-300 group-hover:bg-signal group-hover:text-white"><Arrow /></span>
      </span>
      <span className="absolute top-[34%] left-1/2 block w-[52%] -translate-x-1/2 overflow-hidden rounded-[6%/3%] shadow-2xl shadow-black/50 transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-6">
        <Image src={`/work/${p.slug}-phone.webp`} alt={p.alt.phone} width={780} height={1688} sizes="(min-width: 64rem) 26vw, 50vw" loading={eager ? "eager" : "lazy"} className="block h-auto w-full" />
      </span>
    </Link>
  );
}
