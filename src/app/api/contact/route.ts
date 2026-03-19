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
      "Your inquiry has been received. For the fastest response, you can also email bookings@geminoxbeats.com directly."
  });
}
