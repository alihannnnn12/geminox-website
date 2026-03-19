import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createUploadPath, updateRepoFile } from "@/lib/github-content";
import { isStudioCookieStoreAuthenticated } from "@/lib/studio-auth";

function unauthorizedResponse() {
  return NextResponse.json({ message: "Studio authentication required." }, { status: 401 });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();

  if (!isStudioCookieStoreAuthenticated(cookieStore)) {
    return unauthorizedResponse();
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Choose an image first." }, { status: 400 });
  }

  const uploadPath = createUploadPath(file.name);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    await updateRepoFile({
      alreadyEncoded: true,
      content: buffer.toString("base64"),
      message: `Upload studio asset: ${file.name}`,
      path: uploadPath
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image upload failed.";

    return NextResponse.json({ message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Image uploaded. Paste this path into your JSON content and save that document next.",
    path: uploadPath.replace(/^public/, "")
  });
}
