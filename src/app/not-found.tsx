import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-32 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-500">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-stone-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-dark">Back to home</Link>
        <Link href="/contact" className="btn border border-stone-300 text-navy-900 hover:bg-stone-50">Contact us</Link>
      </div>
    </section>
  );
}
