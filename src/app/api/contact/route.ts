import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.ionos.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "465");
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO = process.env.CONTACT_TO ?? "bookings@geminoxbeats.com";
const CONTACT_FROM = process.env.CONTACT_FROM ?? SMTP_USER ?? "bookings@geminoxbeats.com";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP credentials are missing.");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });
  }

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      message?: string;
      name?: string;
    };

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Please fill out your name, email, and inquiry details." }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json({ message: "Enter a valid email address so Geminox can reply." }, { status: 400 });
    }

    const mailer = getTransporter();

    await mailer.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New booking inquiry from ${name}`,
      text: [
        "A new inquiry was sent from the Geminox website.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <p>A new inquiry was sent from the Geminox website.</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}<br /><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
        </div>
      `
    });

    return NextResponse.json({
      message: "Inquiry sent. Geminox will reply from the booking inbox soon."
    });
  } catch (error) {
    console.error("Contact form send failed", error);

    return NextResponse.json(
      {
        message: "The inquiry could not be sent right now. Please email bookings@geminoxbeats.com directly."
      },
      { status: 500 }
    );
  }
}
