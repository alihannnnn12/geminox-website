export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  isPlaceholder?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/assets/brand/geminox-mark.jpg",
    alt: "Geminox DJ performance photo",
    title: "Open-Air Session",
    caption: "Existing Geminox performance image pulled from the current site."
  },
  {
    src: "/assets/brand/featured-mix.jpg",
    alt: "Featured mix still",
    title: "Featured Mix",
    caption: "Current featured YouTube mix visual pulled into the local build."
  },
  {
    src: "/assets/gallery/gallery-placeholder-01.svg",
    alt: "Warehouse portrait holding visual",
    title: "Warehouse Portrait",
    caption: "Reserved for future club portrait photography.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-02.svg",
    alt: "Crowd energy holding visual",
    title: "Crowd Moment",
    caption: "Reserved for future crowd and room shots.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-03.svg",
    alt: "Backstage detail holding visual",
    title: "Backstage Detail",
    caption: "Reserved for behind-the-scenes and travel details.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-04.svg",
    alt: "Press texture holding visual",
    title: "Press Texture",
    caption: "Reserved for approved press stills and editorial selects.",
    isPlaceholder: true
  }
];
