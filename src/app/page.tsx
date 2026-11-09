import Link from "next/link";
import Image from "next/image";
import { joinReasons, homeFaqs, industries, siteConfig, whyUs } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import { CtaSection, EventsSection, FaqSection, PhotoStrip, ProcessSection, SectionHeading, ServicesGrid, StandOut, VideoBand } from "@/components/Sections";
import RobotHero from "@/components/RobotHero";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* Hero */}
      <RobotHero />

      {/* What makes us stand out + client logos */}
      <StandOut />
      <span id="main-content" className="block" aria-hidden="true" />

      {/* Stats */}
      <section className="border-b border-stone-200 bg-white">
        <Stats />
      </section>

      {/* Services */}
      <section className="py-20 md:py-28" aria-labelledby="services-heading">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Four pillars that drive real growth"
              text="Digital growth, AI automation, people development and custom software: everything your organisation needs to compete and thrive in a digital world."
            />
          </Reveal>
          <div className="mt-14">
            <ServicesGrid stagger />
          </div>
        </div>
      </section>

      {/* Video band */}
      <VideoBand />

      {/* Why us */}
      <section className="bg-navy-900 py-20 text-white md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brand-300!">Why CreatVate</p>
            <h2 className="mt-3 text-3xl font-bold text-white! md:text-4xl">A partner invested in your success</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-300">
              We take the time to understand your business, then grow it, automate it, equip your people and build the tools you need. One partner, one team, and accountability for results.
            </p>
            <Link href="/about" className="btn-primary mt-8">
              About us <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Icon name="check" className="h-7 w-7 rounded-full bg-brand-500 p-1.5 text-navy-950" />
                <h3 className="mt-4 text-lg font-bold text-white!">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* Industries */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Industries" title="Experience across sectors" text="We bring cross-industry insight to every engagement." />
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <li key={ind.name} className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-900 shadow-sm">
                {ind.name}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link href="/industries" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline">
              See the industries we serve <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Photo strip */}
      <PhotoStrip />

      {/* Training events */}
      <EventsSection />

      {/* Join us */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src="/images/team.jpg" alt="The CreatVate team" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-3 hidden rounded-2xl bg-brand-500 px-5 py-4 text-navy-950 shadow-xl sm:block">
                <p className="font-display text-2xl font-extrabold">Join us</p>
                <p className="text-sm font-medium">Grow with one team</p>
              </div>
            </Reveal>
            <Reveal delay={120} className="order-1 lg:order-2">
              <p className="eyebrow">Join us</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Become a CreatVate client</h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-600">
                Join the businesses growing with us. One team for your social media, AI automation, custom software and training, with clear pricing and support every step of the way.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {joinReasons.map((r) => (
                  <li key={r.title} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-brand-50 p-0.5 text-brand-600" />
                    {r.title}
                  </li>
                ))}
              </ul>
              <Link href="/join" className="btn-dark mt-8">
                See how to join <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection />
      <CtaSection />
    </>
  );
}
