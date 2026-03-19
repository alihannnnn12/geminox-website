import { PageHero } from "@/components/page-hero";
import { ReleaseGrid } from "@/components/release-grid";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { releases } from "@/data/releases";

export default function MusicPage() {
  return (
    <>
      <PageHero
        description="A focused release page built around current Geminox cuts, singles, and catalog highlights."
        eyebrow="Music / Releases"
        title="A release page built to scale."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Current Focus</p>
          <p className="text-base leading-8 text-white/70">A clean read on the active catalog, led by the strongest Spotify-facing releases in the Geminox orbit.</p>
        </div>
      </PageHero>

      <SectionShell
        description="Each release card keeps the catalog easy to scan, whether someone is discovering the project or catching up on recent drops."
        eyebrow="Catalog"
        title="Current catalog highlights."
      >
        <Reveal>
          <ReleaseGrid items={releases} />
        </Reveal>
      </SectionShell>
    </>
  );
}
