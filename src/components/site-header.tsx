"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigation, socials } from "@/data/site";

function SocialIcon({ label }: { label: string }) {
  const shared = "h-[18px] w-[18px]";

  switch (label) {
    case "Instagram":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <rect height="15" rx="4.5" stroke="currentColor" strokeWidth="1.8" width="15" x="4.5" y="4.5" />
          <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.25" cy="6.75" fill="currentColor" r="1.1" />
        </svg>
      );
    case "TikTok":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <path
            d="M14 4c.5 2 2.2 3.6 4.3 4v3.1a7.8 7.8 0 0 1-4.3-1.4v5.2a5.4 5.4 0 1 1-5.4-5.4c.4 0 .8 0 1.2.1v3.1a2.4 2.4 0 1 0 1.2 2.1V4H14Z"
            fill="currentColor"
          />
        </svg>
      );
    case "YouTube":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <path
            d="M20.5 8.2a3 3 0 0 0-2.1-2.1C16.5 5.5 12 5.5 12 5.5s-4.5 0-6.4.6a3 3 0 0 0-2.1 2.1C3 10 3 12 3 12s0 2 .5 3.9a3 3 0 0 0 2.1 2.1c1.9.5 6.4.5 6.4.5s4.5 0 6.4-.5a3 3 0 0 0 2.1-2.1C21 14 21 12 21 12s0-2-.5-3.8Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="m10.3 9.3 4.5 2.7-4.5 2.7V9.3Z" fill="currentColor" />
        </svg>
      );
    case "Bookings":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <path
            d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="m5.2 7 6.1 5.1a1.1 1.1 0 0 0 1.4 0L18.8 7" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    default:
      return null;
  }
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const emailLink = socials.find((item) => item.href.startsWith("mailto:"));
  const socialLinks = socials.filter((item) => !item.href.startsWith("mailto:"));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(4,8,15,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link className="font-display text-2xl font-semibold tracking-[0.22em] text-white" href="/">
          GEMINOX
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                className={`text-sm uppercase tracking-[0.18em] transition ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {socialLinks.map((social) => (
            <a
              aria-label={social.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition hover:border-cyan-300/45 hover:text-cyan-100"
              href={social.href}
              key={social.href}
              rel="noreferrer"
              target="_blank"
              title={social.label}
            >
              <SocialIcon label={social.label} />
            </a>
          ))}
          {emailLink ? <div className="mx-1 h-6 w-px bg-white/10" /> : null}
          {emailLink ? (
            <a
              aria-label={emailLink.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition hover:border-cyan-300/45 hover:text-cyan-100"
              href={emailLink.href}
              title={emailLink.label}
            >
              <SocialIcon label={emailLink.label} />
            </a>
          ) : null}
        </div>
        <button
          aria-expanded={open}
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span className="space-y-1">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[rgba(4,8,15,0.96)] md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-6">
            {navigation.map((item) => (
              <Link
                className="border-b border-white/8 py-3 text-sm uppercase tracking-[0.18em] text-white/80"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition hover:border-cyan-300/45 hover:text-cyan-100"
                  href={social.href}
                  key={social.href}
                  rel="noreferrer"
                  target="_blank"
                  title={social.label}
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
              {emailLink ? <div className="mx-1 h-6 w-px bg-white/10" /> : null}
              {emailLink ? (
                <a
                  aria-label={emailLink.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition hover:border-cyan-300/45 hover:text-cyan-100"
                  href={emailLink.href}
                  title={emailLink.label}
                >
                  <SocialIcon label={emailLink.label} />
                </a>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
