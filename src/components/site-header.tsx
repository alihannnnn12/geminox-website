"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigation } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        <div className="hidden md:block">
          <Link className="cta-secondary" href="/contact">
            Book Geminox
          </Link>
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
            <Link className="cta-primary mt-4 text-center" href="/contact">
              Book Geminox
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
