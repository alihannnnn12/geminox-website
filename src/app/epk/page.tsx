import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { featureFlags, siteConfig, socials } from "@/data/site";

export default function EpkPage() {
  if (!featureFlags.epk) {
    notFound();
  }

  return (
    <>
      <PageHero
        description="A promoter-friendly EPK with quick facts, short bio, streaming links, an embedded mix, and downloadable support assets."
        eyebrow="EPK / Press"
        title="A cleaner one-stop page for promoters and press."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Quick Contact</p>
          <a className="text-xl text-white" href={`mailto:${siteConfig.bookingEmail}`}>
            {siteConfig.bookingEmail}
          </a>
        </div>
      </PageHero>

      <SectionShell
        description="Every block is arranged for fast promoter scanning and a clear first read."
        eyebrow="Facts"
        title="Fast details up front."
      >
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.epk.facts.map((fact) => (
              <div className="panel-glow p-5" key={fact.label}>
                <p className="eyebrow mb-2">{fact.label}</p>
                <p className="text-xl text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        description="A short-form bio that quickly frames the project voice, sound, and booking lane."
        eyebrow="Short Bio"
        title="Concise, elevated positioning."
      >
        <Reveal>
          <div className="panel-glow p-6 lg:p-8">
            {siteConfig.about.long.map((paragraph) => (
              <p className="mb-5 max-w-4xl text-base leading-8 text-white/70 last:mb-0" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        description="Keep every key profile in one place so promoters, bookers, and press can scan quickly."
        eyebrow="Streaming Links"
        title="Streaming profiles at a glance."
      >
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.streamingProfiles.map((profile) => (
              <div className="panel-glow p-5" key={profile.label}>
                <p className="eyebrow mb-2">{profile.label}</p>
                <p className="text-base leading-8 text-white/68">{profile.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        description="The featured mix is embedded directly so promoters can listen without leaving the EPK."
        eyebrow="Embedded Mix"
        title="One click from interest to playback."
      >
        <Reveal>
          <div className="panel-glow overflow-hidden">
            <div className="relative aspect-video">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
                src="https://www.youtube.com/embed/gMijFXfiig0"
                title="Geminox EPK featured mix"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        description="Keep logos, press imagery, rider notes, and support files ready for promoters and media teams."
        eyebrow="Downloads"
        title="Downloadable press assets."
      >
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="panel-glow p-5">
              <p className="eyebrow mb-2">Logo Asset</p>
              <ButtonLink href="/assets/releases/no-fakers.jpg" variant="secondary">
                Download JPG
              </ButtonLink>
            </div>
            <div className="panel-glow p-5">
              <p className="eyebrow mb-2">Press Photos</p>
              <ButtonLink href="/downloads/press-photos-placeholder.txt" variant="secondary">
                Download File
              </ButtonLink>
            </div>
            <div className="panel-glow p-5">
              <p className="eyebrow mb-2">Tech Rider</p>
              <ButtonLink href="/downloads/tech-rider-placeholder.txt" variant="secondary">
                Download File
              </ButtonLink>
            </div>
            <div className="panel-glow p-5">
              <p className="eyebrow mb-2">EPK Notes</p>
              <ButtonLink href="/downloads/epk-readme.txt" variant="secondary">
                Download Notes
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        description="Social channels and booking contact stay visible at the bottom of the press page too."
        eyebrow="Social + Contact"
        title="Keep the handoff simple."
      >
        <Reveal>
          <div className="panel-glow flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  className="rounded-full border border-white/10 px-4 py-2 text-sm uppercase tracking-[0.12em] text-white/70 hover:text-white"
                  href={social.href}
                  key={social.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <ButtonLink href={`mailto:${siteConfig.bookingEmail}`}>Email Bookings</ButtonLink>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
}
