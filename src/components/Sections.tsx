import Link from "next/link";
import Image from "next/image";
import { clients, homeFaqs, processSteps, services, siteConfig, trainingEvents, type Service } from "@/lib/site";
import Icon from "./Icon";
import Reveal from "./Reveal";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function ClientsBand() {
  return (
    <section className="border-y border-stone-200 bg-stone-50 py-14">
      <div className="container-x text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Brands we&apos;ve worked with</p>
        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-5">
          {clients.map((c) => (
            <div key={c.name} className="min-w-[240px] rounded-2xl border border-stone-200 bg-white px-7 py-6 text-left shadow-sm">
              <p className="font-display text-xl font-bold text-navy-900">{c.name}</p>
              <p className="mt-1 text-sm font-medium text-brand-700">{c.service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSection({ className = "" }: { className?: string }) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Training events"
            title="Upcoming training & workshops"
            text="Hands-on sessions that build your team's digital, AI and social media skills."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {trainingEvents.map((e, i) => (
            <Reveal key={e.title} delay={i * 90} className="card flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-lg bg-navy-900 px-3 py-1.5 font-display text-sm font-bold text-white">{fmtDate(e.date)}</span>
                {e.tag && <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{e.tag}</span>}
              </div>
              <h3 className="mt-4 text-lg font-bold">{e.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{e.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="transform" className="h-4 w-4 text-brand-600" /> {e.format}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="pin" className="h-4 w-4 text-brand-600" /> {e.location}
                </span>
              </div>
              {e.registerUrl ? (
                <a href={e.registerUrl} target="_blank" rel="noopener noreferrer" className="btn-dark mt-5">
                  Register now <Icon name="arrow" className="h-4 w-4" />
                </a>
              ) : (
                <Link href="/contact" className="btn-dark mt-5">
                  Register interest <Icon name="arrow" className="h-4 w-4" />
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  crumbs?: { name: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
      <div className="container-x relative py-20 md:py-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-brand-300">{c.name}</span>
                  ) : (
                    <Link href={c.href} className="hover:text-white">{c.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow text-brand-300!">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-white! md:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-300">{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = true,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-stone-600">{text}</p>}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-900 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} — CreatVate Solutions`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-brand-600 shadow-md backdrop-blur">
          <Icon name={service.icon} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function PhotoStrip() {
  const shots = [
    { src: "/images/team.jpg", alt: "The CreatVate team collaborating" },
    { src: "/images/data-analytics.jpg", alt: "Reviewing performance analytics" },
    { src: "/images/strategy.jpg", alt: "Planning a client strategy" },
    { src: "/images/handshake.jpg", alt: "Partnering with a client" },
    { src: "/images/meeting.jpg", alt: "A project kick-off meeting" },
  ];
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {shots.map((s, i) => (
            <div
              key={s.src}
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl ${i === 4 ? "hidden lg:block" : ""} ${i === 0 ? "col-span-2 aspect-[3/2] sm:col-span-1 sm:aspect-[3/4]" : ""}`}
            >
              <Image src={s.src} alt={s.alt} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ exclude, stagger = false }: { exclude?: string; stagger?: boolean }) {
  const list = services.filter((s) => s.slug !== exclude);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((s, i) =>
        stagger ? (
          <Reveal key={s.slug} delay={i * 90} className="h-full">
            <ServiceCard service={s} />
          </Reveal>
        ) : (
          <ServiceCard key={s.slug} service={s} />
        ),
      )}
    </div>
  );
}

export function VideoBand({
  src = "/videos/office-work.mp4",
  poster = "/images/office.jpg",
  title = "See how we put AI to work",
  text = "We map how your business runs, then automate the repetitive tasks, so your team can focus on the work that matters.",
}: {
  src?: string;
  poster?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl">
          <video
            className="h-[320px] w-full object-cover md:h-[460px]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 max-w-xl p-8 text-white md:p-12">
            <h2 className="text-3xl font-bold text-white! md:text-4xl">{title}</h2>
            <p className="mt-3 text-stone-200">{text}</p>
            <Link href="/contact" className="btn-primary mt-6">
              Start your project <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="How we work" title="A proven process from idea to impact" text="A simple, transparent approach that keeps you in control and delivers measurable results." />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 90} className="relative rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
              <span className="font-display text-5xl font-extrabold text-brand-100">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FaqSection({ faqs = homeFaqs, title = "Frequently asked questions" }: { faqs?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={title} />
        <div className="mt-12 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-navy-900">
                <h3>{f.q}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 leading-relaxed text-stone-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="px-4 pb-20 md:pb-28">
      <div className="container-x relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 px-6 py-16 text-center text-white md:py-20">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white! md:text-4xl">Ready to create what&apos;s next?</h2>
          <p className="mt-4 text-lg text-stone-200">
            Book a free, no-obligation consultation with {siteConfig.name}. Tell us your goals and we&apos;ll show you how to reach them.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Book a free consultation <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="btn-secondary">
              <Icon name="phone" className="h-4 w-4" /> Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
