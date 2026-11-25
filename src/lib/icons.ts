import type { Service } from "./content";

export const iconPaths: Record<Service["icon"], string[]> = {
  facets: ["M14 6h30L32 24H2z", "M2 24h30l12 18H14z", "M14 6 32 24", "M32 24 14 42"],
  grid: ["M4 4h40v40H4z", "M4 17h40", "M17 17v27", "M30 17v27"],
  loop: ["M24 4a20 20 0 1 1-20 20", "M24 12a12 12 0 1 1-12 12", "M24 20a4 4 0 1 1-4 4", "M4 24 1 19M4 24l5-3"],
  target: ["M24 4a20 20 0 1 0 .01 0z", "M24 13a11 11 0 1 0 .01 0z", "M24 22a2 2 0 1 0 .01 0z", "M24 24 44 4"],
  signal: ["M4 40a20 20 0 0 1 40 0", "M12 40a12 12 0 0 1 24 0", "M20 40a4 4 0 0 1 8 0", "M24 20V6"],
};
