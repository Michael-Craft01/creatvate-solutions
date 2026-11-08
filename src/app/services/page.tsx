import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { services, siteConfig } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { CtaSection, PageHero, ProcessSection, ServicesGrid } from "@/components/Sections";

export const metadata = pageMetadata({
  title: "Our Services: Social Media, AI Automation, Training & Software",
  description:
    "Explore CreatVate Solutions' four pillars: Digital Growth (social media management), AI Automation, Training & Capacity Building, and Custom Software Development.",
  path: "/services",
});

export default function ServicesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} Services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${siteConfig.url}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[itemList, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]} />
      <PageHero
        eyebrow="Our services"
        title="Four pillars to grow and transform your business"
        description="Digital Growth, AI Automation, Training & Capacity Building and Custom Software Development, delivered by one team. Choose one, or combine them for end-to-end transformation."
        crumbs={[{ name: "Services", href: "/services" }]}
      />
      <section className="py-20 md:py-28">
        <div className="container-x">
          <ServicesGrid />
        </div>
      </section>
      <ProcessSection />
      <div className="pt-20 md:pt-28" />
      <CtaSection />
    </>
  );
}
