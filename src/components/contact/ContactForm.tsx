"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASSES =
  "w-full px-4 py-3 border rounded-xl text-fg placeholder:text-fg-muted/60 bg-bg-subtle transition-colors focus:outline-none focus:border-accent-purple";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setServerError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      reset();
      setStatus("success");
    } catch {
      setServerError(
        "We could not reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-accent-teal/30 bg-accent-teal/5 rounded-2xl p-8 text-center flex flex-col items-center gap-3"
        role="status"
      >
        <CheckCircle2 size={32} className="text-accent-teal" />
        <h3 className="font-bold text-fg text-lg">Message sent</h3>
        <p className="text-fg-muted text-sm max-w-sm">
          Thanks for getting in touch — we read every message and usually reply
          within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-accent-orange font-semibold text-sm mt-2 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from users, catches naive bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-fg">
            Name <span className="text-accent-orange">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(FIELD_CLASSES, errors.name ? "border-accent-orange" : "border-border")}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-accent-orange text-xs">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-fg">
            Email <span className="text-accent-orange">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(FIELD_CLASSES, errors.email ? "border-accent-orange" : "border-border")}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-accent-orange text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-fg">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="What is this about?"
          className={cn(FIELD_CLASSES, "border-border")}
          {...register("subject")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-fg">
          Message <span className="text-accent-orange">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us about your project — what you are building, roughly when you need it, and any constraints we should know about."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            FIELD_CLASSES,
            "resize-none",
            errors.message ? "border-accent-orange" : "border-border",
          )}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-accent-orange text-xs">
            {errors.message.message}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="flex items-start gap-2 text-sm text-accent-orange bg-accent-orange/5 border border-accent-orange/20 rounded-xl p-3"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>
              {serverError} You can always reach us at{" "}
              <a href={`mailto:${site.email}`} className="underline font-medium">
                {site.email}
              </a>
              .
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-orange text-white font-semibold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none self-start"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send size={15} />
          </>
        )}
      </button>

      <p className="text-fg-muted text-xs">
        We reply within one business day. No newsletters, no follow-up
        sequences.
      </p>
    </form>
  );
}
