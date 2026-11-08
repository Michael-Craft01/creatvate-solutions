import Link from "next/link";
import { clients, siteConfig } from "@/lib/site";
import Icon, { type AnyIcon } from "./Icon";

const pillars: { icon: AnyIcon; label: string; text: string }[] = [
  { icon: "megaphone", label: "Grow", text: "Social media that sells." },
  { icon: "bot", label: "Automate", text: "AI does the busywork." },
  { icon: "code", label: "Build", text: "Software that fits you." },
  { icon: "graduation", label: "Train", text: "Future-ready teams." },
];

export default function RobotHero() {
  return (
    <section className="relative bg-stone-100 px-4 pt-6 pb-10 sm:px-6 sm:pt-8 lg:px-8">
      <div className="relative mx-auto min-h-[560px] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-stone-200 bg-gradient-to-b from-[#faf8f4] to-[#f1eee7] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)] lg:min-h-[620px]">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[100px]" aria-hidden="true" />

        <Seal />

        {/* floating glass cards (desktop) */}
        <GlassCard className="left-[2%] top-[42%] max-w-[210px]" icon="chart" title="Turn problems into progress." text="We fix what slows your business down." />
        <GlassCard className="right-[2%] top-[48%] max-w-[220px]" icon="transform" title="Solutions, anytime." text="One team across every channel." stacked />

        {/* trusted by (bottom-left) */}
        <div className="absolute bottom-7 left-7 z-10 hidden lg:block">
          <p className="text-sm text-stone-500">Trusted by growing businesses.</p>
          <div className="mt-2 flex items-center">
            {clients.map((c, i) => (
              <span
                key={c.name}
                title={c.name}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#faf8f4] bg-navy-900 font-display text-[11px] font-bold text-brand-400 ${i > 0 ? "-ml-2.5" : ""}`}
              >
                {c.name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("")}
              </span>
            ))}
            <span className="-ml-2.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#faf8f4] bg-stone-200 text-sm font-bold text-stone-600">+</span>
          </div>
        </div>

        {/* accent (bottom-right) */}
        <div className="absolute bottom-7 right-7 z-10 hidden items-center gap-3 lg:flex">
          <Sparkle className="h-5 w-5 text-navy-900" />
          <p className="text-sm leading-tight text-stone-500">
            Less complexity.
            <br />
            More results.
          </p>
        </div>

        {/* headline + CTAs */}
        <div className="relative z-10 px-6 pt-16 text-center sm:px-10 lg:pt-24">
          <h1 className="mx-auto max-w-4xl font-serif text-[2.6rem] font-medium leading-[1.02] tracking-tight text-navy-900 sm:text-6xl lg:text-7xl">
            We solve the tech problems
            <br />
            <span className="italic">holding you back.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            {siteConfig.name} fixes your technical headaches — from social media and AI automation to custom software and training — so your business runs clearer and faster.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-dark">
              Book a free consultation <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 rounded-full border border-stone-300 bg-white/70 px-5 py-3 text-sm font-semibold text-navy-900 backdrop-blur transition hover:border-navy-900"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-white">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              See what we do
            </Link>
          </div>
        </div>

        {/* four pillars */}
        <div className="relative z-10 mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 px-6 pb-14 sm:grid-cols-4 lg:mt-16">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl border border-stone-200 bg-white/80 p-5 text-left shadow-lg shadow-navy-900/5 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-navy-900 hover:shadow-xl"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-navy-900">{p.label}</p>
              <p className="mt-1 text-sm text-stone-500">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
    </svg>
  );
}

function Seal() {
  return (
    <div className="absolute right-6 top-6 z-10 hidden h-28 w-28 lg:right-10 lg:top-10 lg:block">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="sealArc" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-stone-500" style={{ fontSize: "7.5px", letterSpacing: "2.4px", fontFamily: "var(--font-jakarta)" }}>
          <textPath href="#sealArc">CREATING VALUE · THROUGH INNOVATION · </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkle className="h-6 w-6 text-navy-900" />
      </div>
    </div>
  );
}

function GlassCard({
  className,
  icon,
  title,
  text,
  stacked = false,
}: {
  className: string;
  icon: AnyIcon;
  title: string;
  text: string;
  stacked?: boolean;
}) {
  return (
    <div className={`absolute z-20 hidden rounded-2xl border border-stone-200 bg-white/70 p-4 shadow-xl shadow-navy-900/5 backdrop-blur lg:block ${className}`}>
      {stacked ? (
        <div className="mb-3 flex items-center">
          {["#1f2937", "#9a3412", "#0f766e"].map((c, i) => (
            <span key={i} className={`h-7 w-7 rounded-full border-2 border-white ${i > 0 ? "-ml-2" : ""}`} style={{ background: c }} />
          ))}
          <span className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-stone-200 text-xs font-bold text-stone-600">+</span>
        </div>
      ) : (
        <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon name={icon} className="h-4 w-4" />
        </span>
      )}
      <p className="font-display text-sm font-bold text-navy-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-stone-500">{text}</p>
    </div>
  );
}
