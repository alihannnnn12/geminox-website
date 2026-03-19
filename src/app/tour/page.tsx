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
        description="A polished live page that keeps the calendar clear, direct, and ready for future ticket links."
        eyebrow="Tour / Shows"
        title="Live dates, cleanly handled whether the calendar is packed or quiet."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Promoter note</p>
          <p className="text-base leading-8 text-white/70">{siteConfig.contact.promoterCopy}</p>
        </div>
      </PageHero>

      <SectionShell
        description="When real dates are ready, update `src/data/shows.ts` and the page will populate automatically."
        eyebrow="Show Feed"
        title="Upcoming appearances."
      >
        <Reveal>
          <ShowsPanel shows={shows} />
        </Reveal>
      </SectionShell>

      <SectionShell
        description="When the calendar is quiet, the strongest next step is a direct path to bookings and the newsletter."
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
