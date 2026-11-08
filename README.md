# CreatVate Solutions — Website

The marketing website for **CreatVate Solutions Consultancy**, built with Next.js (App Router), TypeScript and Tailwind CSS v4 and optimised for SEO.

See [PLAN.md](PLAN.md) for the full site plan, SEO strategy and launch checklist.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

Almost all content lives in **`src/lib/site.ts`**: company details, contact info, services, industries, FAQs,
testimonials and stats. Search that file for `TODO` to find the placeholders to replace before launch.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real domain.

## SEO features
- Pre-rendered static pages, each with a unique title, description, canonical URL, Open Graph and Twitter tags
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, and a dynamic `/opengraph-image`
- JSON-LD structured data: ProfessionalService, WebSite, Service, FAQPage, BreadcrumbList, ItemList
- Semantic, accessible HTML; `next/font` for zero layout shift; minimal client-side JavaScript

## Project structure
```
src/
  app/                 routes (home, about, services, services/[slug], industries, contact, privacy)
    api/contact/       contact form endpoint (connect an email provider here)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx
  components/          Header, Footer, sections, icons, contact form
  lib/site.ts          ← all business content
  lib/seo.ts           metadata & structured-data helpers
```

## Deploy
Push the project to GitHub and import it into [Vercel](https://vercel.com). Set `NEXT_PUBLIC_SITE_URL` in the
project's environment variables, then submit `/sitemap.xml` in Google Search Console.
