# CreatVate Solutions — Website Plan

## 1. Goals
- Make CreatVate Solutions look credible and premium to SME and enterprise decision-makers.
- Rank on Google for consultancy keywords (brand, service and "near me" searches).
- Turn visitors into leads: a consultation request form, phone, email and WhatsApp.
- Load fast (Core Web Vitals in the green) and work well on mobile.

## 2. Brand positioning
**CreatVate = Create + Innovate.** CreatVate is a consultancy that helps organisations plan, build and grow:
strategy and execution under one roof.

- **Tagline:** "Creating value through innovation."
- **Tone:** confident, practical, results-first. No jargon.
- **Visual identity:** deep navy (trust) + vibrant teal/emerald accent (innovation), with clean sans-serif type (Inter for body text, Plus Jakarta Sans for headings).

## 3. The four pillars (editable in `src/lib/site.ts`)
| # | Pillar | What it covers | Target keywords |
|---|--------|----------------|-----------------|
| 1 | **Digital Growth** | Social media management: strategy, content creation & scheduling, community management, paid social ads, analytics | social media management, social media marketing agency |
| 2 | **AI Automation** | We gather the company's details, map its workflows, then automate them with AI agents, chatbots and integrations so the team works better | AI automation agency, business process automation, workflow automation |
| 3 | **Training & Capacity Building** | AI & digital skills, social media, leadership, entrepreneurship, custom workshops | corporate training, capacity building, AI training for staff |
| 4 | **Custom Software Development** | Business systems (CRM/ERP), web & mobile apps, portals, websites, integrations, support | custom software development, business software development |

How the pillars connect: **Grow** (Digital Growth) → **Automate** (AI Automation) → **Build** (Custom Software) → **Empower** (Training).

## 4. Sitemap / information architecture
```
/                       Home — hero, services overview, process, why us, stats, testimonials, FAQ, CTA
/about                  Story, mission, vision, values, approach
/services               All services
/services/[slug]        One SEO landing page per pillar (4 pages, statically generated)
/industries             Sectors served
/contact                Consultation form, contact details, map, hours
/privacy                Privacy policy
/sitemap.xml            Auto-generated
/robots.txt             Auto-generated
/manifest.webmanifest   PWA manifest
/opengraph-image        Dynamic social share image
```

## 5. SEO strategy
### Technical SEO (built in)
- Next.js App Router with **static generation**, so every page ships as pre-rendered HTML.
- Unique `<title>`, meta description, canonical URL and Open Graph/Twitter tags on every page (Metadata API).
- `sitemap.xml` and `robots.txt` generated from the services list.
- **JSON-LD structured data**: `Organization` / `ProfessionalService`, `WebSite`, `Service` per service page, `FAQPage`, `BreadcrumbList`.
- Semantic HTML: one `<h1>` per page, logical heading order, landmarks, alt text.
- Performance: `next/font` (no layout shift), no heavy client JS, server components by default, image optimisation.
- Accessibility (WCAG AA contrast, keyboard navigation, focus states), which also helps rankings.
- Mobile-first responsive layout.
- Dynamic OG image for link previews on social media and WhatsApp.

### On-page / content
- Each service page targets one primary keyword cluster, with a benefit-led H1, deliverables, process and FAQs.
- Internal linking: home → services → related services → contact.
- Clear CTAs on every page.

### Off-page / launch checklist (after deployment)
1. Buy the domain and set `NEXT_PUBLIC_SITE_URL` (for example `https://creatvatesolutions.com`).
2. Verify in **Google Search Console** and **Bing Webmaster Tools**, then submit `/sitemap.xml`.
3. Create and verify a **Google Business Profile** using the same name, address and phone number as the site.
4. Add Google Analytics 4 / Plausible.
5. List the firm in business directories (LinkedIn company page, Clutch, local chambers of commerce).
6. Publish a blog/insights article every 2–4 weeks (phase 2).
7. Collect Google reviews from clients.

## 6. Tech stack
- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS v4**
- Hosting: **Vercel** (free tier is fine) or any Node host
- Contact form: server action posting to an API route, with an email provider (Resend/SMTP) to connect

## 7. Phase 2 ideas
- Blog/insights with MDX, case studies and a portfolio
- Team page with real photos
- Booking integration (Calendly)
- Multi-language support
- CMS (Sanity/Contentful) so non-developers can edit content

## 8. What you need to supply
- [ ] Real phone, email, address, WhatsApp number and social links → `src/lib/site.ts`
- [ ] Final domain → `.env` `NEXT_PUBLIC_SITE_URL`
- [ ] Logo file (an SVG wordmark is generated for now)
- [ ] Any real client testimonials and stats
- [ ] Email delivery for the contact form (Resend API key or SMTP)
