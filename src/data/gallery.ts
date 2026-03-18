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
    alt: "Placeholder warehouse photography tile",
    title: "Warehouse Portrait",
    caption: "Placeholder image. Replace with real club photography.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-02.svg",
    alt: "Placeholder crowd photography tile",
    title: "Crowd Moment",
    caption: "Placeholder image. Replace with live room shots.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-03.svg",
    alt: "Placeholder backstage photography tile",
    title: "Backstage Detail",
    caption: "Placeholder image. Replace with behind-the-scenes content.",
    isPlaceholder: true
  },
  {
    src: "/assets/gallery/gallery-placeholder-04.svg",
    alt: "Placeholder media asset tile",
    title: "Press Texture",
    caption: "Placeholder image. Replace with approved press stills.",
    isPlaceholder: true
  }
];
