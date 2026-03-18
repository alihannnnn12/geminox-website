import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { galleryItems } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <>
      <PageHero
        description="A media page with a gallery grid, click-to-open lightbox, and clearly flagged placeholders for future press photography."
        eyebrow="Gallery / Media"
        title="Visual material with a cleaner editorial frame."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Replacement queue</p>
          <p className="text-base leading-8 text-white/70">The placeholder tiles are intentional and marked for swap-out later.</p>
        </div>
      </PageHero>

      <SectionShell
        description="Real current-project visuals are reused where available. Placeholder frames keep the page polished until more photo assets are ready."
        eyebrow="Media Grid"
        title="Press stills, live energy, and future club photography."
      >
        <Reveal>
          <GalleryGrid items={galleryItems} />
        </Reveal>
      </SectionShell>
    </>
  );
}
