"use client";

import { FormEvent, useState } from "react";

export function StudioLogin() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/studio/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;

        throw new Error(payload?.message ?? "Login failed.");
      }

      window.location.reload();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-24 sm:px-6 lg:px-8">
      <div className="panel-glow p-6 sm:p-8">
        <p className="eyebrow mb-2">Hidden Studio</p>
        <h1 className="font-display text-4xl text-white">Password-protected content editor</h1>
        <p className="mt-4 text-base leading-8 text-white/68">
          This hidden route lets you update the site content from a phone or laptop, then saves the change back to GitHub so Vercel can redeploy the live site.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm uppercase tracking-[0.16em] text-white/55">Studio password</span>
            <input
              autoComplete="current-password"
              className="min-h-12 rounded-[1rem] border border-white/10 bg-[rgba(7,11,18,0.9)] px-4 text-white outline-none transition focus:border-cyan-300/45"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button className="cta-primary justify-center" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Unlocking..." : "Open Studio"}
          </button>
        </form>
      </div>
    </div>
  );
}
