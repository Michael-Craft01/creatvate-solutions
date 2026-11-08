import { NextResponse } from "next/server";

// Receives contact-form submissions.
// TODO before launch: connect an email provider (e.g. Resend, SMTP via nodemailer) or a CRM.
// Example with Resend:
//   import { Resend } from "resend";
//   await new Resend(process.env.RESEND_API_KEY).emails.send({ from, to, subject, text });

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

  console.log("[contact] New enquiry", {
    name,
    email,
    phone: body.phone,
    company: body.company,
    service: body.service,
    message,
  });

  return NextResponse.json({ ok: true });
}
