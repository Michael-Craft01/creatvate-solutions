"use client";

import { useState } from "react";
import { services } from "@/lib/site";
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
  { name: "email", type: "email", label: "What's your email?", hint: "We'll reply here within 24 hours.", placeholder: "jane@company.com", required: true, autoComplete: "email" },
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

  async function submit() {
    const err = validate();
    if (err) return setError(err);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setMessage("Thank you! Your message is on its way. We'll be in touch within 24 hours.");
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && current.type !== "textarea") {
      e.preventDefault();
      isLast ? submit() : next();
    }
  }

  const field =
    "mt-4 w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-lg text-navy-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

  if (status === "success") {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Message sent!</h3>
        <p className="mt-2 max-w-sm text-stone-600">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[380px] flex-col">
      {/* progress */}
      <div className="flex items-center justify-between text-sm font-medium text-stone-500">
        <span>
          Question {step + 1} of {steps.length}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
        <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* the card for the current question */}
      <div key={step} className="step-enter mt-8 flex-1" onKeyDown={onKeyDown}>
        <label htmlFor={current.name} className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
          {current.label} {current.required && <span className="text-brand-500">*</span>}
        </label>
        <p className="mt-2 text-stone-500">{current.hint}</p>

        {current.type === "textarea" ? (
          <textarea
            id={current.name}
            name={current.name}
            rows={5}
            autoFocus
            value={values[current.name] || ""}
            onChange={(e) => setVal(e.target.value)}
            placeholder={current.placeholder}
            className={field}
          />
        ) : current.type === "select" ? (
          <div role="radiogroup" aria-label={current.label} className="mt-5 grid gap-3 sm:grid-cols-2">
            {[{ title: "Not sure yet", icon: "spark" as const }, ...services].map((opt) => {
              const selected = (values[current.name] || "") === opt.title;
              return (
                <button
                  type="button"
                  key={opt.title}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => choose(opt.title)}
                  className={`group flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                    selected
                      ? "border-brand-500 bg-brand-50 shadow-sm"
                      : "border-stone-200 bg-white hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
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
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-stone-500 transition-colors hover:text-navy-900 disabled:invisible"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back
        </button>

        {isLast ? (
          <button type="button" onClick={submit} disabled={status === "sending"} className="btn-primary disabled:opacity-60">
            {status === "sending" ? "Sending..." : "Send message"} <Icon name="arrow" className="h-4 w-4" />
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
      <p className="mt-4 text-center text-xs text-stone-400">Press Enter to continue</p>
    </div>
  );
}
