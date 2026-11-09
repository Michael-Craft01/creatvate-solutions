import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/Sections";

export const metadata = pageMetadata({
  title: "Contact Us: Book a Free Consultation",
  description:
    "Contact CreatVate Solutions to book a free consultation. Call, email or send us a message and our consultants will respond within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const address = `${contact.address.street}, ${contact.address.city}, ${contact.address.country}`;
  const items = [
    { icon: "phone" as const, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    ...(contact.whatsapp
      ? [{ icon: "chat" as const, label: "WhatsApp", value: "WhatsApp us", href: `https://wa.me/${contact.whatsapp}` }]
      : []),
    { icon: "pin" as const, label: "Office", value: address },
    { icon: "clock" as const, label: "Hours", value: contact.hours },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
          { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact CreatVate Solutions", url: `${siteConfig.url}/contact` },
        ]}
      />
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your goals"
        description="Book a free, no-obligation consultation. Tell us a little about your project and we'll get back to you within 24 hours."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <p className="mt-3 text-stone-600">Prefer to talk? Reach us directly using the details below.</p>
            <ul className="mt-8 space-y-5">
              {items.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-stone-600 hover:text-brand-700">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-stone-600">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {contact.whatsapp && (
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-dark mt-8">
                Chat on WhatsApp
              </a>
            )}
            <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200">
              <iframe
                title={`Map showing ${siteConfig.name} office`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-navy-900/5 md:p-10">
            <h2 className="text-2xl font-bold">Request a free consultation</h2>
            <p className="mt-2 text-stone-600">Fields marked * are required.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
