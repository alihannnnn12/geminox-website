import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { siteConfig } from "@/data/site";

export default function AboutPage() {
  return (
    <>
      <PageHero
        description="Geminox is a Washington DC underground tech house project built for black rooms, warehouse systems, and after-hours movement."
        eyebrow="About"
        title="Dark pressure over spectacle, rolling drums, and late-night control."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">In Short</p>
          <p className="text-base leading-8 text-white/70">
            Washington DC-based. Underground tech house. Built for warehouse systems, intimate dark rooms, and the kind of late-night sets that hold a floor without tipping into excess.
          </p>
        </div>
      </PageHero>

      <SectionShell
        description="The sound, the approach, and what drives the project — in plain language."
        eyebrow="Artist Statement"
        title="Control, pressure, and movement from Washington DC."
      >
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,0.34fr)]">
            <div className="panel-glow p-6 lg:p-8">
              {siteConfig.about.long.map((paragraph) => (
                <p className="mb-5 text-base leading-8 text-white/70 last:mb-0" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid gap-4">
              <div className="panel-glow p-5">
                <p className="eyebrow mb-2">Base</p>
                <p className="text-2xl text-white">{siteConfig.location}</p>
              </div>
              <div className="panel-glow p-5">
                <p className="eyebrow mb-2">Genre</p>
                <p className="text-2xl text-white">{siteConfig.genre}</p>
              </div>
              <div className="panel-glow p-5">
                <p className="eyebrow mb-2">Book</p>
                <a className="text-xl text-white" href={`mailto:${siteConfig.bookingEmail}`}>
                  {siteConfig.bookingEmail}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
}
