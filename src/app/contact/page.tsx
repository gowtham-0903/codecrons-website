import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import CalendlyEmbed from "@/components/contact/CalendlyEmbed";
import LazyScene from "@/components/3d/LazyScene";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Codecrons. Book a call, or send us a message about your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
          {/* Decorative accent — swap for a Spline URL via <SplineEmbed url=… />.
              Kept inside the hero band so it never crowds the form below. */}
          <div
            className="hidden lg:block absolute -top-8 right-4 w-[26rem] h-[26rem] opacity-30 pointer-events-none"
            aria-hidden
          >
            <LazyScene scene="decor" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <Reveal>
              <SectionHeader
                label="Contact"
                title="Let’s build something together"
                subtitle="Whether you have a detailed spec or a rough idea, we would like to hear about it. Book a call or send a message — both reach the same people."
              />
            </Reveal>
          </div>
        </section>

        {/* Form + details */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left — details */}
            <Reveal className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center shrink-0">
                    <Mail size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-fg-muted">
                      Email us
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-accent-orange font-semibold text-lg hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center shrink-0">
                    <Clock size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-fg-muted">
                      Response time
                    </p>
                    <p className="text-fg font-semibold">
                      Within one business day
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-xl bg-accent-teal/10 text-accent-teal flex items-center justify-center shrink-0">
                    <MapPin size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-fg-muted">
                      Where we work
                    </p>
                    <p className="text-fg font-semibold">
                      Remote-first, clients worldwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg-subtle p-6">
                <h3 className="font-bold text-fg mb-2">
                  What happens after you reach out
                </h3>
                <ol className="flex flex-col gap-2.5 text-sm text-fg-muted mt-4">
                  {[
                    "We reply within a business day with initial questions.",
                    "A 30-minute call to understand the problem properly.",
                    "A written scope and fixed price, usually within a week.",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent-purple/10 text-accent-purple text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-2xl border border-border bg-bg p-7 lg:p-8">
                <h2 className="text-2xl font-bold text-fg mb-6">
                  Send a message
                </h2>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Calendly */}
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8">
            <Reveal>
              <SectionHeader
                label="Book a Call"
                title="Grab a time that suits you"
                subtitle="A 30-minute call, no preparation needed. We will ask about the problem and tell you honestly whether we are the right fit."
                align="center"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <CalendlyEmbed />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
