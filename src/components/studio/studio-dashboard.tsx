"use client";

import { ChangeEvent, FormEvent, type ReactNode, useMemo, useState } from "react";

import type { StudioDocumentKey } from "@/lib/studio-content";

type LinkItem = {
  href: string;
  isPlaceholder?: boolean;
  label: string;
};

type SocialItem = {
  href: string;
  label: string;
};

type SiteDocument = {
  featureFlags: {
    epk: boolean;
    merch: boolean;
  };
  siteConfig: {
    about: {
      long: string[];
      short: string;
    };
    bookingEmail: string;
    contact: {
      promoterCopy: string;
      responseNote: string;
    };
    description: string;
    epk: {
      facts: Array<{
        label: string;
        value: string;
      }>;
    };
    genre: string;
    hero: {
      announcement: {
        copy: string;
        label: string;
        title: string;
      };
      description: string;
      kicker: string;
      primaryCta: {
        href: string;
        label: string;
      };
      secondaryCta: {
        href: string;
        label: string;
      };
      tertiaryCta: {
        href: string;
        label: string;
      };
      title: string;
    };
    latestVideo: {
      description: string;
      embedTitle: string;
      embedUrl: string;
      url: string;
    };
    location: string;
    name: string;
    newsletter: {
      integrationNote: string;
      providerLabel: string;
    };
    spotifyPlaylist: {
      embedTitle: string;
      embedUrl: string;
      url: string;
    };
    streamingProfiles: Array<{
      isPlaceholder?: boolean;
      label: string;
      value: string;
    }>;
    title: string;
  };
  socials: SocialItem[];
};

type ReleaseDocument = Array<{
  artwork: string;
  date: string;
  description: string;
  isPlaceholder?: boolean;
  links: LinkItem[];
  slug: string;
  status: string;
  title: string;
}>;

type ShowDocument = Array<{
  city: string;
  date: string;
  ticketUrl: string;
  venue: string;
}>;

type GalleryDocument = Array<{
  alt: string;
  caption: string;
  isPlaceholder?: boolean;
  src: string;
  title: string;
}>;

type StudioDocumentValueMap = {
  gallery: GalleryDocument;
  releases: ReleaseDocument;
  shows: ShowDocument;
  site: SiteDocument;
};

type StudioDocument<K extends StudioDocumentKey = StudioDocumentKey> = {
  content: StudioDocumentValueMap[K];
  description: string;
  filePath: string;
  key: K;
  title: string;
};

type StudioDashboardProps = {
  canSave: boolean;
  documents: Array<StudioDocument>;
};

type SectionId = "contact" | "gallery" | "home" | "music" | "tour";

type SectionMeta = {
  description: string;
  keys: StudioDocumentKey[];
  title: string;
};

type SaveState = Record<SectionId, string>;

const sectionMeta: Record<SectionId, SectionMeta> = {
  home: {
    title: "Home",
    description: "Hero text, homepage copy, latest video, playlist links, about text, and newsletter messaging.",
    keys: ["site"]
  },
  music: {
    title: "Music",
    description: "Release cards, artwork, music links, and streaming profile buttons.",
    keys: ["releases", "site"]
  },
  tour: {
    title: "Tour",
    description: "Tour dates and ticket links that feed both the homepage preview and the tour page.",
    keys: ["shows"]
  },
  gallery: {
    title: "Gallery",
    description: "Photo paths, titles, captions, and alt text for the media section.",
    keys: ["gallery"]
  },
  contact: {
    title: "Contact",
    description: "Booking email, promoter copy, response text, and social links.",
    keys: ["site"]
  }
};

const initialSaveState: SaveState = {
  contact: "",
  gallery: "",
  home: "",
  music: "",
  tour: ""
};

const sectionOrder: SectionId[] = ["home", "music", "tour", "gallery", "contact"];

function buildInitialDocValues(documents: Array<StudioDocument>): StudioDocumentValueMap {
  const site = documents.find((document): document is StudioDocument<"site"> => document.key === "site");
  const releases = documents.find((document): document is StudioDocument<"releases"> => document.key === "releases");
  const shows = documents.find((document): document is StudioDocument<"shows"> => document.key === "shows");
  const gallery = documents.find((document): document is StudioDocument<"gallery"> => document.key === "gallery");

  if (!site || !releases || !shows || !gallery) {
    throw new Error("Studio documents are incomplete.");
  }

  return {
    gallery: gallery.content,
    releases: releases.content,
    shows: shows.content,
    site: site.content
  };
}

