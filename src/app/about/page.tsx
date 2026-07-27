import type { Metadata } from "next";
import { Eye, Gauge, Gem, Lightbulb, type LucideIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/layout/CTASection";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LazyScene from "@/components/3d/LazyScene";
import TechStack from "@/components/home/TechStack";
import { team, values } from "@/data/team";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Codecrons is a remote-first, full-stack product studio. Our story, values, team, and the technology we build on.",
  alternates: { canonical: "/about" },
};

const VALUE_ICONS: Record<string, LucideIcon> = {
  Gem,
  Gauge,
  Eye,
  Lightbulb,
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero + globe */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />

          <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="flex flex-col gap-6">
                <SectionHeader
                  label="About Us"
                  title="A studio built around shipping"
                  subtitle="Codecrons is a full-stack product studio — software agency, SaaS builder, AI integrator, and automation specialist in one team."
                />
                <Button href={site.bookCallUrl} size="lg" className="self-start">
                  Work With Us
                </Button>
              </div>
            </Reveal>

            {/* `hidden lg:block` lives on the Reveal itself — on a wrapped
                child it would leave this element permanently translated on
                mobile, since a zero-height box never triggers whileInView. */}
            <Reveal direction="left" delay={0.15} className="hidden lg:block">
              {/* Draggable — pointer events stay on so visitors can spin it */}
              <div className="relative h-[500px] scene-glow">
                <LazyScene scene="globe" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 border-y border-border bg-bg-subtle">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-7">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent-orange">
                  Our Story
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-fg leading-tight text-balance">
                  We started because good software kept arriving late
                </h2>
                <div className="flex flex-col gap-4 text-fg-muted leading-relaxed text-pretty">
                  <p>
                    Codecrons began with a pattern we kept running into: capable
                    teams stuck with software that took twice as long as
                    promised and did roughly half of what was agreed. Usually
                    not because anyone was careless — because scope was never
                    pinned down, and nobody wanted to be the one to say so.
                  </p>
                  <p>
                    So we built the studio around the opposite habit. Every
                    engagement opens with a scoping phase that produces a
                    written plan and a fixed price. You see working software
                    weekly on a staging environment, not a demo at the end. And
                    you talk to the engineers doing the work, not an account
                    manager relaying messages.
                  </p>
                  <p>
                    We are remote-first and deliberately small. That keeps the
                    people who scoped your project as the people who build it —
                    and means we take on work we can actually finish well.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.15} className="lg:col-span-5">
              <blockquote className="h-full flex flex-col justify-center bg-fg rounded-2xl p-8 lg:p-10">
                <p className="font-serif text-2xl lg:text-3xl text-bg leading-snug text-balance">
                  “Fixed scope, fixed price, and the engineers on the call.”
                </p>
                <footer className="text-bg/50 text-sm mt-6">
                  How we have worked since day one.
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
            <Reveal>
              <SectionHeader
                label="Values"
                title="What we stand for"
                subtitle="Four commitments that decide how we scope, build, and hand over."
                align="center"
              />
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => {
                const Icon = VALUE_ICONS[value.icon] ?? Gem;
                return (
                  <Reveal key={value.title} delay={i * 0.1}>
                    <div className="h-full border border-border rounded-2xl p-7 bg-bg transition-all duration-300 hover:border-accent-purple hover:shadow-lg hover:-translate-y-1">
                      <span className="inline-flex w-11 h-11 rounded-xl bg-accent-purple/10 text-accent-purple items-center justify-center mb-4">
                        <Icon size={20} />
                      </span>
                      <h3 className="font-bold text-fg mb-2">{value.title}</h3>
                      <p className="text-fg-muted text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team — hidden entirely while data/team.ts is empty */}
        {team.length > 0 && (
          <section className="py-20 bg-bg-subtle border-y border-border">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
              <Reveal>
                <SectionHeader
                  label="Team"
                  title="The people behind Codecrons"
                  align="center"
                />
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, i) => (
                  <Reveal key={member.id} delay={i * 0.1}>
                    <div className="h-full bg-bg border border-border rounded-2xl p-7 text-center flex flex-col items-center gap-3">
                      <span
                        className="w-16 h-16 rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold"
                        aria-hidden
                      >
                        {initials(member.name)}
                      </span>
                      <div>
                        <h3 className="font-bold text-fg">{member.name}</h3>
                        <p className="text-accent-orange text-xs font-semibold mt-0.5">
                          {member.role}
                        </p>
                      </div>
                      <p className="text-fg-muted text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <TechStack />

        <CTASection
          title="Want to work with us?"
          subtitle="We take on a small number of projects at a time. Tell us about yours and we will be straight with you about fit and timing."
        />
      </main>
      <Footer />
    </>
  );
}
