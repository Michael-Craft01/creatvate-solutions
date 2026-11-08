import Image from "next/image";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig, whyUs } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import { CtaSection, PageHero, ProcessSection, SectionHeading, VideoBand } from "@/components/Sections";

export const metadata = pageMetadata({
  title: "About Us: Our Mission, Vision & Values",
  description:
    "Learn about CreatVate Solutions, a business and technology consultancy dedicated to creating value through innovation. Discover our mission, vision, values and approach.",
  path: "/about",
});

const values = [
  { title: "Innovation", text: "We challenge the status quo and look for smarter, better ways to solve problems." },
  { title: "Integrity", text: "Honest advice, transparent pricing and doing what we say we will do." },
  { title: "Excellence", text: "High standards in everything we deliver, down to the last detail." },
  { title: "Partnership", text: "We work with you, not just for you, and we measure our success by yours." },
  { title: "Impact", text: "We focus on outcomes that make a real difference to your business and community." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About us"
        title="Creating value through innovation"
        description={`${siteConfig.name} is a multidisciplinary consultancy that helps organisations plan smarter, work better and grow faster.`}
        crumbs={[{ name: "About", href: "/about" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Where creativity meets innovation" center={false} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-600">
              <p>
                Our name says it all: <strong className="text-navy-900">Creat</strong>ivity +{" "}
                <strong className="text-navy-900">Vate</strong> (inno<em>vate</em>). We were founded on a simple belief: every organisation, whatever its size, deserves access to world-class strategic thinking and modern technology.
              </p>
              <p>
                Too many businesses hire one firm for social media, another for software and a third for training, and none of it connects. We bring it all together under four pillars (Digital Growth, AI Automation, Training & Capacity Building, and Custom Software Development) so everything works as one system.
              </p>
            </div>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src="/images/collaboration.jpg" alt="The CreatVate team at work" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-navy-900 p-8 text-white">
              <Icon name="strategy" className="h-9 w-9 text-brand-400" />
              <h2 className="mt-4 text-2xl font-bold text-white!">Our mission</h2>
              <p className="mt-3 leading-relaxed text-stone-300">
                To empower organisations with innovative, practical solutions that create lasting value for their customers, people and communities.
              </p>
            </div>
            <div className="rounded-2xl bg-brand-500 p-8 text-navy-950">
              <Icon name="spark" className="h-9 w-9" />
              <h2 className="mt-4 text-2xl font-bold">Our vision</h2>
              <p className="mt-3 leading-relaxed">
                To be the most trusted partner for businesses seeking growth through creativity, technology and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="What we stand for" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Why choose us" title="What makes us different" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div key={w.title} className="card">
                <Icon name="check" className="h-8 w-8 rounded-full bg-brand-50 p-1.5 text-brand-600" />
                <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <div className="pt-20 md:pt-28" />
      <VideoBand
        src="/videos/collab.mp4"
        poster="/images/meeting.jpg"
        title="Technology that moves you forward"
        text="From AI and automation to immersive digital tools, we help your organisation adopt what's next."
      />
      <CtaSection />
    </>
  );
}
