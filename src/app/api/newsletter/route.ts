import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim();

  return NextResponse.json({
    email,
    message:
      "Captured in local preview mode. Connect Mailchimp or Kit in src/app/api/newsletter/route.ts when you are ready."
  });
}
