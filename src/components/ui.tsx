import Link from "next/link";

export function Tag({ children, className = "", as: T = "p" }: { children: React.ReactNode; className?: string; as?: "p" | "h2" }) {
  return (
    <T className={`label flex items-center gap-2 self-start ${className}`}>
      <span className="size-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </T>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`size-3 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" />
    </svg>
  );
}

export function Cta({ href, children, className = "", tall = false }: { href: string; children: React.ReactNode; className?: string; tall?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative isolate flex justify-between overflow-hidden bg-white text-ink ${tall ? "h-18 w-52 items-stretch p-4" : "h-12 w-48 items-center pr-2 pl-4"} ${className}`}
    >
      <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-y-100" aria-hidden="true" />
      <span className="label transition-colors duration-300 group-hover:text-white">{children}</span>
      <span className={`grid size-8 place-items-center bg-mist transition-colors duration-300 group-hover:bg-white ${tall ? "self-end" : ""}`}>
        <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
