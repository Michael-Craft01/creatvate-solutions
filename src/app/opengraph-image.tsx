import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} | ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoDataUri =
  "data:image/png;base64," + readFileSync(join(process.cwd(), "public/logo.png")).toString("base64");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0a0a0a 0%, #141414 55%, #b8420a 160%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri} width={72} height={72} alt="" style={{ objectFit: "contain" }} />
          <div style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, maxWidth: 950 }}>
            Grow · Automate · Empower · Build
          </div>
          <div style={{ fontSize: 32, color: "#ff8c42" }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ fontSize: 24, color: "#cbd5e1" }}>
          Digital Growth · AI Automation · Training &amp; Capacity Building · Custom Software
        </div>
      </div>
    ),
    size,
  );
}
