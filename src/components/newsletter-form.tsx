"use client";

import { FormEvent, useState, useTransition } from "react";

type FormStatus = {
  tone: "idle" | "success" | "error";
  message: string;
};

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>({
    tone: "idle",
    message: "No spam. Just new music, select show updates, and the strongest Geminox signals."
  });
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");

    startTransition(async () => {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        const data = (await response.json()) as { message: string };

        if (!response.ok) {
          setStatus({ tone: "error", message: data.message });
          return;
        }

        setStatus({ tone: "success", message: data.message });
        form.reset();
      } catch {
        setStatus({
          tone: "error",
          message: "The signup request failed. Try again in a moment."
        });
      }
    });
  }

  return (
    <form className="panel-glow grid gap-4 p-6 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm uppercase tracking-[0.16em] text-white/55" htmlFor="newsletter-email">
          Email Address
        </label>
        <input
          className="form-input"
          id="newsletter-email"
          name="email"
          placeholder="you@domain.com"
          required
          type="email"
        />
      </div>
      <div className="flex items-end">
        <button className="cta-primary w-full sm:w-auto" disabled={isPending} type="submit">
          {isPending ? "Saving..." : "Join Newsletter"}
        </button>
      </div>
      <p className={`sm:col-span-2 text-sm ${status.tone === "error" ? "text-rose-200/90" : "text-cyan-100/80"}`}>
        {status.message}
      </p>
    </form>
  );
}
