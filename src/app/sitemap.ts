import type { MetadataRoute } from "next";
import { services, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;
  const staticPages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/industries", priority: 0.7, freq: "monthly" },
    { path: "/join", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
  ];
  return [
    ...staticPages.map((p) => ({
      url: `${base}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
