export type NavItem = {
  href: string;
  label: string;
};

export type SocialItem = {
  href: string;
  label: string;
};

export const featureFlags = {
  epk: false,
  merch: false
} as const;

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

export const socials: SocialItem[] = [
  { href: "https://www.instagram.com/geminox_beats/", label: "Instagram" },
  { href: "https://www.tiktok.com/@geminox_beats", label: "TikTok" },
  { href: "https://www.youtube.com/@geminox_beats", label: "YouTube" },
  { href: "mailto:bookings@geminoxbeats.com", label: "Bookings" }
];

export const siteConfig = {
  name: "Geminox",
  title: "Geminox | Underground Tech House",
  description:
    "A dark underground tech house artist website built for local preview first, with a premium club aesthetic and easy-to-edit content files.",
  location: "Washington DC",
  bookingEmail: "bookings@geminoxbeats.com",
  genre: "Underground Tech House",
  hero: {
    kicker: "Washington DC / Underground Tech House",
    title: "Late-night pressure for black-room dance floors.",
    description:
      "Geminox moves through hypnotic percussion, smoke-heavy low end, and sleek warehouse tension designed for peak-hour rooms and after-hours momentum.",
    primaryCta: { href: "/music", label: "Listen Now" },
    secondaryCta: { href: "#newsletter", label: "Join Newsletter" },
    tertiaryCta: { href: "/contact", label: "Book Geminox" },
    announcement: {
      label: "Latest signal",
      title: "No Fakers",
      copy: "New EP announced on the current site for April 3, 2026."
    }
  },
  about: {
    short:
      "Geminox is a Washington DC-based artist project rooted in underground tech house, focused on hypnotic grooves, club tension, and sleek late-night energy.",
    long: [
      "Built for warehouse systems and intimate rooms alike, the project leans into pressure over spectacle: rolling drums, shadowy basslines, and patient transitions that keep a floor locked without tipping into excess.",
      "This redesign uses the real signals available on the current site, including the No Fakers EP announcement, the featured mix, booking contact, and active social channels. Any missing assets are clearly marked so the site can launch locally now and be tightened up later."
    ]
  },
  newsletter: {
    providerLabel: "Kit",
    integrationNote:
      "Newsletter signups post to Kit through src/app/api/newsletter/route.ts using KIT_API_KEY and KIT_FORM_ID."
  },
  soundcloud: {
    profileUrl: "https://soundcloud.com/geminox_beats",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/geminox_beats&color=%2306b6d4&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    embedTitle: "Geminox on SoundCloud",
    description:
      "The homepage now embeds the public Geminox SoundCloud profile directly so your live SoundCloud Spotlight controls what gets featured here."
  },
  contact: {
    promoterCopy:
      "Open for club nights, direct support, label showcases, warehouse events, and curated late-night bookings.",
    responseNote:
      "For now, the form submits to a local placeholder endpoint so the site can be previewed before any provider is connected."
  },
  epk: {
    facts: [
      { label: "Genre", value: "Underground Tech House" },
      { label: "Base", value: "Washington DC" },
      { label: "Booking", value: "bookings@geminoxbeats.com" },
      { label: "Featured Mix", value: "YouTube embed available" }
    ]
  },
  streamingProfiles: [
    {
      label: "Spotify",
      value: "https://open.spotify.com/artist/23sLtEwFbFysRPtji4FMCB",
      isPlaceholder: false
    },
    { label: "Apple Music", value: "Add artist URL", isPlaceholder: true },
    { label: "Beatport", value: "Add artist URL", isPlaceholder: true },
    { label: "SoundCloud", value: "Add artist URL", isPlaceholder: true }
  ]
} as const;
