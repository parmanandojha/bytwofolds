import type { NextConfig } from "next";
const config: NextConfig = { reactStrictMode: true, poweredByHeader: false, devIndicators: false, turbopack: { root: __dirname } };
export default config;
