import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { galleryItems } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <>
      <PageHero
        description="A media page with a gallery grid, click-to-open lightbox, and a strong visual framework for current and future press photography."
        eyebrow="Gallery / Media"
        title="Visual material with a cleaner editorial frame."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Visual Direction</p>
          <p className="text-base leading-8 text-white/70">The grid balances current Geminox visuals with space reserved for future press selects and live room photography.</p>
        </div>
      </PageHero>

      <SectionShell
        description="Current project visuals are already in place, with additional frames ready for incoming portrait, crowd, and backstage assets."
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
