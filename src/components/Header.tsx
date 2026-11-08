"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import Logo from "./Logo";
import Icon from "./Icon";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled ? "border-stone-200 bg-white/90 shadow-sm backdrop-blur" : "border-transparent bg-white"
      }`}
    >
      <nav className="container-x flex h-18 items-center justify-between py-4" aria-label="Main navigation">
        <Link href="/" aria-label="CreatVate Solutions home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href) ? "bg-brand-50 text-brand-700" : "text-stone-600 hover:text-navy-900"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-dark">
            Free consultation
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-navy-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-stone-200 bg-white md:hidden">
          <ul className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(l.href) ? "bg-brand-50 text-brand-700" : "text-stone-700"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/contact" className="btn-dark w-full">
                Free consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
