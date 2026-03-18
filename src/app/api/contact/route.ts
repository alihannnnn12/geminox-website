import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    message?: string;
    name?: string;
  };

  return NextResponse.json({
    body,
    message:
      "Inquiry captured in local preview mode. Replace src/app/api/contact/route.ts with your real form delivery service later."
  });
}
