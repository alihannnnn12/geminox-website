"use client";

import { FormEvent, useState, useTransition } from "react";

type StatusState = {
  message: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<StatusState>({
    message: "Share the date, city, venue, and set details, and Geminox will follow up from the booking inbox."
  });
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message")
        })
      });

      const data = (await response.json()) as { message: string };
      setStatus({ message: data.message });
      form.reset();
    });
  }

  return (
    <form className="panel-glow grid gap-5 p-6" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm uppercase tracking-[0.16em] text-white/55" htmlFor="contact-name">
          Name
        </label>
        <input className="form-input" id="contact-name" name="name" placeholder="Your name" required type="text" />
      </div>
      <div>
        <label className="mb-2 block text-sm uppercase tracking-[0.16em] text-white/55" htmlFor="contact-email">
          Email
        </label>
        <input className="form-input" id="contact-email" name="email" placeholder="you@domain.com" required type="email" />
      </div>
      <div>
        <label className="mb-2 block text-sm uppercase tracking-[0.16em] text-white/55" htmlFor="contact-message">
          Message
        </label>
        <textarea
          className="form-input min-h-36 resize-y"
          id="contact-message"
          name="message"
          placeholder="Tell us about the venue, date, city, and set time."
          required
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className="cta-primary" disabled={isPending} type="submit">
          {isPending ? "Sending..." : "Send Inquiry"}
        </button>
        <p className="text-sm text-cyan-100/80">{status.message}</p>
      </div>
    </form>
  );
}
