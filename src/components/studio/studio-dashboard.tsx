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

type SaveState = Record<StudioDocumentKey, string>;

const initialSaveState: SaveState = {
  gallery: "",
  releases: "",
  shows: "",
  site: ""
};

function studioButtonClass(active: boolean) {
  return active
    ? "border-cyan-300/40 bg-[rgba(22,37,55,0.92)]"
    : "border-white/8 bg-[rgba(7,11,18,0.72)] hover:border-white/16";
}

function panelFieldClass() {
  return "min-h-12 rounded-[1rem] border border-white/10 bg-[rgba(7,11,18,0.94)] px-4 text-white outline-none transition focus:border-cyan-300/45";
}

function textAreaClass() {
  return "min-h-[120px] rounded-[1rem] border border-white/10 bg-[rgba(7,11,18,0.94)] px-4 py-3 text-white outline-none transition focus:border-cyan-300/45";
}

function inputGroup(
  label: string,
  input: ReactNode,
  hint?: string
) {
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
    <button className="rounded-full border border-red-300/25 px-4 py-2 text-sm uppercase tracking-[0.12em] text-red-200/80 transition hover:border-red-300/40 hover:text-red-100" onClick={onClick} type="button">
      {children}
    </button>
  );
}

export function StudioDashboard({ canSave, documents }: StudioDashboardProps) {
  const [activeKey, setActiveKey] = useState<StudioDocumentKey>("site");
  const [docValues, setDocValues] = useState<StudioDocumentValueMap>(() =>
    documents.reduce(
      (accumulator, document) => {
        accumulator[document.key] = document.content as StudioDocumentValueMap[typeof document.key];

        return accumulator;
      },
      {} as StudioDocumentValueMap
    )
  );
  const [saveState, setSaveState] = useState<SaveState>(initialSaveState);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const activeDocument = useMemo(
    () => documents.find((document) => document.key === activeKey) ?? documents[0],
    [activeKey, documents]
  );

  function updateDoc<K extends StudioDocumentKey>(key: K, nextValue: StudioDocumentValueMap[K]) {
    setDocValues((current) => ({
      ...current,
      [key]: nextValue
    }));
    setSaveState((current) => ({
      ...current,
      [key]: ""
    }));
  }

  function resetActiveDocument() {
    if (!activeDocument) {
      return;
    }

    updateDoc(activeDocument.key, activeDocument.content as StudioDocumentValueMap[typeof activeDocument.key]);
  }

  async function saveDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activeDocument) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/studio/content/${activeDocument.key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: docValues[activeDocument.key] })
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.message ?? "Save failed.");
      }

      setSaveState((current) => ({
        ...current,
        [activeDocument.key]: payload?.message ?? "Saved."
      }));
    } catch (error) {
      setSaveState((current) => ({
        ...current,
        [activeDocument.key]: error instanceof Error ? error.message : "Save failed."
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

  function renderSiteEditor(document: SiteDocument) {
    const update = (next: SiteDocument) => updateDoc("site", next);
    const siteConfig = document.siteConfig;

    return (
      <div className="grid gap-5">
        <SectionCard title="Core site settings">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Site name",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: { ...siteConfig, name: event.target.value }
                  })
                }
                value={siteConfig.name}
              />
            )}
            {inputGroup(
              "Page title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
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
                  update({
                    ...document,
                    siteConfig: { ...siteConfig, location: event.target.value }
                  })
                }
                value={siteConfig.location}
              />
            )}
            {inputGroup(
              "Booking email",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: { ...siteConfig, bookingEmail: event.target.value }
                  })
                }
                value={siteConfig.bookingEmail}
              />
            )}
            {inputGroup(
              "Genre",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: { ...siteConfig, genre: event.target.value }
                  })
                }
                value={siteConfig.genre}
              />
            )}
            {inputGroup(
              "Newsletter provider label",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      newsletter: { ...siteConfig.newsletter, providerLabel: event.target.value }
                    }
                  })
                }
                value={siteConfig.newsletter.providerLabel}
              />
            )}
          </div>
          {inputGroup(
            "SEO description",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                update({
                  ...document,
                  siteConfig: { ...siteConfig, description: event.target.value }
                })
              }
              value={siteConfig.description}
            />
          )}
        </SectionCard>

        <SectionCard title="Homepage hero">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Kicker",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
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
              "Hero title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
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
                update({
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
                        update({
                          ...document,
                          siteConfig: {
                            ...siteConfig,
                            hero: {
                              ...siteConfig.hero,
                              [ctaKey]: {
                                ...siteConfig.hero[ctaKey],
                                label: event.target.value
                              }
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
                        update({
                          ...document,
                          siteConfig: {
                            ...siteConfig,
                            hero: {
                              ...siteConfig.hero,
                              [ctaKey]: {
                                ...siteConfig.hero[ctaKey],
                                href: event.target.value
                              }
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

        <SectionCard title="Hero announcement block">
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Announcement label",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      hero: {
                        ...siteConfig.hero,
                        announcement: {
                          ...siteConfig.hero.announcement,
                          label: event.target.value
                        }
                      }
                    }
                  })
                }
                value={siteConfig.hero.announcement.label}
              />
            )}
            {inputGroup(
              "Announcement title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      hero: {
                        ...siteConfig.hero,
                        announcement: {
                          ...siteConfig.hero.announcement,
                          title: event.target.value
                        }
                      }
                    }
                  })
                }
                value={siteConfig.hero.announcement.title}
              />
            )}
          </div>
          {inputGroup(
            "Announcement copy",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                update({
                  ...document,
                  siteConfig: {
                    ...siteConfig,
                    hero: {
                      ...siteConfig.hero,
                      announcement: {
                        ...siteConfig.hero.announcement,
                        copy: event.target.value
                      }
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
              "YouTube URL",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      latestVideo: { ...siteConfig.latestVideo, url: event.target.value }
                    }
                  })
                }
                value={siteConfig.latestVideo.url}
              />,
              "Example: https://youtu.be/..."
            )}
            {inputGroup(
              "YouTube embed URL",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
                    ...document,
                    siteConfig: {
                      ...siteConfig,
                      latestVideo: { ...siteConfig.latestVideo, embedUrl: event.target.value }
                    }
                  })
                }
                value={siteConfig.latestVideo.embedUrl}
              />,
              "Example: https://www.youtube.com/embed/..."
            )}
            {inputGroup(
              "Video embed title",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
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
              "Spotify playlist URL",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
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
              "Spotify embed URL",
              <input
                className={panelFieldClass()}
                onChange={(event) =>
                  update({
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
                  update({
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
                update({
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
        </SectionCard>

        <SectionCard title="About + newsletter + bookings copy">
          {inputGroup(
            "Short about text",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                update({
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
              <div key={`about-long-${index}`}>
                {inputGroup(
                  `About paragraph ${index + 1}`,
                  <textarea
                    className={textAreaClass()}
                    onChange={(event) => {
                      const nextLong = siteConfig.about.long.map((item, itemIndex) =>
                        itemIndex === index ? event.target.value : item
                      );

                      update({
                        ...document,
                        siteConfig: {
                          ...siteConfig,
                          about: { ...siteConfig.about, long: nextLong }
                        }
                      });
                    }}
                    value={paragraph}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {inputGroup(
              "Newsletter text",
              <textarea
                className={textAreaClass()}
                onChange={(event) =>
                  update({
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
            {inputGroup(
              "Promoter / booking copy",
              <textarea
                className={textAreaClass()}
                onChange={(event) =>
                  update({
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
          </div>
          {inputGroup(
            "Contact response note",
            <textarea
              className={textAreaClass()}
              onChange={(event) =>
                update({
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
                      onChange={(event) => {
                        const nextSocials = document.socials.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, label: event.target.value } : item
                        );

                        update({
                          ...document,
                          socials: nextSocials
                        });
                      }}
                      value={social.label}
                    />
                  )}
                  {inputGroup(
                    "Link",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) => {
                        const nextSocials = document.socials.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, href: event.target.value } : item
                        );

                        update({
                          ...document,
                          socials: nextSocials
                        });
                      }}
                      value={social.href}
                    />
                  )}
                  <RemoveButton
                    onClick={() =>
                      update({
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
                update({
                  ...document,
                  socials: [...document.socials, { href: "", label: "New Social" }]
                })
              }
            >
              Add social link
            </AddButton>
          </div>
        </SectionCard>

        <SectionCard title="Streaming profiles">
          <div className="grid gap-4">
            {siteConfig.streamingProfiles.map((profile, index) => (
              <div className="rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4" key={`profile-${index}`}>
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)_auto] md:items-end">
                  {inputGroup(
                    "Platform",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) => {
                        const nextProfiles = siteConfig.streamingProfiles.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, label: event.target.value } : item
                        );

                        update({
                          ...document,
                          siteConfig: { ...siteConfig, streamingProfiles: nextProfiles }
                        });
                      }}
                      value={profile.label}
                    />
                  )}
                  {inputGroup(
                    "Link",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) => {
                        const nextProfiles = siteConfig.streamingProfiles.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, value: event.target.value } : item
                        );

                        update({
                          ...document,
                          siteConfig: { ...siteConfig, streamingProfiles: nextProfiles }
                        });
                      }}
                      value={profile.value}
                    />
                  )}
                  <RemoveButton
                    onClick={() =>
                      update({
                        ...document,
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
                update({
                  ...document,
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
      </div>
    );
  }

  function renderReleasesEditor(document: ReleaseDocument) {
    return (
      <div className="grid gap-5">
        {document.map((release, index) => (
          <SectionCard key={`${release.slug}-${index}`} title={`Release ${index + 1}`}>
            <div className="grid gap-4 md:grid-cols-2">
              {inputGroup(
                "Title",
                <input
                  className={panelFieldClass()}
                  onChange={(event) =>
                    updateDoc(
                      "releases",
                      document.map((item, itemIndex) =>
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
                      document.map((item, itemIndex) =>
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
                      document.map((item, itemIndex) =>
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
                      document.map((item, itemIndex) =>
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
                      document.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, artwork: event.target.value } : item
                      )
                    )
                  }
                  value={release.artwork}
                />,
                "Use something like /assets/uploads/your-image.jpg"
              )}
            </div>
            {inputGroup(
              "Description",
              <textarea
                className={textAreaClass()}
                onChange={(event) =>
                  updateDoc(
                    "releases",
                    document.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, description: event.target.value } : item
                    )
                  )
                }
                value={release.description}
              />
            )}
            <div className="grid gap-3 rounded-[1rem] border border-white/8 bg-[rgba(9,14,22,0.76)] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm uppercase tracking-[0.16em] text-white/45">Streaming buttons</p>
                <AddButton
                  onClick={() =>
                    updateDoc(
                      "releases",
                      document.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, links: [...item.links, { href: "", label: "New Link" }] }
                          : item
                      )
                    )
                  }
                >
                  Add button
                </AddButton>
              </div>
              {release.links.map((link, linkIndex) => (
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)_auto] md:items-end" key={`${release.slug}-link-${linkIndex}`}>
                  {inputGroup(
                    "Button text",
                    <input
                      className={panelFieldClass()}
                      onChange={(event) =>
                        updateDoc(
                          "releases",
                          document.map((item, itemIndex) =>
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
                          document.map((item, itemIndex) =>
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
                        document.map((item, itemIndex) =>
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
            <RemoveButton
              onClick={() => updateDoc("releases", document.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove release
            </RemoveButton>
          </SectionCard>
        ))}
        <AddButton
          onClick={() =>
            updateDoc("releases", [
              ...document,
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
    );
  }

  function renderShowsEditor(document: ShowDocument) {
    return (
      <div className="grid gap-5">
        {document.length ? null : (
          <div className="rounded-[1.35rem] border border-dashed border-white/12 bg-[rgba(7,11,18,0.72)] p-5 text-white/62">
            No shows listed right now. Add one below and it will appear on the homepage preview and the tour page.
          </div>
        )}
        {document.map((show, index) => (
          <SectionCard key={`${show.date}-${show.venue}-${index}`} title={`Show ${index + 1}`}>
            <div className="grid gap-4 md:grid-cols-2">
              {inputGroup(
                "Date",
                <input
                  className={panelFieldClass()}
                  onChange={(event) =>
                    updateDoc(
                      "shows",
                      document.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, date: event.target.value } : item
                      )
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
                      document.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, city: event.target.value } : item
                      )
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
                      document.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, venue: event.target.value } : item
                      )
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
                      document.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, ticketUrl: event.target.value } : item
                      )
                    )
                  }
                  value={show.ticketUrl}
                />
              )}
            </div>
            <RemoveButton onClick={() => updateDoc("shows", document.filter((_, itemIndex) => itemIndex !== index))}>
              Remove show
            </RemoveButton>
          </SectionCard>
        ))}
        <AddButton
          onClick={() =>
            updateDoc("shows", [
              ...document,
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

  function renderGalleryEditor(document: GalleryDocument) {
    return (
      <div className="grid gap-5">
        {document.map((item, index) => (
          <SectionCard key={`${item.src}-${index}`} title={`Gallery item ${index + 1}`}>
            <div className="grid gap-4 md:grid-cols-2">
              {inputGroup(
                "Image path",
                <input
                  className={panelFieldClass()}
                  onChange={(event) =>
                    updateDoc(
                      "gallery",
                      document.map((galleryItem, itemIndex) =>
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
                      document.map((galleryItem, itemIndex) =>
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
                    document.map((galleryItem, itemIndex) =>
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
                    document.map((galleryItem, itemIndex) =>
                      itemIndex === index ? { ...galleryItem, caption: event.target.value } : galleryItem
                    )
                  )
                }
                value={item.caption}
              />
            )}
            <RemoveButton onClick={() => updateDoc("gallery", document.filter((_, itemIndex) => itemIndex !== index))}>
              Remove gallery item
            </RemoveButton>
          </SectionCard>
        ))}
        <AddButton
          onClick={() =>
            updateDoc("gallery", [
              ...document,
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

  function renderEditor() {
    if (!activeDocument) {
      return null;
    }

    switch (activeDocument.key) {
      case "site":
        return renderSiteEditor(docValues.site);
      case "releases":
        return renderReleasesEditor(docValues.releases);
      case "shows":
        return renderShowsEditor(docValues.shows);
      case "gallery":
        return renderGalleryEditor(docValues.gallery);
      default:
        return null;
    }
  }

  if (!activeDocument) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow mb-2">Studio</p>
          <h1 className="font-display text-4xl text-white">Edit the site with forms, not code.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
            Use the sections below to update text, links, releases, tour dates, gallery photos, and the latest video without touching
            JSON. Save sends the changes to GitHub and Vercel can redeploy the site from there.
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

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="panel-glow p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Sections</p>
          <div className="mt-4 grid gap-2">
            {documents.map((document) => (
              <button
                className={`rounded-[1rem] border px-4 py-4 text-left transition ${studioButtonClass(document.key === activeKey)}`}
                key={document.key}
                onClick={() => setActiveKey(document.key)}
                type="button"
              >
                <p className="text-sm uppercase tracking-[0.16em] text-white/45">{document.filePath}</p>
                <h2 className="mt-2 font-display text-2xl text-white">{document.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/62">{document.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1rem] border border-white/8 bg-[rgba(7,11,18,0.72)] p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-white/45">Image upload helper</p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Upload an image here, then paste the returned path into a release artwork field or gallery image field.
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
              <div className="mt-3 rounded-[0.9rem] border border-cyan-300/14 bg-[rgba(11,18,28,0.82)] p-3 text-sm leading-6 text-cyan-100/78">
                {uploadMessage}
              </div>
            ) : null}
          </div>
        </aside>

        <section className="panel-glow p-4 sm:p-6">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">{activeDocument.filePath}</p>
            <h2 className="mt-2 font-display text-3xl text-white">{activeDocument.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{activeDocument.description}</p>
          </div>
          <form className="grid gap-5" onSubmit={saveDocument}>
            {renderEditor()}
            <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-white/10 bg-[rgba(4,8,15,0.86)] p-4 backdrop-blur-md">
              <button className="cta-primary" disabled={!canSave || isSaving} type="submit">
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button className="cta-secondary" onClick={resetActiveDocument} type="button">
                Reset This Section
              </button>
              {saveState[activeDocument.key] ? <p className="text-sm text-cyan-100/80">{saveState[activeDocument.key]}</p> : null}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