function panelFieldClass() {
  return "min-h-12 rounded-[1rem] border border-white/10 bg-[rgba(7,11,18,0.94)] px-4 text-white outline-none transition focus:border-cyan-300/45";
}

function textAreaClass() {
  return "min-h-[120px] rounded-[1rem] border border-white/10 bg-[rgba(7,11,18,0.94)] px-4 py-3 text-white outline-none transition focus:border-cyan-300/45";
}

function inputGroup(label: string, input: ReactNode, hint?: string) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.16em] text-white/55">{label}</span>
      {input}
      {hint ? <span className="text-sm leading-6 text-white/42">{hint}</span> : null}
    </label>
  );
}

function SectionCard({
  children,
  title
}: Readonly<{
  children: ReactNode;
  title: string;
}>) {
  return (
    <div className="rounded-[1.35rem] border border-white/8 bg-[rgba(7,11,18,0.76)] p-4 sm:p-5">
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <div className="mt-4 grid gap-4">{children}</div>
    </div>
  );
}

function AddButton({
  children,
  onClick
}: Readonly<{
  children: ReactNode;
  onClick: () => void;
}>) {
  return (
    <button className="cta-secondary" onClick={onClick} type="button">
      {children}
    </button>
  );
}

function RemoveButton({
  children = "Remove",
  onClick
}: Readonly<{
  children?: ReactNode;
  onClick: () => void;
}>) {
  return (
    <button
      className="rounded-full border border-red-300/25 px-4 py-2 text-sm uppercase tracking-[0.12em] text-red-200/80 transition hover:border-red-300/40 hover:text-red-100"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function MediaPreview({
  alt,
  label,
  src
}: Readonly<{
  alt: string;
  label: string;
  src: string;
}>) {
  if (!src.trim()) {
    return null;
  }

  return (
    <div className="rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/72">{label}</p>
      <div className="mt-3 overflow-hidden rounded-[1rem] border border-white/10 bg-[rgba(5,8,13,0.9)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt} className="aspect-[4/3] w-full object-cover" src={src} />
      </div>
      <p className="mt-3 break-all text-sm leading-6 text-white/52">{src}</p>
    </div>
  );
}

function extractYouTubeId(url: string) {
  const value = url.trim();

  if (!value) {
    return "";
  }

  if (value.includes("/embed/")) {
    const match = value.match(/\/embed\/([A-Za-z0-9_-]{6,})/);

    return match?.[1] ?? "";
  }

  try {
    const parsed = new URL(value);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v") ?? "";
    }

    const shortsMatch = parsed.pathname.match(/\/shorts\/([A-Za-z0-9_-]{6,})/);

    return shortsMatch?.[1] ?? "";
  } catch {
    return "";
  }
}

function deriveYouTubeEmbedUrl(url: string) {
  const videoId = extractYouTubeId(url);

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

function sectionButtonClass(active: boolean) {
  return active
    ? "border-cyan-300/35 bg-[rgba(18,34,52,0.94)] text-white"
    : "border-white/8 bg-[rgba(7,11,18,0.72)] text-white/72 hover:border-white/16 hover:text-white";
}

export function StudioDashboard({ canSave, documents }: StudioDashboardProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const originalDocValues = useMemo(() => buildInitialDocValues(documents), [documents]);
  const [docValues, setDocValues] = useState<StudioDocumentValueMap>(originalDocValues);
  const [saveState, setSaveState] = useState<SaveState>(initialSaveState);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const activeMeta = sectionMeta[activeSection];

  function updateDoc<K extends StudioDocumentKey>(key: K, nextValue: StudioDocumentValueMap[K]) {
    setDocValues((current) => ({
      ...current,
      [key]: nextValue
    }));
    setSaveState((current) => ({
      ...current,
      [activeSection]: ""
    }));
  }

  function resetActiveSection() {
    setDocValues((current) => {
      const next = { ...current };

      if (activeMeta.keys.includes("site")) {
        next.site = originalDocValues.site;
      }

      if (activeMeta.keys.includes("releases")) {
        next.releases = originalDocValues.releases;
      }

      if (activeMeta.keys.includes("shows")) {
        next.shows = originalDocValues.shows;
      }

      if (activeMeta.keys.includes("gallery")) {
        next.gallery = originalDocValues.gallery;
      }

      return next;
    });
    setSaveState((current) => ({
      ...current,
      [activeSection]: ""
    }));
  }

  async function saveSection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      for (const key of activeMeta.keys) {
        const response = await fetch(`/api/studio/content/${key}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ content: docValues[key] })
        });

        const payload = (await response.json().catch(() => null)) as { message?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.message ?? "Save failed.");
        }
      }

      setSaveState((current) => ({
        ...current,
        [activeSection]: "Saved to GitHub. Vercel will redeploy automatically."
      }));
    } catch (error) {
      setSaveState((current) => ({
        ...current,
        [activeSection]: error instanceof Error ? error.message : "Save failed."
      }));
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/studio/upload", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json().catch(() => null)) as { message?: string; path?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.message ?? "Upload failed.");
      }

      setUploadMessage(`${payload?.message ?? "Uploaded."} ${payload?.path ?? ""}`.trim());
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      event.target.value = "";
    }
  }

  async function logout() {
    await fetch("/api/studio/logout", { method: "POST" });
    window.location.reload();
  }

  function renderHomeEditor(document: SiteDocument) {
    const siteConfig = document.siteConfig;

    return (
      <div className="grid gap-5">
        <SectionCard title="Homepage identity">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Site name",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: { ...siteConfig, name: event.target.value }
                  })
                }
                value={siteConfig.name}
              />
            )}
            {inputGroup(
              "Browser title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: { ...siteConfig, title: event.target.value }
                  })
                }
                value={siteConfig.title}
              />
            )}
            {inputGroup(
              "Location",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: { ...siteConfig, location: event.target.value }
                  })
                }
                value={siteConfig.location}
              />
            )}
            {inputGroup(
              "Genre",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: { ...siteConfig, genre: event.target.value }
                  })
                }
                value={siteConfig.genre}
              />
            )}
          </div>
          {inputGroup(
            "SEO description",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: { ...siteConfig, description: event.target.value }
                })
              }
              value={siteConfig.description}
            />
          )}
        </SectionCard>

        <SectionCard title="Hero section">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Kicker",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      hero: { ...siteConfig.hero, kicker: event.target.value }
                    }
                  })
                }
                value={siteConfig.hero.kicker}
              />
            )}
            {inputGroup(
              "Headline",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      hero: { ...siteConfig.hero, title: event.target.value }
                    }
                  })
                }
                value={siteConfig.hero.title}
              />
            )}
          </div>
          {inputGroup(
            "Hero description",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    hero: { ...siteConfig.hero, description: event.target.value }
                  }
                })
              }
              value={siteConfig.hero.description}
            />
          )}
          <div className="grid gap-4 md:grid-cols-3">
            {([
              ["primaryCta", "Primary CTA"],
              ["secondaryCta", "Secondary CTA"],
              ["tertiaryCta", "Tertiary CTA"]
            ] as const).map(([ctaKey, label]) => (
              <div className="rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4" key={ctaKey}>
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>
                <div className="mt-3 grid gap-3">
                  {inputGroup(
                    `${label} text`,
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc("site", {
                          ...document,
                          siteConfig: {
                            ...siteConfig,
                            hero: {
                              ...siteConfig.hero,
                              [ctaKey]: { ...siteConfig.hero[ctaKey], label: event.target.value }
                            }
                          }
                        })
                      }
                      value={siteConfig.hero[ctaKey].label}
                    />
                  )}
                  {inputGroup(
                    `${label} link`,
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc("site", {
                          ...document,
                          siteConfig: {
                            ...siteConfig,
                            hero: {
                              ...siteConfig.hero,
                              [ctaKey]: { ...siteConfig.hero[ctaKey], href: event.target.value }
                            }
                          }
                        })
                      }
                      value={siteConfig.hero[ctaKey].href}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Announcement block">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Label",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      hero: {
                        ...siteConfig.hero,
                        announcement: { ...siteConfig.hero.announcement, label: event.target.value }
                      }
                    }
                  })
                }
                value={siteConfig.hero.announcement.label}
              />
            )}
            {inputGroup(
              "Title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      hero: {
                        ...siteConfig.hero,
                        announcement: { ...siteConfig.hero.announcement, title: event.target.value }
                      }
                    }
                  })
                }
                value={siteConfig.hero.announcement.title}
              />
            )}
          </div>
          {inputGroup(
            "Copy",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    hero: {
                      ...siteConfig.hero,
                      announcement: { ...siteConfig.hero.announcement, copy: event.target.value }
                    }
                  }
                })
              }
              value={siteConfig.hero.announcement.copy}
            />
          )}
        </SectionCard>

        <SectionCard title="Latest video + playlist">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "YouTube video link",
              <input
                className={panelFieldClass()}
                onChange={(event) => {
                  const nextUrl = event.target.value;
                  const nextEmbedUrl = deriveYouTubeEmbedUrl(nextUrl);

                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      latestVideo: {
                        ...siteConfig.latestVideo,
                        embedUrl: nextEmbedUrl || siteConfig.latestVideo.embedUrl,
                        url: nextUrl
                      }
                    }
                  });
                }}
                value={siteConfig.latestVideo.url}
              />,
              "Paste the normal YouTube link. The embed URL updates automatically."
            )}
            {inputGroup(
              "Auto-generated embed URL",
              <input className={`${panelFieldClass()} opacity-70`} readOnly value={siteConfig.latestVideo.embedUrl} />
            )}
            {inputGroup(
              "Video title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      latestVideo: { ...siteConfig.latestVideo, embedTitle: event.target.value }
                    }
                  })
                }
                value={siteConfig.latestVideo.embedTitle}
              />
            )}
            {inputGroup(
              "Spotify playlist link",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      spotifyPlaylist: { ...siteConfig.spotifyPlaylist, url: event.target.value }
                    }
                  })
                }
                value={siteConfig.spotifyPlaylist.url}
              />
            )}
            {inputGroup(
              "Spotify embed link",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      spotifyPlaylist: { ...siteConfig.spotifyPlaylist, embedUrl: event.target.value }
                    }
                  })
                }
                value={siteConfig.spotifyPlaylist.embedUrl}
              />
            )}
            {inputGroup(
              "Spotify embed title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      spotifyPlaylist: { ...siteConfig.spotifyPlaylist, embedTitle: event.target.value }
                    }
                  })
                }
                value={siteConfig.spotifyPlaylist.embedTitle}
              />
            )}
          </div>
          {inputGroup(
            "Video section description",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    latestVideo: { ...siteConfig.latestVideo, description: event.target.value }
                  }
                })
              }
              value={siteConfig.latestVideo.description}
            />
          )}
          <div className="grid gap-4 lg:grid-cols-2">
            {siteConfig.latestVideo.embedUrl ? (
              <div className="rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/72">YouTube preview</p>
                <div className="mt-3 overflow-hidden rounded-[1rem] border border-white/10">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="aspect-video w-full"
                    src={siteConfig.latestVideo.embedUrl}
                    title={siteConfig.latestVideo.embedTitle}
                  />
                </div>
              </div>
            ) : null}
            {siteConfig.spotifyPlaylist.embedUrl ? (
              <div className="rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/72">Spotify preview</p>
                <div className="mt-3 overflow-hidden rounded-[1rem] border border-white/10">
                  <iframe
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="h-[352px] w-full"
                    src={siteConfig.spotifyPlaylist.embedUrl}
                    title={siteConfig.spotifyPlaylist.embedTitle}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="About + newsletter">
          {inputGroup(
            "Short about text",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    about: { ...siteConfig.about, short: event.target.value }
                  }
                })
              }
              value={siteConfig.about.short}
            />
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {siteConfig.about.long.map((paragraph, index) => (
              <div key={`about-paragraph-${index}`}>
                {inputGroup(
                  `About paragraph ${index + 1}`,
                  <textarea
                    className={textAreaClass()}
                    onChange={(event) =>
                      updateDoc("site", {
                        ...document,
                        siteConfig: {
                          ...siteConfig,
                          about: {
                            ...siteConfig.about,
                            long: siteConfig.about.long.map((item, itemIndex) =>
                              itemIndex === index ? event.target.value : item
                            )
                          }
                        }
                      })
                    }
                    value={paragraph}
                  />
                )}
              </div>
            ))}
          </div>
          {inputGroup(
            "Newsletter text",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    newsletter: { ...siteConfig.newsletter, integrationNote: event.target.value }
                  }
                })
              }
              value={siteConfig.newsletter.integrationNote}
            />
          )}
        </SectionCard>
      </div>
    );
  }

  function renderMusicEditor(releases: ReleaseDocument, site: SiteDocument) {
    const siteConfig = site.siteConfig;

    return (
      <div className="grid gap-5">
        <SectionCard title="Streaming profile buttons">
          <div className="grid gap-4">
            {siteConfig.streamingProfiles.map((profile, index) => (
              <div className="rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4" key={`profile-${index}`}>
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)_auto] md:items-end">
                  {inputGroup(
                    "Platform",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc("site", {
                          ...site,
                          siteConfig: {
                            ...siteConfig,
                            streamingProfiles: siteConfig.streamingProfiles.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, label: event.target.value } : item
                            )
                          }
                        })
                      }
                      value={profile.label}
                    />
                  )}
                  {inputGroup(
                    "Link",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc("site", {
                          ...site,
                          siteConfig: {
                            ...siteConfig,
                            streamingProfiles: siteConfig.streamingProfiles.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, value: event.target.value } : item
                            )
                          }
                        })
                      }
                      value={profile.value}
                    />
                  )}
                  <RemoveButton
                    onClick={() =>
                      updateDoc("site", {
                        ...site,
                        siteConfig: {
                          ...siteConfig,
                          streamingProfiles: siteConfig.streamingProfiles.filter((_, itemIndex) => itemIndex !== index)
                        }
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <AddButton
              onClick={() =>
                updateDoc("site", {
                  ...site,
                  siteConfig: {
                    ...siteConfig,
                    streamingProfiles: [...siteConfig.streamingProfiles, { label: "New Platform", value: "" }]
                  }
                })
              }
            >
              Add streaming profile
            </AddButton>
          </div>
        </SectionCard>

        <div className="grid gap-5">
          {releases.map((release, index) => (
            <SectionCard key={`release-${index}`} title={`Release ${index + 1}`}>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {inputGroup(
                      "Title",
                      <input
                        className={panelFieldClass()}
                        onChange={(event) =>
                          updateDoc(
                            "releases",
                            releases.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, title: event.target.value } : item
                            )
                          )
                        }
                        value={release.title}
                      />
                    )}
                    {inputGroup(
                      "Slug",
                      <input
                        className={panelFieldClass()}
                        onChange={(event) =>
                          updateDoc(
                            "releases",
                            releases.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, slug: event.target.value } : item
                            )
                          )
                        }
                        value={release.slug}
                      />
                    )}
                    {inputGroup(
                      "Date",
                      <input
                        className={panelFieldClass()}
                        onChange={(event) =>
                          updateDoc(
                            "releases",
                            releases.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, date: event.target.value } : item
                            )
                          )
                        }
                        value={release.date}
                      />
                    )}
                    {inputGroup(
                      "Status label",
                      <input
                        className={panelFieldClass()}
                        onChange={(event) =>
                          updateDoc(
                            "releases",
                            releases.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, status: event.target.value } : item
                            )
                          )
                        }
                        value={release.status}
                      />
                    )}
                    {inputGroup(
                      "Artwork path",
                      <input
                        className={panelFieldClass()}
                        onChange={(event) =>
                          updateDoc(
                            "releases",
                            releases.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, artwork: event.target.value } : item
                            )
                          )
                        }
                        value={release.artwork}
                      />,
                      "Use a path like /assets/uploads/cover.jpg"
                    )}
                  </div>
                  {inputGroup(
                    "Description",
                    <textarea
                      className={textAreaClass()}
                      onChange={(event) =>
                        updateDoc(
                          "releases",
                          releases.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, description: event.target.value } : item
                          )
                        )
                      }
                      value={release.description}
                    />
                  )}
                </div>
                <MediaPreview alt={release.title} label="Artwork preview" src={release.artwork} />
              </div>

              <div className="grid gap-3 rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.16em] text-white/45">Streaming buttons</p>
                  <AddButton
                    onClick={() =>
                      updateDoc(
                        "releases",
                        releases.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, links: [...item.links, { href: "", label: "New Link" }] } : item
                        )
                      )
                    }
                  >
                    Add button
                  </AddButton>
                </div>
                {release.links.map((link, linkIndex) => (
                  <div className="grid gap-4 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)_auto] md:items-end" key={`release-link-${index}-${linkIndex}`}>
                    {inputGroup(
                      "Button text",
                      <input
                        className={panelFieldClass()}
                        onChange={(event) =>
                          updateDoc(
                            "releases",
                            releases.map((item, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...item,
                                    links: item.links.map((itemLink, itemLinkIndex) =>
                                      itemLinkIndex === linkIndex ? { ...itemLink, label: event.target.value } : itemLink
                                    )
                                  }
                                : item
                            )
                          )
                        }
                        value={link.label}
                      />
                    )}
                    {inputGroup(
                      "Button link",
                      <input
                        className={panelFieldClass()}
                        onChange={(event) =>
                          updateDoc(
                            "releases",
                            releases.map((item, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...item,
                                    links: item.links.map((itemLink, itemLinkIndex) =>
                                      itemLinkIndex === linkIndex ? { ...itemLink, href: event.target.value } : itemLink
                                    )
                                  }
                                : item
                            )
                          )
                        }
                        value={link.href}
                      />
                    )}
                    <RemoveButton
                      onClick={() =>
                        updateDoc(
                          "releases",
                          releases.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, links: item.links.filter((_, itemLinkIndex) => itemLinkIndex !== linkIndex) }
                              : item
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <RemoveButton onClick={() => updateDoc("releases", releases.filter((_, itemIndex) => itemIndex !== index))}>
                Remove release
              </RemoveButton>
            </SectionCard>
          ))}
          <AddButton
            onClick={() =>
              updateDoc("releases", [
                ...releases,
                {
                  artwork: "",
                  date: new Date().getFullYear().toString(),
                  description: "",
                  links: [{ href: "", label: "Open on Spotify" }],
                  slug: "new-release",
                  status: "New Release",
                  title: "New Release"
                }
              ])
            }
          >
            Add release
          </AddButton>
        </div>
      </div>
    );
  }

  function renderTourEditor(shows: ShowDocument) {
    return (
      <div className="grid gap-5">
        {!shows.length ? (
          <div className="rounded-[1.35rem] border border-dashed border-white/12 bg-[rgba(7,11,18,0.72)] p-5 text-white/62">
            No shows listed right now. Add one below and it will appear on the homepage preview and the tour page.
          </div>
        ) : null}
        {shows.map((show, index) => (
          <SectionCard key={`show-${index}`} title={`Show ${index + 1}`}>
            <div className="grid gap-4 md:grid-cols-2">
              {inputGroup(
                "Date",
                <input
                  className={panelFieldClass()}
                  onChange={(event) =>
                    updateDoc(
                      "shows",
                      shows.map((item, itemIndex) => (itemIndex === index ? { ...item, date: event.target.value } : item))
                    )
                  }
                  value={show.date}
                />
              )}
              {inputGroup(
                "City",
                <input
                  className={panelFieldClass()}
                  onChange={(event) =>
                    updateDoc(
                      "shows",
                      shows.map((item, itemIndex) => (itemIndex === index ? { ...item, city: event.target.value } : item))
                    )
                  }
                  value={show.city}
                />
              )}
              {inputGroup(
                "Venue",
                <input
                  className={panelFieldClass()}
                  onChange={(event) =>
                    updateDoc(
                      "shows",
                      shows.map((item, itemIndex) => (itemIndex === index ? { ...item, venue: event.target.value } : item))
                    )
                  }
                  value={show.venue}
                />
              )}
              {inputGroup(
                "Ticket link",
                <input
                  className={panelFieldClass()}
                  onChange={(event) =>
                    updateDoc(
                      "shows",
                      shows.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, ticketUrl: event.target.value } : item
                      )
                    )
                  }
                  value={show.ticketUrl}
                />
              )}
            </div>
            <RemoveButton onClick={() => updateDoc("shows", shows.filter((_, itemIndex) => itemIndex !== index))}>
              Remove show
            </RemoveButton>
          </SectionCard>
        ))}
        <AddButton
          onClick={() =>
            updateDoc("shows", [
              ...shows,
              {
                city: "Washington DC",
                date: "",
                ticketUrl: "",
                venue: "New Venue"
              }
            ])
          }
        >
          Add show
        </AddButton>
      </div>
    );
  }

  function renderGalleryEditor(gallery: GalleryDocument) {
    return (
      <div className="grid gap-5">
        {gallery.map((item, index) => (
          <SectionCard key={`gallery-${index}`} title={`Gallery item ${index + 1}`}>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {inputGroup(
                    "Image path",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc(
                          "gallery",
                          gallery.map((galleryItem, itemIndex) =>
                            itemIndex === index ? { ...galleryItem, src: event.target.value } : galleryItem
                          )
                        )
                      }
                      value={item.src}
                    />,
                    "Example: /assets/uploads/your-photo.jpg"
                  )}
                  {inputGroup(
                    "Title",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc(
                          "gallery",
                          gallery.map((galleryItem, itemIndex) =>
                            itemIndex === index ? { ...galleryItem, title: event.target.value } : galleryItem
                          )
                        )
                      }
                      value={item.title}
                    />
                  )}
                </div>
                {inputGroup(
                  "Alt text",
                  <input
                    className={panelFieldClass()}
                    onChange={(event) =>
                      updateDoc(
                        "gallery",
                        gallery.map((galleryItem, itemIndex) =>
                          itemIndex === index ? { ...galleryItem, alt: event.target.value } : galleryItem
                        )
                      )
                    }
                    value={item.alt}
                  />
                )}
                {inputGroup(
                  "Caption",
                  <textarea
                    className={textAreaClass()}
                    onChange={(event) =>
                      updateDoc(
                        "gallery",
                        gallery.map((galleryItem, itemIndex) =>
                          itemIndex === index ? { ...galleryItem, caption: event.target.value } : galleryItem
                        )
                      )
                    }
                    value={item.caption}
                  />
                )}
              </div>
              <MediaPreview alt={item.alt || item.title} label="Image preview" src={item.src} />
            </div>
            <RemoveButton onClick={() => updateDoc("gallery", gallery.filter((_, itemIndex) => itemIndex !== index))}>
              Remove gallery item
            </RemoveButton>
          </SectionCard>
        ))}
        <AddButton
          onClick={() =>
            updateDoc("gallery", [
              ...gallery,
              {
                alt: "New Geminox gallery image",
                caption: "",
                src: "",
                title: "New Image"
              }
            ])
          }
        >
          Add gallery item
        </AddButton>
      </div>
    );
  }

  function renderContactEditor(document: SiteDocument) {
    const siteConfig = document.siteConfig;

    return (
      <div className="grid gap-5">
        <SectionCard title="Booking details">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Booking email",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: { ...siteConfig, bookingEmail: event.target.value }
                  })
                }
                value={siteConfig.bookingEmail}
              />
            )}
            {inputGroup(
              "Location",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  updateDoc("site", {
                    ...document,
                    siteConfig: { ...siteConfig, location: event.target.value }
                  })
                }
                value={siteConfig.location}
              />
            )}
          </div>
          {inputGroup(
            "Promoter copy",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    contact: { ...siteConfig.contact, promoterCopy: event.target.value }
                  }
                })
              }
              value={siteConfig.contact.promoterCopy}
            />
          )}
          {inputGroup(
            "Contact form response note",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                updateDoc("site", {
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    contact: { ...siteConfig.contact, responseNote: event.target.value }
                  }
                })
              }
              value={siteConfig.contact.responseNote}
            />
          )}
        </SectionCard>

        <SectionCard title="Social links">
          <div className="grid gap-4">
            {document.socials.map((social, index) => (
              <div className="rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4" key={`social-${index}`}>
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)_auto] md:items-end">
                  {inputGroup(
                    "Label",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc("site", {
                          ...document,
                          socials: document.socials.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, label: event.target.value } : item
                          )
                        })
                      }
                      value={social.label}
                    />
                  )}
                  {inputGroup(
                    "Link",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc("site", {
                          ...document,
                          socials: document.socials.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, href: event.target.value } : item
                          )
                        })
                      }
                      value={social.href}
                    />
                  )}
                  <RemoveButton
                    onClick={() =>
                      updateDoc("site", {
                        ...document,
                        socials: document.socials.filter((_, itemIndex) => itemIndex !== index)
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <AddButton
              onClick={() =>
                updateDoc("site", {
                  ...document,
                  socials: [...document.socials, { href: "", label: "New Social" }]
                })
              }
            >
              Add social link
            </AddButton>
          </div>
        </SectionCard>
      </div>
    );
  }

  function renderEditor() {
    switch (activeSection) {
      case "home":
        return renderHomeEditor(docValues.site);
      case "music":
        return renderMusicEditor(docValues.releases, docValues.site);
      case "tour":
        return renderTourEditor(docValues.shows);
      case "gallery":
        return renderGalleryEditor(docValues.gallery);
      case "contact":
        return renderContactEditor(docValues.site);
      default:
        return null;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow mb-2">Studio</p>
          <h1 className="font-display text-4xl text-white">Edit the site with friendly controls.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
            Switch between Home, Music, Tour, Gallery, and Contact, update text and links with normal form fields, preview images in place,
            and save each section back to GitHub.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="cta-secondary" onClick={logout} type="button">
            Lock Studio
          </button>
        </div>
      </div>

      {!canSave ? (
        <div className="panel-glow mb-6 border border-amber-300/20 p-5 text-amber-100/80">
          Add the Studio env vars first. You can browse the content here already, but saving and image uploads stay disabled until the GitHub
          token and studio password are configured in Vercel.
        </div>
      ) : null}

      <div className="mb-6 grid gap-3 md:grid-cols-5">
        {sectionOrder.map((section) => (
          <button
            className={`rounded-[1.15rem] border px-4 py-4 text-left transition ${sectionButtonClass(section === activeSection)}`}
            key={section}
            onClick={() => setActiveSection(section)}
            type="button"
          >
            <p className="font-display text-2xl">{sectionMeta[section].title}</p>
            <p className="mt-2 text-sm leading-6 text-white/58">{sectionMeta[section].description}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="panel-glow p-4 sm:p-6">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">{activeMeta.title}</p>
            <h2 className="mt-2 font-display text-3xl text-white">{activeMeta.title} Editor</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{activeMeta.description}</p>
          </div>
          <form className="grid gap-5" onSubmit={saveSection}>
            {renderEditor()}
            <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-white/10 bg-[rgba(4,8,15,0.86)] p-4 backdrop-blur-md">
              <button className="cta-primary" disabled={!canSave || isSaving} type="submit">
                {isSaving ? "Saving..." : `Save ${activeMeta.title}`}
              </button>
              <button className="cta-secondary" onClick={resetActiveSection} type="button">
                Reset {activeMeta.title}
              </button>
              {saveState[activeSection] ? <p className="text-sm text-cyan-100/80">{saveState[activeSection]}</p> : null}
            </div>
          </form>
        </section>

        <aside className="panel-glow h-fit p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Image upload helper</p>
          <p className="mt-3 text-sm leading-6 text-white/62">
            Upload an image here, then paste the returned path into a release artwork or gallery image field. You’ll see the preview right
            away in the editor.
          </p>
          <label className="mt-4 block">
            <span className="sr-only">Upload image</span>
            <input
              accept="image/*"
              className="block w-full text-sm text-white/72 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
              disabled={!canSave}
              onChange={uploadImage}
              type="file"
            />
          </label>
          {uploadMessage ? (
            <div className="mt-4 rounded-[0.9rem] border border-cyan-300/14 bg-[rgba(11,18,28,0.82)] p-3 text-sm leading-6 text-cyan-100/78">
              {uploadMessage}
            </div>
          ) : null}
          <div className="mt-6 rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-white/45">What changed</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/62">
              <li>Home now auto-generates the YouTube embed URL from the normal video link.</li>
              <li>Music and Gallery now show image previews next to the path field.</li>
              <li>The editor is grouped by site area instead of raw file/document names.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
