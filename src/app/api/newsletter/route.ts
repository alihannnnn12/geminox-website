import { NextResponse } from "next/server";

const KIT_API_URL = "https://api.convertkit.com/v3";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim();

  if (!email) {
    return NextResponse.json({ message: "Enter an email address first." }, { status: 400 });
  }

  const kitApiKey = process.env.KIT_API_KEY;
  const kitFormId = process.env.KIT_FORM_ID;

  if (!kitApiKey || !kitFormId) {
    return NextResponse.json(
      {
        message: "Newsletter is not configured yet. Add KIT_API_KEY and KIT_FORM_ID to .env.local."
      },
      { status: 500 }
    );
  }

  const response = await fetch(`${KIT_API_URL}/forms/${kitFormId}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: kitApiKey,
      email,
      referrer: request.headers.get("referer") ?? "https://www.geminoxbeats.com"
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    let message = "Something went wrong while saving your signup.";

    if (response.status === 401) {
      message = "Kit rejected the API key. Double-check KIT_API_KEY.";
    } else if (response.status === 404) {
      message = "Kit could not find that form. Double-check KIT_FORM_ID.";
    } else if (response.status === 422) {
      message = "That email address could not be added. It may already be invalid or blocked.";
    }

    return NextResponse.json({ message }, { status: response.status });
  }

  return NextResponse.json({
    email,
    message: "You are in. Check your inbox for a confirmation email from Kit."
  });
}
