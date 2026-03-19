"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryItem } from "@/data/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <button
            className="group panel-glow relative overflow-hidden p-0 text-left"
            key={`${item.src}-${item.title}`}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <div className="relative aspect-[4/5]">
              <Image
                alt={item.alt}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
                src={item.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,7,12,0.92)] via-transparent to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-sm uppercase tracking-[0.16em] text-cyan-200/70">
                {"Gallery"}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/65">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>
      {activeItem ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(3,6,10,0.92)] p-4"
          role="dialog"
        >
          <button
            aria-label="Close lightbox"
            className="absolute right-5 top-5 rounded-full border border-white/20 px-4 py-2 text-sm uppercase tracking-[0.18em] text-white"
            onClick={() => setActiveIndex(null)}
            type="button"
          >
            Close
          </button>
          <div className="grid max-h-[90vh] w-full max-w-6xl gap-6 overflow-auto rounded-[2rem] border border-white/10 bg-[rgba(7,10,18,0.92)] p-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.3fr)] lg:p-6">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-white/5">
              <Image
                alt={activeItem.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 70vw, 100vw"
                src={activeItem.src}
              />
            </div>
            <div className="flex flex-col justify-end">
              <p className="eyebrow">{"Gallery"}</p>
              <h3 className="font-display text-4xl text-white">{activeItem.title}</h3>
              <p className="mt-4 text-base leading-7 text-white/70">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
