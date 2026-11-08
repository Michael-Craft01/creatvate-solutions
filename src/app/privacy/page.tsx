import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { PageHero } from "@/components/Sections";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How CreatVate Solutions collects, uses and protects your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Your privacy matters to us." crumbs={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <section className="py-16 md:py-20">
        <div className="container-x max-w-3xl space-y-6 leading-relaxed text-stone-600 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold">
          <p>
            This policy explains how {siteConfig.legalName} (&quot;we&quot;, &quot;us&quot;) collects and uses information when you visit our website or contact us. {/* TODO: have this reviewed for your jurisdiction */}
          </p>
          <h2>Information we collect</h2>
          <p>When you submit our contact form we collect your name, email address, phone number, company name and message. We may also collect anonymous usage data (such as pages visited) through analytics tools.</p>
          <h2>How we use it</h2>
          <p>We use your information only to respond to your enquiry, provide our services, and improve our website. We never sell your personal data.</p>
          <h2>Data retention and security</h2>
          <p>We keep your information only as long as necessary and protect it using appropriate technical and organisational measures.</p>
          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data at any time by emailing{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-700 underline">{siteConfig.contact.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
