import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne"
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${manrope.variable} ${syne.variable}`} data-scroll-behavior="smooth" lang="en">
      <body>
        <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
