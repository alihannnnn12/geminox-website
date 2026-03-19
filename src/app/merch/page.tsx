import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { featureFlags } from "@/data/site";

export default function MerchPage() {
  if (!featureFlags.merch) {
    notFound();
  }

  return (
    <>
      <PageHero
        description="A branded merch page designed to hold anticipation without feeling empty."
        eyebrow="Merch"
        title="Merch will land with the right pressure."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Status</p>
          <p className="text-base leading-8 text-white/70">The first drop is being shaped around limited-run pieces, tighter graphics, and a cleaner clubwear angle.</p>
        </div>
      </PageHero>

      <SectionShell
        description="The page sets the tone early and gives the eventual drop a place to land with impact."
        eyebrow="Coming Soon"
        title="A cleaner waitlist moment."
      >
        <Reveal>
          <div className="panel-glow grid gap-6 overflow-hidden lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
            <div className="min-h-[360px] bg-[radial-gradient(circle_at_top,_rgba(53,161,255,0.25),_transparent_38%),linear-gradient(135deg,_rgba(9,13,21,0.6),_rgba(5,8,13,1))] p-6 lg:p-8">
              <p className="eyebrow">Future drop</p>
              <h2 className="font-display text-5xl text-white">Capsule pieces, limited-run graphics, and late-night clubwear.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
                Expect a focused capsule of graphics, wearable staples, and pieces that match the darker Geminox identity.
              </p>
            </div>
            <div className="flex flex-col justify-center p-6 lg:p-8">
              <h3 className="font-display text-3xl text-white">Until then, send people to the newsletter.</h3>
              <p className="mt-4 text-base leading-8 text-white/68">
                That keeps the signal warm now and gives the first drop a built-in audience when it lands.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/#newsletter">Join Newsletter</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Brand + Collab Inquiries
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
}
