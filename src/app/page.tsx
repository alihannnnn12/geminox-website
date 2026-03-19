import Image from "next/image";

import { ButtonLink } from "@/components/button-link";
import { GalleryGrid } from "@/components/gallery-grid";
import { ListenDropdown } from "@/components/listen-dropdown";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { ShowsPanel } from "@/components/shows-panel";
import { galleryItems } from "@/data/gallery";
import { shows } from "@/data/shows";
import { siteConfig, socials } from "@/data/site";

export default function HomePage() {
  const socialPlatforms = socials.filter((item) =>
    ["Instagram", "TikTok", "YouTube"].includes(item.label)
  );
  const musicPlatforms = socials.filter((item) =>
    ["Spotify", "Apple Music", "SoundCloud", "Beatport"].includes(item.label)
  );
  const listenServices = [
    ...siteConfig.streamingProfiles
      .filter((profile) => !profile.isPlaceholder)
      .map((profile) => ({
        href: profile.value,
        label: profile.label,
        note: profile.label === "Spotify" ? "Artist page" : "Open profile"
      })),
    {
      href: siteConfig.latestVideo.url,
      label: "YouTube",
      note: "Latest video"
    }
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(53,161,255,0.3),_transparent_30%),radial-gradient(circle_at_75%_20%,_rgba(16,63,110,0.4),_transparent_20%),linear-gradient(180deg,_rgba(6,10,15,0.46),_rgba(4,8,14,0.92))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,0.66fr)] lg:px-8 lg:pb-24 lg:pt-16">
          <Reveal className="flex flex-col justify-between">
            <div>
              <p className="eyebrow">{siteConfig.hero.kicker}</p>
              <h1 className="hero-title max-w-4xl text-balance">{siteConfig.hero.title}</h1>
              <p className="section-copy mt-6 max-w-2xl text-lg">{siteConfig.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ListenDropdown buttonLabel={siteConfig.hero.primaryCta.label} items={listenServices} />
                <ButtonLink href={siteConfig.hero.secondaryCta.href} variant="secondary">
                  {siteConfig.hero.secondaryCta.label}
                </ButtonLink>
                <ButtonLink href={siteConfig.hero.tertiaryCta.href} variant="ghost">
                  {siteConfig.hero.tertiaryCta.label}
                </ButtonLink>
              </div>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="panel-glow p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Base</p>
                <p className="mt-3 text-xl text-white">{siteConfig.location}</p>
              </div>
              <div className="panel-glow p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Genre</p>
                <p className="mt-3 text-xl text-white">{siteConfig.genre}</p>
              </div>
              <div className="panel-glow p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Booking</p>
                <p className="mt-3 text-xl text-white">Open</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="relative" delay={0.1}>
            <div className="panel-glow relative min-h-[560px] overflow-hidden p-4 sm:p-5">
              <div className="relative h-full min-h-[520px] overflow-hidden rounded-[1.55rem]">
                <Image
                  alt="Geminox behind the decks"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src="/assets/brand/geminox-mark.jpg"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,8,13,0.18),_rgba(5,8,13,0.82))]" />
              </div>
              <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/10 bg-[rgba(6,10,16,0.78)] p-5 backdrop-blur-md">
                <p className="eyebrow mb-2">{siteConfig.hero.announcement.label}</p>
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="font-display text-4xl text-white">{siteConfig.hero.announcement.title}</h2>
                    <p className="mt-3 max-w-xl text-base leading-7 text-white/68">{siteConfig.hero.announcement.copy}</p>
                  </div>
                  <ButtonLink href={siteConfig.spotifyPlaylist.url} variant="secondary">
                    Open Spotify
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionShell
        id="listen"
        description={siteConfig.latestVideo.description}
        eyebrow="Listen"
        title="Latest video and playlist in one place."
      >
        <Reveal>
          <div className="panel-glow p-6">
            <div>
              <p className="eyebrow mb-2">Video + Playlist</p>
              <h3 className="font-display text-4xl text-white">Latest Geminox visual up front, with the playlist lined up right after it.</h3>
              <p className="mt-4 text-base leading-8 text-white/68">
                Start with the newest video, then move straight into the Spotify playlist for the wider Geminox lane.
              </p>
              <div className="mt-6 grid gap-6">
                <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[rgba(7,11,18,0.7)]">
                  <div className="aspect-video w-full">
                    <iframe
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                      loading="lazy"
                      src={siteConfig.latestVideo.embedUrl}
                      title={siteConfig.latestVideo.embedTitle}
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[rgba(7,11,18,0.7)]">
                  <iframe
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="h-[352px] w-full"
                    loading="lazy"
                    src={siteConfig.spotifyPlaylist.embedUrl}
                    title={siteConfig.spotifyPlaylist.embedTitle}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.latestVideo.url}>Watch on YouTube</ButtonLink>
              <ButtonLink href={siteConfig.spotifyPlaylist.url} variant="ghost">
                Open Spotify Playlist
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Tour Preview</p>
            <p className="section-copy mt-4">Upcoming dates, new room announcements, and the next Geminox appearances as they lock in.</p>
          </div>
          <Reveal>
            <ShowsPanel shows={shows} />
          </Reveal>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Gallery</p>
            <p className="section-copy mt-4">Still frames, live moments, and the darker visual side of the Geminox world.</p>
          </div>
          <Reveal>
            <GalleryGrid items={galleryItems.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">About</p>
            <p className="section-copy mt-4">A darker artist statement built around control, restraint, and after-hours tension.</p>
          </div>
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
              <div className="panel-glow p-6 lg:p-8">
                {siteConfig.about.long.map((paragraph) => (
                  <p className="mb-5 text-base leading-8 text-white/70 last:mb-0" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="grid gap-4">
                <div className="panel-glow p-5">
                  <p className="eyebrow mb-2">Location</p>
                  <p className="text-2xl text-white">{siteConfig.location}</p>
                </div>
                <div className="panel-glow p-5">
                  <p className="eyebrow mb-2">Contact</p>
                  <a className="text-2xl text-white" href={`mailto:${siteConfig.bookingEmail}`}>
                    {siteConfig.bookingEmail}
                  </a>
                </div>
                <div className="panel-glow p-5">
                  <p className="eyebrow mb-2">Socials</p>
                  <div className="flex flex-wrap gap-2">
                    {socialPlatforms.map((social) => (
                      <a
                        className="rounded-full border border-white/10 px-4 py-2 text-sm uppercase tracking-[0.12em] text-white/72 transition hover:text-white"
                        href={social.href}
                        key={social.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="panel-glow p-5">
                  <p className="eyebrow mb-2">Music Links</p>
                  <div className="flex flex-wrap gap-2">
                    {musicPlatforms.map((social) => (
                      <a
                        className="rounded-full border border-white/10 px-4 py-2 text-sm uppercase tracking-[0.12em] text-white/72 transition hover:text-white"
                        href={social.href}
                        key={social.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionShell
        description="Get new releases, show announcements, and the strongest Geminox signals before they hit the wider feed."
        eyebrow="Newsletter"
        title="Stay closer to the next release, set, and show drop."
      >
        <Reveal>
          <div id="newsletter">
            <NewsletterForm />
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        description="Clubs, promoters, labels, and collaborators should know exactly where to go next."
        eyebrow="Bookings"
        title="Ready for promoters, support slots, and direct club outreach."
      >
        <Reveal>
          <div className="panel-glow grid gap-6 p-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.3fr)] lg:p-8">
            <div>
              <h3 className="font-display text-4xl text-white">Book Geminox for late-night rooms, direct support, and curated club sets.</h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">{siteConfig.contact.promoterCopy}</p>
            </div>
            <div className="flex flex-col gap-3 self-end">
              <ButtonLink href="/contact">Open Contact Page</ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.bookingEmail}`} variant="secondary">
                Email Bookings
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
}
