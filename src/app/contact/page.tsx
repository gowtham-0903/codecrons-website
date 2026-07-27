import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Contact — Codecrons",
  description: "Get in touch with Codecrons. Book a call or send us a message.",
};

// TODO: Implement Contact page
//
// Layout: 2 columns on desktop, stacked on mobile
// Left column:
//   - SectionHeader (label: "Contact", title: "Let's Talk")
//   - Email link: hi@codecrons.com
//   - Calendly inline embed (see below)
//   - Optional: Spline decorative scene behind/beside the section
// Right column:
//   - Contact form component (create src/components/ContactForm.tsx)
//   - Fields: Name, Email, Subject (optional), Message
//   - Submit calls POST /api/contact
//   - Show success / error state after submission
//
// Calendly inline embed:
//   Install: npm install react-calendly
//   <InlineWidget url="https://calendly.com/codecrons" styles={{ height: "630px" }} />
//   Wrap in a "use client" wrapper component since InlineWidget is a client component
//
// Spline scene: SplineEmbed component, add scene URL when available

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-bg">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <SectionHeader
              label="Contact"
              title="Let's Build Something Together"
              subtitle="Whether you have a project in mind or just want to explore possibilities — we'd love to hear from you."
            />
            <div className="flex flex-col gap-2">
              <p className="text-fg-muted text-sm font-medium uppercase tracking-widest">Email us</p>
              <a
                href="mailto:hi@codecrons.com"
                className="text-accent-orange font-semibold text-lg hover:underline"
              >
                hi@codecrons.com
              </a>
            </div>

            {/* TODO: Add Calendly inline embed here */}
            <div className="border border-border rounded-2xl p-8 bg-bg-subtle min-h-[200px] flex items-center justify-center">
              <p className="text-fg-muted text-sm text-center">
                TODO: Add Calendly InlineWidget here<br />
                URL: https://calendly.com/codecrons
              </p>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-fg">Send a Message</h2>
            {/* TODO: Replace with <ContactForm /> component */}
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-border rounded-xl text-fg placeholder:text-fg-muted bg-bg-subtle focus:outline-none focus:border-accent-purple"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-border rounded-xl text-fg placeholder:text-fg-muted bg-bg-subtle focus:outline-none focus:border-accent-purple"
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-xl text-fg placeholder:text-fg-muted bg-bg-subtle focus:outline-none focus:border-accent-purple resize-none"
              />
              {/* TODO: wire up to /api/contact via React Hook Form + Zod */}
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-accent-orange text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
