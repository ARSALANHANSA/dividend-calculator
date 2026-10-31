"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  saveConsent,
  type ConsentPreferences,
  type OptionalCategory,
} from "@/lib/consent";

const OPTIONAL_CATEGORIES: { id: OptionalCategory; name: string; description: string }[] = [
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Would help us understand how visitors use the site. No analytics service is installed today, so turning this on currently has no effect.",
  },
  {
    id: "marketing",
    name: "Marketing",
    description:
      "Would allow advertising or marketing measurement. No marketing or advertising scripts are installed today, so turning this on currently has no effect.",
  },
];

const ALL_OFF: ConsentPreferences = { analytics: false, marketing: false };
const ALL_ON: ConsentPreferences = { analytics: true, marketing: true };

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [draft, setDraft] = useState<ConsentPreferences>(ALL_OFF);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Read stored choice after mount so server and client markup match.
  useEffect(() => {
    setShowBanner(readConsent() === null);
  }, []);

  const openSettings = useCallback(() => {
    const stored = readConsent();
    setDraft(stored ? { analytics: stored.analytics, marketing: stored.marketing } : ALL_OFF);
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, [openSettings]);

  const commit = (preferences: ConsentPreferences) => {
    saveConsent(preferences);
    setShowBanner(false);
    dialogRef.current?.close();
  };

  return (
    <>
      {showBanner && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface shadow-[0_-4px_16px_rgba(34,33,31,0.06)]"
        >
          <div className="container-page flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-3xl text-sm leading-relaxed text-ink/85">
              We use your browser&apos;s local storage only to remember this choice. We do not currently use analytics
              or advertising cookies. Calculator inputs never leave your device. See our{" "}
              <Link href="/privacy-policy" className="link">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/cookie-policy" className="link">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button type="button" className="btn-secondary" onClick={openSettings}>
                Cookie Settings
              </button>
              <button type="button" className="btn-secondary" onClick={() => commit(ALL_OFF)}>
                Reject Optional
              </button>
              <button type="button" className="btn-primary" onClick={() => commit(ALL_ON)}>
                Accept All
              </button>
            </div>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        className="w-[min(36rem,calc(100%-2rem))] rounded-xl border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-ink/40"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cookie-settings-title" className="font-display text-xl font-medium">
            Cookie settings
          </h2>
          <button
            type="button"
            className="rounded-md p-1.5 text-muted hover:bg-paper hover:text-ink"
            onClick={() => dialogRef.current?.close()}
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close cookie settings</span>
          </button>
        </div>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto px-5 py-4 text-sm leading-relaxed">
          <p className="text-ink/80">
            Choose which optional categories you allow. You can change or withdraw your choice at any time from the
            &ldquo;Cookie Settings&rdquo; link in the footer.
          </p>

          <div className="rounded-lg border border-line p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-medium">Necessary storage</h3>
              <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs text-muted">Always on</span>
            </div>
            <p className="mt-2 text-muted">
              One local storage entry (<code className="text-xs">dc_cookie_consent</code>) that remembers your choice
              on this page. It contains no personal or financial information and is never sent to a server.
            </p>
          </div>

          {OPTIONAL_CATEGORIES.map((category) => (
            <div key={category.id} className="rounded-lg border border-line p-4">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor={`consent-${category.id}`} className="font-medium">
                  {category.name} <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id={`consent-${category.id}`}
                  type="checkbox"
                  role="switch"
                  className="h-5 w-5 accent-accent"
                  checked={draft[category.id]}
                  onChange={(e) => setDraft((d) => ({ ...d, [category.id]: e.target.checked }))}
                  aria-describedby={`consent-${category.id}-desc`}
                />
              </div>
              <p id={`consent-${category.id}-desc`} className="mt-2 text-muted">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-line px-5 py-4">
          <button type="button" className="btn-secondary" onClick={() => commit(ALL_OFF)}>
            Reject Optional
          </button>
          <button type="button" className="btn-secondary" onClick={() => commit(ALL_ON)}>
            Accept All
          </button>
          <button type="button" className="btn-primary" onClick={() => commit(draft)}>
            Save Preferences
          </button>
        </div>
      </dialog>
    </>
  );
}
