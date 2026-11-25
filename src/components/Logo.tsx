/** Two facets sharing one crease. */
export function Mark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path className={animated ? "facet facet-a" : undefined} d="M10 3h20l-8 13H2z" />
      <path className={animated ? "facet facet-b" : undefined} d="M2 16h20l8 13H10z" opacity=".55" />
    </svg>
  );
}
