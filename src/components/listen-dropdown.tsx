"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ListenService = {
  label: string;
  href: string;
  note?: string;
};

type ListenDropdownProps = {
  buttonLabel: string;
  items: ListenService[];
};

function ServiceIcon({ label }: { label: string }) {
  const shared = "h-4 w-4";

  switch (label) {
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
            d="M14.9 12.05c-.02-1.86 1.52-2.75 1.59-2.79-.87-1.27-2.23-1.45-2.7-1.47-1.15-.12-2.24.68-2.82.68-.58 0-1.48-.66-2.44-.64-1.26.02-2.42.73-3.06 1.86-1.31 2.27-.33 5.63.94 7.46.62.89 1.36 1.89 2.33 1.85.94-.04 1.29-.6 2.42-.6 1.13 0 1.45.6 2.44.58 1.01-.02 1.65-.91 2.26-1.81.72-1.04 1.01-2.05 1.03-2.11-.02-.01-1.97-.76-1.99-3.01Zm-1.95-5.54c.51-.62.86-1.48.76-2.34-.74.03-1.63.49-2.16 1.1-.47.54-.89 1.41-.78 2.24.83.06 1.67-.42 2.18-1Z"
            fill="currentColor"
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
          <path
            d="M9.2 5.2v6.35a1.65 1.65 0 1 1-1.15-1.58V6.35l5.05-1.15v4.35a2.9 2.9 0 1 1-1.45 0V7.02L9.2 7.58Z"
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
    default:
      return null;
  }
}

export function ListenDropdown({ buttonLabel, items }: ListenDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="cta-primary inline-flex items-center gap-3"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span>{buttonLabel}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            className="absolute left-0 top-full z-30 mt-3 w-[min(21rem,calc(100vw-2.5rem))] overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(7,12,20,0.98),rgba(5,9,16,0.96))] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl"
            exit={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(8px)" }}
            initial={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-2 px-2 pt-1">
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/58">Choose Service</p>
            </div>
            <motion.div
              animate="open"
              className="grid gap-2"
              initial="closed"
              variants={{
                closed: {},
                open: {
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: 0.04
                  }
                }
              }}
            >
              {items.map((item) => (
                <motion.a
                  className="group flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-white/84 transition hover:border-cyan-300/28 hover:bg-cyan-300/[0.05] hover:text-white"
                  href={item.href}
                  key={item.label}
                  onClick={() => setOpen(false)}
                  rel="noreferrer"
                  target="_blank"
                  variants={{
                    closed: { opacity: 0, y: -8, filter: "blur(8px)" },
                    open: { opacity: 1, y: 0, filter: "blur(0px)" }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/74">
                      <ServiceIcon label={item.label} />
                    </span>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.16em]">{item.label}</p>
                      {item.note ? <p className="mt-1 text-xs tracking-[0.12em] text-white/45">{item.note}</p> : null}
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.16em] text-white/45 transition group-hover:text-cyan-100">Open</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
