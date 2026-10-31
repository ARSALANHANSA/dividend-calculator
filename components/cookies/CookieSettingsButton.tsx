"use client";

import { openCookieSettings } from "@/lib/consent";

export default function CookieSettingsButton({
  className,
  label = "Cookie Settings",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {label}
    </button>
  );
}
