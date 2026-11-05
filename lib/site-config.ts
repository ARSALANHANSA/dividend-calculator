// Public site configuration. Nothing here is secret, so it lives in code
// instead of environment variables.

export type NavLink = { href: string; label: string };

export const siteConfig = {
  name: "Dividend Calculator",
  url: "https://dividend-calculator.pro",
  locale: "en_US",
  language: "en",
  description:
    "Free dividend calculator for estimating dividend income, DRIP reinvestment growth, and yield on cost. Runs entirely in your browser.",
  // Public contact address shown on the contact and legal pages. Set to null
  // to hide it; the contact page then says no address has been published.
  contactEmail: "arsalooa@gmail.com" as string | null,
  // Google Search Console ownership token (public by design).
  googleSiteVerification: "28hWSdkSRnHyaAx7EjMfjosdquDuMwRrVFOUm4ckweg",
  // Date the content was last reviewed. Update when guides are revised.
  lastReviewed: "2026-11-01",
  mainNav: [
    { href: "/", label: "Calculator" },
    { href: "/dividend-guides", label: "Dividend Guides" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
  ] satisfies NavLink[],
  legalNav: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms and Conditions" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/disclaimer", label: "Disclaimer" },
  ] satisfies NavLink[],
};

export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}
