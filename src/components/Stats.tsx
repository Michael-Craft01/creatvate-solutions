"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

// Split a value like "24h" / "100%" / "4" into number + suffix for the count-up.
function parse(value: string) {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return { target: null as number | null, prefix: value, suffix: "" };
  return { target: parseInt(m[1], 10), prefix: "", suffix: m[2] };
}

export default function Stats() {
  const ref = useRef<HTMLDListElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <dl ref={ref} className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col text-center">
          <dt className="order-2 mt-1 text-sm text-stone-500">{s.label}</dt>
          <dd className="font-display text-4xl font-extrabold text-navy-900 md:text-5xl">
            <Counter value={s.value} run={run} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Counter({ value, run }: { value: string; run: boolean }) {
  const { target, prefix, suffix } = parse(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  if (target === null) return <>{prefix}</>;
  return (
    <>
      {prefix}
      {n}
      {suffix}
    </>
  );
}
