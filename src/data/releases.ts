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

export const releases: Release[] = [
  {
    slug: "lie-here",
    title: "Lie Here",
    date: "2026",
    description:
      "Current Spotify release from the Geminox catalog. Updated from the public artist page on March 18, 2026.",
    artwork: "/assets/releases/spotify/lie-here.jpg",
    status: "Latest on Spotify",
    links: [
      {
        href: "https://open.spotify.com/album/2HibE3pLleodjrLak2GHqN",
        label: "Open on Spotify"
      }
    ]
  },
  {
    slug: "whino",
    title: "Whino",
    date: "2026",
    description:
      "Spotify single listed in the current Geminox discography.",
    artwork: "/assets/releases/spotify/whino.jpg",
    status: "Spotify Single",
    links: [
      {
        href: "https://open.spotify.com/album/69RYFrMmnZN0fC3wjoyv6t",
        label: "Open on Spotify"
      }
    ]
  },
  {
    slug: "looking-for-the-sign",
    title: "Looking for the Sign",
    date: "2025",
    description:
      "Spotify single listed in the current Geminox discography.",
    artwork: "/assets/releases/spotify/looking-for-the-sign.jpg",
    status: "Spotify Single",
    links: [
      {
        href: "https://open.spotify.com/album/4DE9TNRsQOXzCYjvvkVK6q",
        label: "Open on Spotify"
      }
    ]
  },
  {
    slug: "room",
    title: "Room",
    date: "2025",
    description:
      "Spotify single listed in the current Geminox discography.",
    artwork: "/assets/releases/spotify/room.jpg",
    status: "Spotify Single",
    links: [
      {
        href: "https://open.spotify.com/album/2CwPHcHKVP7gJE0tuLR6cX",
        label: "Open on Spotify"
      }
    ]
  },
  {
    slug: "intact",
    title: "Intact",
    date: "2025",
    description:
      "Explicit Spotify single listed in the current Geminox discography.",
    artwork: "/assets/releases/spotify/intact.jpg",
    status: "Spotify Single",
    links: [
      {
        href: "https://open.spotify.com/album/4mMCWdAB17xhXYESSvri66",
        label: "Open on Spotify"
      }
    ]
  },
  {
    slug: "peak",
    title: "Peak",
    date: "2025",
    description:
      "Spotify single listed in the current Geminox discography.",
    artwork: "/assets/releases/spotify/peak.jpg",
    status: "Spotify Single",
    links: [
      {
        href: "https://open.spotify.com/album/5MesQlBuSGmFdFGDkhWPy9",
        label: "Open on Spotify"
      }
    ]
  },
  {
    slug: "fantom",
    title: "Fantom",
    date: "2025",
    description:
      "Spotify single listed in the current Geminox discography.",
    artwork: "/assets/releases/spotify/fantom.jpg",
    status: "Spotify Single",
    links: [
      {
        href: "https://open.spotify.com/album/38gIz2zcjm6gR2lyDT6XPx",
        label: "Open on Spotify"
      }
    ]
  },
  {
    slug: "pills",
    title: "Pills",
    date: "2025",
    description:
      "Spotify single listed in the current Geminox discography.",
    artwork: "/assets/releases/spotify/pills.jpg",
    status: "Spotify Single",
    links: [
      {
        href: "https://open.spotify.com/album/3OEwIw89stRdwBXF7VbPpF",
        label: "Open on Spotify"
      }
    ]
  }
];
