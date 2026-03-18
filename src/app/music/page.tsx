import { PageHero } from "@/components/page-hero";
import { ReleaseGrid } from "@/components/release-grid";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { releases } from "@/data/releases";

export default function MusicPage() {
  return (
    <>
      <PageHero
        description="A modular release page with easy-to-edit cards for singles, EPs, edits, and future catalog growth."
        eyebrow="Music / Releases"
        title="A release page built to scale."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Edit here later</p>
          <p className="text-base leading-8 text-white/70">Update titles, artwork, dates, and streaming links in `src/data/releases.ts`.</p>
        </div>
      </PageHero>

      <SectionShell
        description="Each release lives in a clear data file so new drops can be added without redesigning the page."
        eyebrow="Catalog"
        title="Current and upcoming records."
      >
        <Reveal>
          <ReleaseGrid items={releases} />
        </Reveal>
      </SectionShell>
    </>
  );
}
