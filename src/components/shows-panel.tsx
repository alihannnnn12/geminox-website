import type { Show } from "@/data/shows";
import { formatDate } from "@/lib/format-date";

import { ButtonLink } from "./button-link";

type ShowsPanelProps = {
  shows: Show[];
};

export function ShowsPanel({ shows }: ShowsPanelProps) {
  if (!shows.length) {
    return (
      <div className="panel-glow grid gap-6 p-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.3fr)] lg:p-8">
        <div>
          <p className="eyebrow">No live dates listed</p>
          <h3 className="font-display text-4xl text-white">New city announcements are still to come.</h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
            The current Geminox site does not list tour dates, so this redesign uses a strong empty state instead of inventing fake shows.
            Join the newsletter for first access to venue updates or reach out directly for bookings.
          </p>
        </div>
        <div className="flex flex-col gap-3 self-end">
          <ButtonLink href="/contact" variant="primary">
            Book Geminox
          </ButtonLink>
          <ButtonLink href="/#newsletter" variant="secondary">
            Join Newsletter
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-glow divide-y divide-white/8 overflow-hidden">
      {shows.map((show) => (
        <div className="grid gap-4 px-5 py-5 md:grid-cols-[0.8fr_0.8fr_1fr_auto] md:items-center md:px-6" key={`${show.date}-${show.city}-${show.venue}`}>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Date</p>
            <p className="mt-2 text-lg text-white">{formatDate(show.date)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">City</p>
            <p className="mt-2 text-lg text-white">{show.city}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Venue</p>
            <p className="mt-2 text-lg text-white">{show.venue}</p>
          </div>
          <ButtonLink href={show.ticketUrl} variant="secondary">
            Tickets
          </ButtonLink>
        </div>
      ))}
    </div>
  );
}
