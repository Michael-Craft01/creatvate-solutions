"use client";

import { useEffect, useRef } from "react";

/**
 * A fixed, full-page decorative layer that sits behind all content.
 * Soft brand-coloured orbs gently drift, and parallax as the page scrolls.
 * Low opacity keeps text readable; it respects prefers-reduced-motion.
 */
export default function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const orbs = Array.from(el.querySelectorAll<HTMLElement>("[data-speed]"));
    let raf = 0;
    let cur = 0;
    let target = window.scrollY;

    const onScroll = () => {
      target = window.scrollY;
    };
    const loop = () => {
      cur += (target - cur) * 0.1;
      for (const o of orbs) {
        const s = parseFloat(o.dataset.speed || "0");
        o.style.transform = `translate3d(0, ${(-cur * s).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* faint dotted grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(20,20,20,0.06) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* drifting orbs (parallax wrappers + animated inner) */}
      <div data-speed="0.12" className="absolute -left-24 top-[8%] h-72 w-72 will-change-transform">
        <div className="orb-drift h-full w-full rounded-full bg-brand-400/35 blur-3xl" />
      </div>
      <div data-speed="0.26" className="absolute -right-20 top-[26%] h-[26rem] w-[26rem] will-change-transform">
        <div className="orb-drift h-full w-full rounded-full bg-brand-500/25 blur-[90px]" style={{ animationDuration: "24s", animationDelay: "-6s" }} />
      </div>
      <div data-speed="0.18" className="absolute left-[16%] top-[56%] h-80 w-80 will-change-transform">
        <div className="orb-drift h-full w-full rounded-full bg-accent-400/22 blur-[90px]" style={{ animationDuration: "26s", animationDelay: "-3s" }} />
      </div>
      <div data-speed="0.34" className="absolute right-[12%] top-[80%] h-80 w-80 will-change-transform">
        <div className="orb-drift h-full w-full rounded-full bg-brand-300/30 blur-3xl" style={{ animationDuration: "22s", animationDelay: "-10s" }} />
      </div>
      <div data-speed="0.22" className="absolute left-[-40px] top-[118%] h-80 w-80 will-change-transform">
        <div className="orb-drift h-full w-full rounded-full bg-brand-500/20 blur-[90px]" style={{ animationDuration: "28s" }} />
      </div>
      <div data-speed="0.3" className="absolute right-[30%] top-[150%] h-72 w-72 will-change-transform">
        <div className="orb-drift h-full w-full rounded-full bg-accent-400/20 blur-3xl" style={{ animationDuration: "25s", animationDelay: "-8s" }} />
      </div>
    </div>
  );
}
