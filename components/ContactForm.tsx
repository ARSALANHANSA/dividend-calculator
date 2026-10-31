"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

/**
 * Builds a mailto: link from the form fields. Nothing is submitted to a
 * server, so the form never claims a message was sent.
 */
export default function ContactForm({ email }: { email: string }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please write a message first.");
      return;
    }
    setError("");
    const params = new URLSearchParams({ subject: subject.trim() || "Dividend Calculator feedback", body: message });
    // URLSearchParams encodes spaces as "+", which some mail apps show literally.
    window.location.href = `mailto:${email}?${params.toString().replace(/\+/g, "%20")}`;
    setOpened(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="card max-w-xl space-y-4 p-5">
      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-ink">
          Subject <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="contact-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="field-input" />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "contact-message-error" : undefined}
          className="field-input"
        />
        {error && (
          <p id="contact-message-error" className="mt-1.5 text-xs font-medium text-danger">
            {error}
          </p>
        )}
      </div>
      <button type="submit" className="btn-primary">
        <Mail className="h-4 w-4" aria-hidden="true" />
        Open in my email app
      </button>
      <p role="status" className="text-sm text-muted">
        {opened &&
          "We tried to open your email app with this message. It has not been sent. Please review and send it from your email app."}
      </p>
    </form>
  );
}
