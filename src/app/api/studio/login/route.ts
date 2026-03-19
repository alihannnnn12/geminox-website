import { NextResponse } from "next/server";

import { getStudioSessionValue, isStudioConfigured, STUDIO_SESSION_COOKIE } from "@/lib/studio-auth";

export async function POST(request: Request) {
  if (!isStudioConfigured()) {
    return NextResponse.json({ message: "Studio password is not configured." }, { status: 503 });
  }

  const { password } = (await request.json()) as { password?: string };

  if (!password || password !== process.env.STUDIO_PASSWORD) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: STUDIO_SESSION_COOKIE,
    value: getStudioSessionValue(),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}
