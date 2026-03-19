import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { galleryItems } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <>
      <PageHero
        description="A media page built around dark performance stills, branded frames, and a cleaner editorial atmosphere."
        eyebrow="Gallery / Media"
        title="Visual material with a cleaner editorial frame."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Visual Direction</p>
          <p className="text-base leading-8 text-white/70">The grid balances live energy, artist imagery, and the darker textures that fit the Geminox world.</p>
        </div>
      </PageHero>

      <SectionShell
        description="A visual spread built to hold performance stills, room atmosphere, and sharper press-ready imagery."
        eyebrow="Media Grid"
        title="Press stills, live energy, and club atmosphere."
      >
        <Reveal>
          <GalleryGrid items={galleryItems} />
        </Reveal>
      </SectionShell>
    </>
  );
}
