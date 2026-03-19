import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { ShowsPanel } from "@/components/shows-panel";
import { shows } from "@/data/shows";
import { siteConfig } from "@/data/site";

export default function TourPage() {
  return (
    <>
      <PageHero
        description="Upcoming Geminox appearances — club nights, warehouse events, and support slots across the circuit."
        eyebrow="Tour / Shows"
        title="Upcoming shows and live dates."
      >
        <Reveal>
          <div className="mt-8">
            <ShowsPanel shows={shows} />
          </div>
        </Reveal>
      </PageHero>

      <SectionShell
        eyebrow="Next Step"
        title="Need a direct booking line?"
      >
        <Reveal>
          <div className="panel-glow flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-base leading-8 text-white/68">
              Reach out for support slots, venue bookings, or curated warehouse programming.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Book Geminox</ButtonLink>
              <ButtonLink href="/#newsletter" variant="secondary">
                Join Newsletter
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
}
