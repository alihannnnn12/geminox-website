import galleryContent from "@/content/gallery.json";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  isPlaceholder?: boolean;
};

export const galleryItems: GalleryItem[] = galleryContent as GalleryItem[];
