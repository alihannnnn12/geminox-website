import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    message?: string;
    name?: string;
  };

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Geminox Contact <onboarding@resend.dev>",
    to: "bookings@geminoxbeats.com",
    replyTo: email,
    subject: `Booking inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  });

  if (error) {
    return NextResponse.json({ message: "Failed to send. Please email bookings@geminoxbeats.com directly." }, { status: 500 });
  }

  return NextResponse.json({
    message: "Inquiry sent. Geminox will follow up from the booking inbox."
  });
}
