import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";
export const alt = `${site.name}: ${hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Og() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#101112", color: "#fff", padding: 64, position: "relative" }}>
      <svg width="760" height="760" viewBox="0 0 32 32" style={{ position: "absolute", right: -190, top: -60 }}>
        <path d="M10 3h20l-8 13H2z" fill="#9fb2bd" /><path d="M2 16h20l8 13H10z" fill="#5d6a72" />
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}>
        <div style={{ width: 16, height: 16, borderRadius: 16, background: "#ff1d0c" }} />{site.name}
      </div>
      <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -4, maxWidth: 720 }}>{hero.title}</div>
    </div>, size);
}
