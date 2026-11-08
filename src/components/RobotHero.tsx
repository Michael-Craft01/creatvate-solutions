"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { services, siteConfig } from "@/lib/site";
import Icon from "./Icon";

// Eye centres in the SVG viewBox (0 0 480 620)
const EYES = [
  { cx: 210, cy: 238 },
  { cx: 270, cy: 238 },
];
const MAX_OFFSET = 9; // how far an eye can travel from centre (viewBox units)
const SENS = 200; // screen px to reach full deflection

export default function RobotHero() {
  const svgRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pupilRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null)];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    const cur = EYES.map(() => ({ x: 0, y: 0 }));
    let headX = 0, headY = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };

    const loop = () => {
      const svg = svgRef.current;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const scale = rect.width / 480;

        let avgX = 0;
        EYES.forEach((eye, i) => {
          const ex = rect.left + eye.cx * scale;
          const ey = rect.top + eye.cy * scale;
          const dx = px - ex;
          const dy = py - ey;
          const dist = Math.hypot(dx, dy) || 1;
          const mag = Math.min(1, dist / SENS);
          const tx = (dx / dist) * mag * MAX_OFFSET;
          const ty = (dy / dist) * mag * MAX_OFFSET;
          cur[i].x += (tx - cur[i].x) * 0.2;
          cur[i].y += (ty - cur[i].y) * 0.2;
          pupilRefs[i].current?.setAttribute("transform", `translate(${cur[i].x.toFixed(2)} ${cur[i].y.toFixed(2)})`);
          avgX += dx;
        });

        // subtle head lean toward the cursor (no rotation, so the hood stays on the body)
        const nx = Math.max(-1, Math.min(1, avgX / 2 / (rect.width || 1)));
        const ny = Math.max(-1, Math.min(1, (py - (rect.top + rect.height / 2)) / (rect.height || 1)));
        headX += (nx - headX) * 0.1;
        headY += (ny - headY) * 0.1;
        headRef.current?.setAttribute("transform", `translate(${(headX * 7).toFixed(2)} ${(headY * 4).toFixed(2)})`);
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative bg-stone-100 px-4 pt-6 pb-10 sm:px-6 sm:pt-8 lg:px-8">
      <div className="relative mx-auto min-h-[600px] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-stone-200 bg-gradient-to-b from-white to-stone-50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)] lg:min-h-[660px]">
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-500/35 blur-[90px]" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[22vw] font-extrabold leading-none tracking-tighter text-stone-900/[0.04] lg:text-[200px]"
        >
          CREATVATE
        </span>

        <nav aria-label="Hero quick links" className="absolute right-6 top-6 z-20 hidden grid-cols-2 gap-x-10 gap-y-1.5 text-sm lg:right-10 lg:top-10 lg:grid">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="text-stone-500 underline-offset-4 hover:text-brand-600 hover:underline">
              {s.title}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 grid h-full items-center gap-6 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:py-16">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.6rem]">
              Changing your idea of{" "}
              <span className="text-brand-500">what AI can do</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
              Meet the team behind your growth. {siteConfig.name} puts AI automation, social media, custom software and training to work for your business.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Book a free consultation <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-outline">
                Explore our services
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="robot-float w-full max-w-[380px]">
              <Mascot svgRef={svgRef} headRef={headRef} pupilRefs={pupilRefs} />
            </div>
            <div className="absolute -left-2 bottom-10 hidden max-w-[230px] rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-700 shadow-lg backdrop-blur md:block lg:-left-10">
              We automate your workflows with AI you can actually trust.
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 z-10 hidden max-w-[300px] items-start gap-3 lg:flex">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-brand-400">
            <Icon name="bot" className="h-6 w-6" />
          </span>
          <p className="text-xs leading-relaxed text-stone-600">
            We map how your business works, then let AI handle the repetitive tasks, so your team moves faster.
          </p>
        </div>

        <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 text-sm font-semibold text-stone-500 lg:flex">
          <span>10</span>
          <span className="h-14 w-px bg-stone-300" />
          <span>20</span>
        </div>
        <a
          href="#main-content"
          aria-label="Scroll down"
          className="absolute bottom-6 right-6 z-10 hidden h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-white text-navy-900 transition-colors hover:border-navy-900 lg:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}

type Refs = {
  svgRef: React.RefObject<SVGSVGElement | null>;
  headRef: React.RefObject<SVGGElement | null>;
  pupilRefs: React.RefObject<SVGGElement | null>[];
};

function Mascot({ svgRef, headRef, pupilRefs }: Refs) {
  return (
    <svg ref={svgRef} viewBox="0 0 480 620" className="h-auto w-full" role="img" aria-label="Friendly CreatVate mascot">
      <defs>
        <radialGradient id="hood" cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f6f1ea" />
          <stop offset="100%" stopColor="#e4dacb" />
        </radialGradient>
        <linearGradient id="cloak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f3ec" />
          <stop offset="60%" stopColor="#efe8dc" />
          <stop offset="100%" stopColor="#e0d6c5" />
        </linearGradient>
        <radialGradient id="face" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#f4e8d6" />
          <stop offset="100%" stopColor="#e7d5bc" />
        </radialGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* contact shadow */}
      <ellipse cx="240" cy="600" rx="120" ry="16" fill="#8a7f6b" opacity="0.2" filter="url(#shadow)" />

      {/* feet */}
      <rect x="206" y="556" width="30" height="34" rx="12" fill="#cabfa9" />
      <rect x="246" y="556" width="30" height="34" rx="12" fill="#cabfa9" />

      {/* cloak / body */}
      <g className="robot-bounce">
        <path
          d="M176 300 C150 312 140 356 134 408 L118 520 Q113 562 158 562 L324 562 Q369 562 364 520 L348 408 C342 356 332 312 306 300 Z"
          fill="url(#cloak)"
          stroke="#ddd2c0"
          strokeWidth="2"
        />
        {/* soft fold shadows */}
        <path d="M205 322 C196 380 194 460 206 556" fill="none" stroke="#d9cdb9" strokeWidth="6" opacity="0.5" strokeLinecap="round" />
        <path d="M278 322 C287 380 289 460 276 556" fill="none" stroke="#d9cdb9" strokeWidth="6" opacity="0.5" strokeLinecap="round" />
        {/* tiny brand button */}
        <circle cx="241" cy="430" r="7" fill="#f26a1b" opacity="0.85" />

        {/* head — leans gently toward the cursor */}
        <g ref={headRef}>
          {/* face (revealed inside the hood opening) */}
          <rect x="176" y="150" width="128" height="182" rx="58" fill="url(#face)" />
          {/* overhang shadow at the top of the face */}
          <ellipse cx="240" cy="178" rx="64" ry="26" fill="#b89b78" opacity="0.18" filter="url(#soft)" />

          {/* hood */}
          <ellipse cx="240" cy="188" rx="150" ry="152" fill="url(#hood)" stroke="#ddd2c0" strokeWidth="2" />
          {/* re-reveal the face opening on top of the hood */}
          <path
            d="M182 196 C182 300 196 330 240 330 C284 330 298 300 298 196 C298 150 176 150 182 196 Z"
            fill="url(#face)"
          />
          <ellipse cx="240" cy="176" rx="60" ry="24" fill="#b89b78" opacity="0.16" filter="url(#soft)" />
          {/* hood top gloss */}
          <ellipse cx="196" cy="128" rx="78" ry="40" fill="#ffffff" opacity="0.6" filter="url(#soft)" />

          {/* blush */}
          <ellipse cx="202" cy="276" rx="17" ry="9" fill="#f0a877" opacity="0.4" />
          <ellipse cx="278" cy="276" rx="17" ry="9" fill="#f0a877" opacity="0.4" />

          {/* eyes — track the cursor */}
          {EYES.map((eye, i) => (
            <g key={i} ref={pupilRefs[i]}>
              <ellipse cx={eye.cx} cy={eye.cy} rx="13" ry="25" fill="#1c1c1c" />
              <circle cx={eye.cx - 4} cy={eye.cy - 9} r="4" fill="#ffffff" opacity="0.9" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
