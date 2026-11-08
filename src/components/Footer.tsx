import Link from "next/link";
import { navLinks, services, siteConfig } from "@/lib/site";
import Logo from "./Logo";
import Icon from "./Icon";

export default function Footer() {
  const { contact, social } = siteConfig;
  const socials = Object.entries(social).filter(([, url]) => url);
  return (
    <footer className="bg-navy-950 text-stone-400">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed">{siteConfig.description}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 text-xs capitalize hover:border-brand-400 hover:text-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-brand-300">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-300">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-brand-300">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="flex gap-3">
              <Icon name="pin" className="h-5 w-5 shrink-0 text-brand-400" />
              <span>
                {contact.address.street}, {contact.address.city}, {contact.address.country}
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="phone" className="h-5 w-5 shrink-0 text-brand-400" />
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {contact.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Icon name="mail" className="h-5 w-5 shrink-0 text-brand-400" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Icon name="clock" className="h-5 w-5 shrink-0 text-brand-400" />
              <span>{contact.hours}</span>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}.</p>
        </div>
      </div>
    </footer>
  );
}
