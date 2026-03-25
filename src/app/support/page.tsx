"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";

export default function SupportPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "contact", ...data }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to submit");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-2 h-2 rounded-full bg-secondary-container signal-dot" />
        <span className="text-secondary font-[var(--font-label)] text-xs tracking-widest uppercase font-bold">
          Support Channel Open
        </span>
      </div>
      <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
        Contact Support
      </h1>
      <p className="text-on-surface-variant mb-12">
        Have a question or need help? Fill out the form below and our team will
        get back to you within 24 hours.
      </p>

      {status === "success" && (
        <div className="mb-8 p-4 bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold">
          Your message has been sent successfully. We&apos;ll be in touch soon.
        </div>
      )}
      {status === "error" && (
        <div className="mb-8 p-4 bg-error/10 border border-error/20 text-error text-sm font-bold">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full bg-surface-container-lowest border border-outline-variant/20 text-sm px-4 py-3 text-on-surface focus:ring-1 focus:ring-tertiary focus:border-tertiary"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full bg-surface-container-lowest border border-outline-variant/20 text-sm px-4 py-3 text-on-surface focus:ring-1 focus:ring-tertiary focus:border-tertiary"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Subject
          </label>
          <input
            id="subject"
            {...register("subject")}
            className="w-full bg-surface-container-lowest border border-outline-variant/20 text-sm px-4 py-3 text-on-surface focus:ring-1 focus:ring-tertiary focus:border-tertiary"
            placeholder="What's this about?"
          />
          {errors.subject && <p className="mt-1 text-xs text-error">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            className="w-full bg-surface-container-lowest border border-outline-variant/20 text-sm px-4 py-3 text-on-surface focus:ring-1 focus:ring-tertiary focus:border-tertiary resize-none"
            placeholder="Tell us more..."
          />
          {errors.message && <p className="mt-1 text-xs text-error">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
