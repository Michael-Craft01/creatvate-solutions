import Image from "next/image";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { billing, joinPlans, joinReasons, processSteps, siteConfig } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { PageHero, SectionHeading } from "@/components/Sections";

export const metadata = pageMetadata({
  title: "Join Us: Partner with CreatVate Solutions",
  description:
    "Become a CreatVate client. Partner with one team for social media, AI automation, custom software and training. Book a free consultation and start growing today.",
  path: "/join",
});

export default function JoinPage() {
  const { contact } = siteConfig;
  const waHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi CreatVate, I'd like to become a client.")}`
    : "";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Join us", path: "/join" }])} />
      <PageHero
        eyebrow="Join us"
        title="Partner with CreatVate"
        description="Join the businesses growing with us. One team for your social media, AI automation, custom software and training, with clear pricing and real results."
        crumbs={[{ name: "Join us", href: "/join" }]}
      />

      {/* Intro + image */}
      <section className="py-16 md:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Why join us</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">A growth partner, not just a vendor</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              When you join CreatVate, you get a team that treats your goals as its own. We plan, build, automate and train, then stay with you as you grow, so you always have the support you need.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Book a free consultation <Icon name="arrow" className="h-4 w-4" />
              </Link>
              {waHref && (
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/handshake.jpg" alt="Partnering with CreatVate Solutions" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="The CreatVate difference" title="Why businesses choose us" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {joinReasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 90} className="card">
                <Icon name={r.icon} className="h-9 w-9 rounded-xl bg-brand-50 p-2 text-brand-600" />
                <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to join */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Getting started" title="Joining us is simple" text="Four easy steps from first hello to growing together." />
          </Reveal>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90} className="relative rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-lg">
                <span className="font-display text-5xl font-extrabold text-brand-100">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Ways to work together" title="Find the right fit" text="Flexible packages that grow with you. Every plan is tailored and quoted to your needs." />
          </Reveal>
          <Reveal delay={80} className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-brand-300 bg-brand-50 px-5 py-4 text-sm text-navy-900">
            <Icon name="spark" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <p>
              <strong>How we charge:</strong> {billing.note}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {joinPlans.map((plan, i) => (
              <Reveal
                key={plan.name}
                delay={i * 100}
                className={`flex h-full flex-col rounded-3xl border p-7 ${
                  plan.featured ? "border-brand-500 bg-navy-900 text-white shadow-xl" : "border-stone-200 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy-950">
                    Most popular
                  </span>
                )}
                <h3 className={`text-2xl font-bold ${plan.featured ? "text-white!" : ""}`}>{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.featured ? "text-stone-300" : "text-stone-600"}`}>{plan.tagline}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.featured ? "text-stone-200" : "text-stone-700"}`}>
                      <Icon name="check" className={`mt-0.5 h-5 w-5 shrink-0 rounded-full p-0.5 ${plan.featured ? "bg-brand-500 text-navy-950" : "bg-brand-50 text-brand-600"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`mt-8 ${plan.featured ? "btn-primary" : "btn-dark"}`}>
                  {plan.cta} <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 md:py-28">
        <div className="container-x relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 px-6 py-16 text-center text-white md:py-20">
          <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-white! md:text-4xl">Ready to join us?</h2>
            <p className="mt-4 text-lg text-stone-200">
              Book a free, no-obligation consultation. Tell us your goals and we&apos;ll show you how to reach them.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Book a free consultation <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="btn-secondary">
                <Icon name="phone" className="h-4 w-4" /> {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
