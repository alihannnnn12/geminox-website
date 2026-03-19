import { cookies } from "next/headers";

import { StudioDashboard } from "@/components/studio/studio-dashboard";
import { StudioLogin } from "@/components/studio/studio-login";
import { isGithubStudioConfigured } from "@/lib/github-content";
import { isStudioConfigured, isStudioCookieStoreAuthenticated } from "@/lib/studio-auth";
import { getStudioDocument, studioDocumentKeys, studioDocumentMeta } from "@/lib/studio-content";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  if (!isStudioConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="panel-glow p-6 sm:p-8">
          <p className="eyebrow mb-2">Studio</p>
          <h1 className="font-display text-4xl text-white">Studio password is not configured yet.</h1>
          <p className="mt-4 text-base leading-8 text-white/68">
            Add `STUDIO_PASSWORD` in your local `.env.local` and in Vercel before trying to open this hidden route.
          </p>
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();

  if (!isStudioCookieStoreAuthenticated(cookieStore)) {
    return <StudioLogin />;
  }

  const documents = studioDocumentKeys.map((key) => ({
    content: getStudioDocument(key),
    description: studioDocumentMeta[key].description,
    filePath: studioDocumentMeta[key].filePath,
    key,
    title: studioDocumentMeta[key].title,
  }));

  return <StudioDashboard canSave={isGithubStudioConfigured()} documents={documents} />;
}
