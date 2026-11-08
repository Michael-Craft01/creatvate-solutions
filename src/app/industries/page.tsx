import Image from "next/image";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { industries } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { CtaSection, PageHero } from "@/components/Sections";

export const metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "CreatVate Solutions supports SMEs, financial services, retail, NGOs, public sector, agriculture, healthcare and education organisations with tailored consulting and digital solutions.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <PageHero
        eyebrow="Industries"
        title="Sector insight, tailored solutions"
        description="Every industry has its own challenges, regulations and opportunities. We adapt our expertise to the realities of your sector."
        crumbs={[{ name: "Industries", href: "/industries" }]}
      />
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <article key={ind.name} className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-900 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={ind.image} alt={ind.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-1 font-display text-xs font-bold text-brand-600 shadow backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold">{ind.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{ind.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
