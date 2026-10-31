import Link from "next/link";
import { useId } from "react";
import { siteConfig } from "@/lib/site-config";

/** Brand mark: rising bars with a dividend "coin" landing on the tallest one. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  // Unique per instance: the logo appears in both header and footer.
  const gradientId = `logo-tile-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A7D6C" />
          <stop offset="1" stopColor="#2F5548" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill={`url(#${gradientId})`} />
      <rect x="9" y="25" width="5.5" height="6" rx="1.5" fill="#FFFFFF" fillOpacity="0.55" />
      <rect x="17.25" y="20.5" width="5.5" height="10.5" rx="1.5" fill="#FFFFFF" fillOpacity="0.8" />
      <rect x="25.5" y="16" width="5.5" height="15" rx="1.5" fill="#FFFFFF" />
      <circle cx="28.25" cy="9" r="4.25" fill="#D9B46A" />
      <circle cx="28.25" cy="9" r="2" fill="none" stroke="#B38D45" strokeWidth="1.1" />
    </svg>
  );
}

export default function Logo({ size = "md" }: { size?: "md" | "sm" }) {
  const mark = size === "md" ? "h-9 w-9" : "h-8 w-8";
  const text = size === "md" ? "text-xl" : "text-lg";
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
      <LogoMark className={`${mark} shrink-0 transition-transform group-hover:-translate-y-0.5`} />
      <span className={`font-display ${text} font-medium leading-none tracking-tight text-ink`}>
        Dividend<span className="text-accent"> Calculator</span>
      </span>
    </Link>
  );
}
