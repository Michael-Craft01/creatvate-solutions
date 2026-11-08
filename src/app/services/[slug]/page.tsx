import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import { CtaSection, EventsSection, FaqSection, PageHero, SectionHeading, ServiceCard } from "@/components/Sections";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const index = services.indexOf(service);
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length]);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title={service.title}
        description={service.short}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl">
              <Image src={service.image} alt={`${service.title} — CreatVate Solutions`} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">How we help</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">{service.intro}</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {service.offerings.map((o) => (
                <div key={o.title} className="rounded-2xl border border-stone-200 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{o.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-navy-900 p-8 text-white">
              <h2 className="text-xl font-bold text-white!">What you can expect</h2>
              <ul className="mt-5 space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-stone-200">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" /> {o}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary mt-8 w-full">
                Get a free quote
              </Link>
            </div>
            <div className="rounded-2xl border border-stone-200 p-6">
              <h2 className="text-base font-bold">Other services</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-stone-600 hover:text-brand-700">
                        {s.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {service.slug === "training-capacity-building" && (
        <div className="bg-stone-50">
          <EventsSection />
        </div>
      )}

      <div className="bg-stone-50">
        <FaqSection faqs={service.faqs} title={`${service.title} FAQs`} />
      </div>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Related services" title="Combine services for bigger impact" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
