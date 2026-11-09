import { NextResponse } from "next/server";

// Receives contact-form submissions and forwards them to Web3Forms (free),
// which emails them to you. To enable delivery:
//   1. Get a free access key at https://web3forms.com (enter your email).
//   2. Set WEB3FORMS_ACCESS_KEY in your environment (e.g. in Vercel project settings).
// Without the key, submissions are validated and logged but not delivered.

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without processing them.
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name || "").trim().slice(0, 200);
  const email = (body.email || "").trim().slice(0, 200);
  const message = (body.message || "").trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const enquiry = {
    name,
    email,
    phone: (body.phone || "").trim().slice(0, 60),
    company: (body.company || "").trim().slice(0, 200),
    service: (body.service || "").trim().slice(0, 200),
    message,
  };

  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `New website enquiry from ${enquiry.name}`,
          from_name: "CreatVate Solutions website",
          replyto: enquiry.email,
          ...enquiry,
        }),
      });
      if (!res.ok) {
        console.error("[contact] Web3Forms responded", res.status);
        return NextResponse.json({ error: "Could not send right now. Please try again or email us directly." }, { status: 502 });
      }
    } catch (err) {
      console.error("[contact] Web3Forms error", err);
      return NextResponse.json({ error: "Could not send right now. Please try again or email us directly." }, { status: 502 });
    }
  } else {
    // No provider configured yet — log so nothing is lost during setup.
    console.log("[contact] New enquiry (no WEB3FORMS_ACCESS_KEY set)", enquiry);
  }

  return NextResponse.json({ ok: true });
}
