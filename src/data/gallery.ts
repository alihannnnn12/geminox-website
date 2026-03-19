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
    caption: "A Geminox performance still with a wider-air, high-pressure atmosphere."
  },
  {
    src: "/assets/brand/featured-mix.jpg",
    alt: "Featured mix still",
    title: "Featured Mix",
    caption: "Visual frame from the featured Geminox mix."
  },
  {
    src: "/assets/gallery/gallery-placeholder-01.svg",
    alt: "Warehouse portrait holding visual",
    title: "Warehouse Portrait",
    caption: "Built to hold darker portrait-led imagery and club campaign selects.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-02.svg",
    alt: "Crowd energy holding visual",
    title: "Crowd Moment",
    caption: "Positioned for room shots, crowd energy, and after-hours detail.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-03.svg",
    alt: "Backstage detail holding visual",
    title: "Backstage Detail",
    caption: "A slot for behind-the-scenes textures, travel moments, and setup detail.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-04.svg",
    alt: "Press texture holding visual",
    title: "Press Texture",
    caption: "Shaped for approved press stills and sharper editorial frames.",
    isPlaceholder: true
  }
];
