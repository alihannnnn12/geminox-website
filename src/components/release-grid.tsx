import Image from "next/image";

import type { Release } from "@/data/releases";
import { formatDate } from "@/lib/format-date";

import { ButtonLink } from "./button-link";

type ReleaseGridProps = {
  items: Release[];
};

export function ReleaseGrid({ items }: ReleaseGridProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((release) => (
        <article className="panel-glow flex flex-col" key={release.slug}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              alt={release.title}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              src={release.artwork}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,13,0.92)] via-transparent to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-[rgba(7,11,18,0.82)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
              {release.status}
            </div>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-sm uppercase tracking-[0.16em] text-white/45">{formatDate(release.date)}</p>
            <h3 className="mt-3 font-display text-3xl text-white">{release.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-white/68">{release.description}</p>
            {release.isPlaceholder ? (
              <p className="mt-4 text-sm text-cyan-100/70">Placeholder entry. Replace content in `src/data/releases.ts`.</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-3">
              {release.links.map((link) =>
                link.isPlaceholder ? (
                  <span
                    className="inline-flex min-h-11 items-center rounded-full border border-dashed border-white/15 px-4 text-xs uppercase tracking-[0.18em] text-white/45"
                    key={link.label}
                  >
                    {link.label}
                  </span>
                ) : (
                  <ButtonLink className="text-xs" href={link.href} key={link.label} variant="secondary">
                    {link.label}
                  </ButtonLink>
                )
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
