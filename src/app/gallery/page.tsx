import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { galleryItems } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <>
      <PageHero
        description="Performance stills, club atmosphere, and branded imagery from across the Geminox orbit."
        eyebrow="Gallery / Media"
        title="Live energy, dark rooms, and the visual world of Geminox."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Visual Direction</p>
          <p className="text-base leading-8 text-white/70">Raw live frames, warehouse shots, and editorial stills — the visual side of underground tech house from Washington DC.</p>
        </div>
      </PageHero>

      <SectionShell
        description="Performance energy, room atmosphere, and sharper press frames from Washington DC and beyond."
        eyebrow="Media Grid"
        title="Performance stills and club atmosphere."
      >
        <Reveal>
          <GalleryGrid items={galleryItems} />
        </Reveal>
      </SectionShell>
    </>
  );
}
