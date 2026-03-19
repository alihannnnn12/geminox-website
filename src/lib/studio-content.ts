import gallery from "@/content/gallery.json";
import releases from "@/content/releases.json";
import shows from "@/content/shows.json";
import site from "@/content/site.json";

export const studioDocumentKeys = ["site", "releases", "shows", "gallery"] as const;

export type StudioDocumentKey = (typeof studioDocumentKeys)[number];

const studioDocuments = {
  gallery,
  releases,
  shows,
  site
} satisfies Record<StudioDocumentKey, unknown>;

export const studioDocumentMeta: Record<
  StudioDocumentKey,
  {
    description: string;
    filePath: string;
    title: string;
  }
> = {
  site: {
    title: "Site settings",
    description: "Hero copy, socials, booking email, video links, playlist links, about text, and footer-adjacent content.",
    filePath: "src/content/site.json"
  },
  releases: {
    title: "Releases",
    description: "Music cards, artwork paths, release copy, and streaming links for the music page.",
    filePath: "src/content/releases.json"
  },
  shows: {
    title: "Shows",
    description: "Tour dates for the homepage preview and tour page.",
    filePath: "src/content/shows.json"
  },
  gallery: {
    title: "Gallery",
    description: "Image paths, captions, titles, and alt text for the media section.",
    filePath: "src/content/gallery.json"
  }
};

export function isStudioDocumentKey(value: string): value is StudioDocumentKey {
  return studioDocumentKeys.includes(value as StudioDocumentKey);
}

export function getStudioDocument(key: StudioDocumentKey) {
  return studioDocuments[key];
}
