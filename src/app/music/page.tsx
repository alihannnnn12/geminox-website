import { PageHero } from "@/components/page-hero";
import { ReleaseGrid } from "@/components/release-grid";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { releases } from "@/data/releases";

export default function MusicPage() {
  return (
    <>
      <PageHero
        description="Singles and catalog cuts built around late-night pressure, rolling low end, and peak-hour movement."
        eyebrow="Music / Releases"
        title="Dark singles and hypnotic cuts from the Geminox catalog."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Current Focus</p>
          <p className="text-base leading-8 text-white/70">From stripped-back singles to harder-edged club cuts — the active Geminox catalog, straight from Spotify.</p>
        </div>
      </PageHero>

      <SectionShell
        description="From the latest drop to deeper catalog cuts — every release shaped for dark rooms and locked-in floors."
        eyebrow="Catalog"
        title="Current releases."
      >
        <Reveal>
          <ReleaseGrid items={releases} />
        </Reveal>
      </SectionShell>
    </>
  );
}
