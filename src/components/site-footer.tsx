import Link from "next/link";

import { navigation, siteConfig, socials } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[rgba(5,8,15,0.94)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.9fr] lg:px-8">
        <div>
          <p className="eyebrow">Geminox</p>
          <h2 className="font-display text-3xl text-white">Dark-room pressure, refined for local preview and future rollout.</h2>
          <p className="section-copy mt-4 max-w-xl">{siteConfig.about.short}</p>
        </div>
        <div>
          <h3 className="footer-heading">Navigation</h3>
          <ul className="mt-4 grid gap-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="footer-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Contact + Social</h3>
          <ul className="mt-4 grid gap-3">
            <li>
              <a className="footer-link" href={`mailto:${siteConfig.bookingEmail}`}>
                {siteConfig.bookingEmail}
              </a>
            </li>
            <li className="text-sm uppercase tracking-[0.16em] text-white/45">{siteConfig.location}</li>
            {socials.map((item) => (
              <li key={item.href}>
                <a className="footer-link" href={item.href} rel="noreferrer" target="_blank">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-sm text-white/45 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Geminox. All rights reserved.</p>
          <p>Built for local preview first. Deployment details can be added later.</p>
        </div>
      </div>
    </footer>
  );
}
