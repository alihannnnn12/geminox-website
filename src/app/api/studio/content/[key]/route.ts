import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { updateRepoFile } from "@/lib/github-content";
import { isStudioCookieStoreAuthenticated } from "@/lib/studio-auth";
import { getStudioDocument, isStudioDocumentKey, studioDocumentMeta } from "@/lib/studio-content";

type Context = {
  params: Promise<{
    key: string;
  }>;
};

function unauthorizedResponse() {
  return NextResponse.json({ message: "Studio authentication required." }, { status: 401 });
}

export async function GET(_: Request, context: Context) {
  const cookieStore = await cookies();

  if (!isStudioCookieStoreAuthenticated(cookieStore)) {
    return unauthorizedResponse();
  }

  const { key } = await context.params;

  if (!isStudioDocumentKey(key)) {
    return NextResponse.json({ message: "Unknown studio document." }, { status: 404 });
  }

  return NextResponse.json({
    content: getStudioDocument(key),
    key,
    meta: studioDocumentMeta[key]
  });
}

export async function PUT(request: Request, context: Context) {
  const cookieStore = await cookies();

  if (!isStudioCookieStoreAuthenticated(cookieStore)) {
    return unauthorizedResponse();
  }

  const { key } = await context.params;

  if (!isStudioDocumentKey(key)) {
    return NextResponse.json({ message: "Unknown studio document." }, { status: 404 });
  }

  const payload = (await request.json()) as { content?: unknown };

  if (payload.content === undefined) {
    return NextResponse.json({ message: "Content payload is required." }, { status: 400 });
  }

  const serialized = `${JSON.stringify(payload.content, null, 2)}\n`;

  try {
    await updateRepoFile({
      content: serialized,
      message: `Update studio content: ${key}`,
      path: studioDocumentMeta[key].filePath
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Studio save failed.";

    return NextResponse.json({ message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Saved to GitHub. Vercel will redeploy automatically.",
    ok: true
  });
}
