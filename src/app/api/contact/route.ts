import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * POST { name, email, subject?, message, company? }
 *   → 200 { ok: true }
 *   → 400 { ok: false, error, fieldErrors? }
 *   → 429 { ok: false, error }   (rate limited)
 *   → 500 { ok: false, error }
 *
 * Requires RESEND_API_KEY in .env.local. The `from` address must be on a
 * domain verified in the Resend dashboard — see CONTACT_FROM below.
 */

// Must be a verified sending domain in Resend. Falls back to Resend's shared
// testing sender, which only delivers to the account owner's own address.
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Codecrons Website <onboarding@resend.dev>";

/**
 * Very small in-memory rate limit: 5 submissions per IP per 10 minutes.
 * Per-instance only — swap for Upstash/Redis if you deploy to multiple
 * regions and want this enforced globally.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/** Escapes user input before it goes into the HTML email body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(clientIp(req))) {
      return NextResponse.json(
        { ok: false, error: "Too many messages. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please check the form and try again.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message, company } = parsed.data;

    // Honeypot tripped — accept silently so bots do not learn they were caught.
    if (company) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Fail loudly in the server log rather than pretending the mail was sent.
      console.error(
        "[contact] RESEND_API_KEY is not set — message was not delivered.",
      );
      return NextResponse.json(
        {
          ok: false,
          error:
            "The contact form is not configured yet. Please email us directly.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const heading = subject?.trim()
      ? `${subject.trim()} — from ${name}`
      : `New enquiry from ${name}`;

    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: site.email,
      replyTo: email,
      subject: heading,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        subject ? `Subject: ${subject}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 16px">${escapeHtml(heading)}</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${subject ? `<p style="margin:0 0 4px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "We could not send your message. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
