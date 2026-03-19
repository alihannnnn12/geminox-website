import siteContent from "@/content/site.json";

export type NavItem = {
  href: string;
  label: string;
};

export type SocialItem = {
  href: string;
  label: string;
};

type FeatureFlags = {
  epk: boolean;
  merch: boolean;
};

type SiteConfig = {
  name: string;
  title: string;
  description: string;
  location: string;
  bookingEmail: string;
  genre: string;
  hero: {
    kicker: string;
    title: string;
    description: string;
    primaryCta: NavItem;
    secondaryCta: NavItem;
    tertiaryCta: NavItem;
    announcement: {
      label: string;
      title: string;
      copy: string;
    };
  };
  about: {
    short: string;
    long: string[];
  };
  newsletter: {
    providerLabel: string;
    integrationNote: string;
  };
  latestVideo: {
    url: string;
    embedUrl: string;
    embedTitle: string;
    description: string;
  };
  spotifyPlaylist: {
    url: string;
    embedUrl: string;
    embedTitle: string;
  };
  contact: {
    promoterCopy: string;
    responseNote: string;
  };
  epk: {
    facts: Array<{
      label: string;
      value: string;
    }>;
  };
  streamingProfiles: Array<{
    label: string;
    value: string;
    isPlaceholder?: boolean;
  }>;
};

const content = siteContent as {
  featureFlags: FeatureFlags;
  socials: SocialItem[];
  siteConfig: SiteConfig;
};

export const featureFlags = content.featureFlags;

const allNavigation: Array<NavItem & { enabled: boolean }> = [
  { href: "/", label: "Home", enabled: true },
  { href: "/music", label: "Music", enabled: true },
  { href: "/tour", label: "Tour", enabled: true },
  { href: "/gallery", label: "Gallery", enabled: true },
  { href: "/about", label: "About", enabled: true },
  { href: "/contact", label: "Contact", enabled: true },
  { href: "/epk", label: "EPK", enabled: featureFlags.epk },
  { href: "/merch", label: "Merch", enabled: featureFlags.merch }
];

export const navigation: NavItem[] = allNavigation.filter((item) => item.enabled);
export const socials: SocialItem[] = content.socials;
export const siteConfig: SiteConfig = content.siteConfig;
