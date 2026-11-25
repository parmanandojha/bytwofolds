import type { NextConfig } from "next";

const primary = "https://bytwofolds.co.in";
// Other addresses of this site. Each one permanently redirects to the primary domain.
const aliases = ["www.bytwofolds.co.in"];

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: __dirname },
  async redirects() {
    return aliases.map((value) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value }],
      destination: `${primary}/:path*`,
      statusCode: 301 as const,
    }));
  },
};
export default config;
