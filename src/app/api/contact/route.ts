// TODO: Implement contact form API endpoint
//
// This route receives POST requests from the contact form on /contact
// Validates the body with Zod, then sends an email to hi@codecrons.com via Resend
//
// Setup:
//   1. npm install resend zod
//   2. Create a Resend account at resend.com (free tier available)
//   3. Add RESEND_API_KEY to .env.local
//   4. Verify your sending domain (codecrons.com) in Resend dashboard
//
// Request body: { name: string, email: string, message: string }
// Response: { ok: true } or { ok: false, error: string }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // TODO: validate body with Zod schema
    // const parsed = contactSchema.safeParse(body);
    // if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });

    // TODO: send email with Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "website@codecrons.com",
    //   to: "hi@codecrons.com",
    //   subject: `New message from ${body.name}`,
    //   text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
