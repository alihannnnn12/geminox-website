"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import type { StudioDocumentKey } from "@/lib/studio-content";

type StudioDocument = {
  description: string;
  filePath: string;
  key: StudioDocumentKey;
  title: string;
  value: string;
};

type StudioDashboardProps = {
  canSave: boolean;
  documents: StudioDocument[];
};

type SaveState = {
  gallery: string;
  releases: string;
  shows: string;
  site: string;
};

const initialSaveState: SaveState = {
  gallery: "",
  releases: "",
  shows: "",
  site: ""
};

export function StudioDashboard({ canSave, documents }: StudioDashboardProps) {
  const [activeKey, setActiveKey] = useState<StudioDocumentKey>("site");
  const [docValues, setDocValues] = useState<Record<StudioDocumentKey, string>>(() =>
    documents.reduce(
      (accumulator, document) => {
        accumulator[document.key] = document.value;

        return accumulator;
      },
      {} as Record<StudioDocumentKey, string>
    )
  );
  const [saveState, setSaveState] = useState<SaveState>(initialSaveState);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const activeDocument = useMemo(
    () => documents.find((document) => document.key === activeKey) ?? documents[0],
    [activeKey, documents]
  );

  function updateDocValue(key: StudioDocumentKey, value: string) {
    setDocValues((current) => ({
      ...current,
      [key]: value
    }));
    setSaveState((current) => ({
      ...current,
      [key]: ""
    }));
  }

  async function saveDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activeDocument) {
      return;
    }

    setIsSaving(true);

    try {
      const parsed = JSON.parse(docValues[activeDocument.key]);
      const response = await fetch(`/api/studio/content/${activeDocument.key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: parsed })
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

  if (!activeDocument) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow mb-2">Studio</p>
          <h1 className="font-display text-4xl text-white">Edit the live site without opening code files.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
            Save content here, commit it back to GitHub, and let Vercel redeploy the site. The image uploader sends files into
            `public/assets/uploads`, then you can paste the returned path into the JSON you are editing.
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
          Add the Studio env vars first. Until then, you can still inspect the content here, but save and upload will stay disabled.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="panel-glow p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Documents</p>
          <div className="mt-4 grid gap-2">
            {documents.map((document) => (
              <button
                className={`rounded-[1rem] border px-4 py-4 text-left transition ${
                  document.key === activeKey
                    ? "border-cyan-300/40 bg-[rgba(22,37,55,0.92)]"
                    : "border-white/8 bg-[rgba(7,11,18,0.72)] hover:border-white/16"
                }`}
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
            <p className="text-sm uppercase tracking-[0.16em] text-white/45">Image upload</p>
            <p className="mt-2 text-sm leading-6 text-white/62">Upload a file, copy the returned `/assets/...` path, then paste it into `site`, `releases`, or `gallery` JSON.</p>
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
            {uploadMessage ? <p className="mt-3 text-sm leading-6 text-cyan-100/78">{uploadMessage}</p> : null}
          </div>
        </aside>

        <section className="panel-glow p-4 sm:p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">{activeDocument.filePath}</p>
            <h2 className="mt-2 font-display text-3xl text-white">{activeDocument.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{activeDocument.description}</p>
          </div>
          <form className="grid gap-4" onSubmit={saveDocument}>
            <textarea
              className="min-h-[520px] rounded-[1.2rem] border border-white/10 bg-[rgba(7,11,18,0.94)] p-4 font-mono text-sm leading-7 text-white outline-none transition focus:border-cyan-300/45"
              onChange={(event) => updateDocValue(activeDocument.key, event.target.value)}
              spellCheck={false}
              value={docValues[activeDocument.key]}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button className="cta-primary" disabled={!canSave || isSaving} type="submit">
                {isSaving ? "Saving..." : "Save to GitHub"}
              </button>
              <button
                className="cta-secondary"
                onClick={() => updateDocValue(activeDocument.key, activeDocument.value)}
                type="button"
              >
                Reset editor
              </button>
              {saveState[activeDocument.key] ? <p className="text-sm text-cyan-100/80">{saveState[activeDocument.key]}</p> : null}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
