"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    case "Spotify":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 10.1c2.7-1 5.7-.8 8.4.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          <path d="M8.8 13c2.1-.7 4.4-.5 6.3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M9.6 15.8c1.5-.4 3-.3 4.3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
        </svg>
      );
    case "Apple Music":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <path
            d="M14.5 6.2v8a2.7 2.7 0 1 1-1.7-2.5V8.3l5-1.1v6.1a2.7 2.7 0 1 1-1.7-2.5V5.4l-1.6.8Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "SoundCloud":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <path
            d="M8.4 15.9H19a2.5 2.5 0 0 0 .3-5 4.6 4.6 0 0 0-8.7-1.7 3.5 3.5 0 0 0-2.2-.2v6.9Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
          <path d="M5 10.4v5.5M6.7 9.8v6.1M3.3 11.4v4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
        </svg>
      );
    case "Beatport":
      return (
        <svg aria-hidden="true" className={shared} fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M10.2 8.6v7.1a2 2 0 1 1-1.4-1.9V9.8l5.4-1.2v5.7a2 2 0 1 1-1.4-1.9V7.7l-2.6.9Z" fill="currentColor" />
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
          <span className="relative block h-5 w-5">
            <span
              className={`absolute left-1/2 top-[5px] block h-px w-4 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ease-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-[5px] left-1/2 block h-px w-4 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "bottom-auto top-1/2 -translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(4,8,15,0.98)_0%,rgba(4,8,15,0.92)_100%)] md:hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.nav
              animate="open"
              aria-label="Mobile"
              className="mx-auto max-w-7xl px-5 py-4 sm:px-6"
              initial="closed"
              variants={{
                closed: {},
                open: {
                  transition: {
                    staggerChildren: 0.07,
                    delayChildren: 0.08
                  }
                }
              }}
            >
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="mb-3 px-3 pt-1">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/60">Navigate</p>
                </div>
                <div className="flex flex-col">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.href}
                      variants={{
                        closed: { opacity: 0, y: -10, filter: "blur(8px)" },
                        open: { opacity: 1, y: 0, filter: "blur(0px)" }
                      }}
                    >
                      <Link
                        className="block border-b border-white/8 px-3 py-3.5 text-sm uppercase tracking-[0.18em] text-white/82 transition hover:text-white"
                        href={item.href}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="mt-4 flex items-center gap-2 px-3 pb-1"
                  variants={{
                    closed: { opacity: 0, y: 10 },
                    open: { opacity: 1, y: 0 }
                  }}
                >
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
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
