"use client";

import { useState } from "react";
import { services, siteConfig } from "@/lib/site";
import Icon from "./Icon";

type FieldType = "text" | "email" | "tel" | "textarea" | "select";
type Step = {
  name: string;
  type: FieldType;
  label: string;
  hint: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
};

const steps: Step[] = [
  { name: "name", type: "text", label: "What's your name?", hint: "So we know who we're talking to.", placeholder: "Jane Doe", required: true, autoComplete: "name" },
  { name: "email", type: "email", label: "What's your email?", hint: "Optional — so we can follow up if needed.", placeholder: "jane@company.com", autoComplete: "email" },
  { name: "phone", type: "tel", label: "Your phone number?", hint: "Optional — handy if you'd prefer a call or WhatsApp.", placeholder: "+263 ...", autoComplete: "tel" },
  { name: "company", type: "text", label: "Your company?", hint: "Optional — tell us where you work.", placeholder: "Company name", autoComplete: "organization" },
  { name: "service", type: "select", label: "What can we help with?", hint: "Pick the area closest to your needs." },
  { name: "message", type: "textarea", label: "Tell us about your project", hint: "Your goals, challenges and timeline — whatever helps us help you.", placeholder: "We'd like to...", required: true },
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const setVal = (v: string) => setValues((p) => ({ ...p, [current.name]: v }));

  function validate() {
    const v = (values[current.name] || "").trim();
    if (current.required && !v) return `Please fill in this field.`;
    if (current.type === "email" && v && !isEmail(v)) return "Please enter a valid email address.";
    return "";
  }

  function next() {
    const err = validate();
    if (err) return setError(err);
    setError("");
    if (!isLast) setStep((s) => s + 1);
  }

  // Pick an option card and glide to the next question.
  function choose(val: string) {
    setValues((p) => ({ ...p, [current.name]: val }));
    setError("");
    window.setTimeout(() => setStep((s) => (s < steps.length - 1 ? s + 1 : s)), 240);
  }

  function back() {
    setError("");
    if (step > 0) setStep((s) => s - 1);
  }

  function submit() {
    const err = validate();
    if (err) return setError(err);

    // Send the enquiry straight to our WhatsApp as a pre-filled message.
    const lines = [
      "Hi CreatVate, I'd like to get in touch.",
      "",
      `Name: ${values.name || "-"}`,
      values.email ? `Email: ${values.email}` : "",
      values.phone ? `Phone: ${values.phone}` : "",
      values.company ? `Company: ${values.company}` : "",
      `Interested in: ${values.service || "Not sure yet"}`,
      "",
      values.message || "",
    ].filter(Boolean);

    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("success");
    setMessage("WhatsApp is opening with your message — just tap send to reach us.");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && current.type !== "textarea") {
      e.preventDefault();
      isLast ? submit() : next();
    }
  }

  const field =
    "mt-3 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-base text-navy-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

  if (status === "success") {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center py-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white">
          <Icon name="chat" className="h-8 w-8" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Opening WhatsApp…</h3>
        <p className="mt-2 max-w-sm text-stone-600">{message}</p>
        {siteConfig.contact.whatsapp && (
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            Open WhatsApp manually <Icon name="arrow" className="h-4 w-4" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col">
      {/* progress */}
      <div className="flex items-center justify-between text-xs font-medium text-stone-500">
        <span>
          Question {step + 1} of {steps.length}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-stone-200">
        <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* the card for the current question */}
      <div key={step} className="step-enter mt-5" onKeyDown={onKeyDown}>
        <label htmlFor={current.name} className="font-display text-lg font-bold text-navy-900">
          {current.label} {current.required && <span className="text-brand-500">*</span>}
        </label>
        <p className="mt-1 text-sm text-stone-500">{current.hint}</p>

        {current.type === "textarea" ? (
          <textarea
            id={current.name}
            name={current.name}
            rows={4}
            autoFocus
            value={values[current.name] || ""}
            onChange={(e) => setVal(e.target.value)}
            placeholder={current.placeholder}
            className={field}
          />
        ) : current.type === "select" ? (
          <div role="radiogroup" aria-label={current.label} className="mt-3 grid gap-2">
            {[{ title: "Not sure yet", icon: "spark" as const }, ...services].map((opt) => {
              const selected = (values[current.name] || "") === opt.title;
              return (
                <button
                  type="button"
                  key={opt.title}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => choose(opt.title)}
                  className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                    selected
                      ? "border-brand-500 bg-brand-50 shadow-sm"
                      : "border-stone-200 bg-white hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      selected ? "bg-brand-500 text-white" : "bg-stone-100 text-navy-900 group-hover:bg-navy-900 group-hover:text-white"
                    }`}
                  >
                    <Icon name={opt.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-semibold text-navy-900">{opt.title}</span>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      selected ? "border-brand-500 bg-brand-500 text-white" : "border-stone-300"
                    }`}
                  >
                    {selected && <Icon name="check" className="h-3 w-3" />}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <input
            id={current.name}
            name={current.name}
            type={current.type}
            autoFocus
            autoComplete={current.autoComplete}
            value={values[current.name] || ""}
            onChange={(e) => setVal(e.target.value)}
            placeholder={current.placeholder}
            className={field}
          />
        )}

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      {/* controls */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-stone-500 transition-colors hover:text-navy-900 disabled:invisible"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back
        </button>

        {isLast ? (
          <button type="button" onClick={submit} className="btn-primary">
            Send on WhatsApp <Icon name="chat" className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" onClick={next} className="btn-dark">
            Next <Icon name="arrow" className="h-4 w-4" />
          </button>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {message}
        </p>
      )}
      <p className="mt-3 hidden text-center text-xs text-stone-400 sm:block">Press Enter ↵ to continue</p>
    </div>
  );
}
