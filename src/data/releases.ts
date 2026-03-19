import releasesContent from "@/content/releases.json";

export type ReleaseLink = {
  href: string;
  label: string;
  isPlaceholder?: boolean;
};

export type Release = {
  slug: string;
  title: string;
  date: string;
  description: string;
  artwork: string;
  status: string;
  isPlaceholder?: boolean;
  links: ReleaseLink[];
};

export const releases: Release[] = releasesContent as Release[];
