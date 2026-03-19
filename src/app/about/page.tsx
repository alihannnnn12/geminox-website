import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { siteConfig } from "@/data/site";

export default function AboutPage() {
  return (
    <>
      <PageHero
        description="A concise artist bio positioned for clubs, promoters, labels, and listeners who care about taste and direction."
        eyebrow="About"
        title="Underground tech house with a darker, more hypnotic edge."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Positioning</p>
          <p className="text-base leading-8 text-white/70">
            Warehouse / rave energy, premium club visuals, and a cleaner headline-artist presentation.
          </p>
        </div>
      </PageHero>

      <SectionShell
        description="A sharper read on the project voice, built for clubs, promoters, labels, and listeners who care about direction."
        eyebrow="Artist Statement"
        title="The project in a few clean paragraphs."
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
