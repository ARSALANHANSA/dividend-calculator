import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { guides } from "@/data/guides";
import CookieSettingsButton from "@/components/cookies/CookieSettingsButton";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo size="sm" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A free, browser-based tool for estimating dividend income and reinvestment growth, with plain-English
            guides to the numbers behind it.
          </p>
        </div>

        <nav aria-label="Dividend guides">
          <h2 className="text-sm font-semibold text-ink">Dividend guides</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/dividend-guides/${guide.slug}`} className="text-muted hover:text-ink">
                  {guide.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site information">
          <h2 className="text-sm font-semibold text-ink">Site</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/blog" className="text-muted hover:text-ink">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted hover:text-ink">
                FAQ
              </Link>
            </li>
            {siteConfig.legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="text-muted hover:text-ink" />
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs leading-relaxed text-muted sm:flex-row sm:justify-between">
          <p>
            For educational purposes only. Not investment, financial, or tax advice. Projections are hypothetical and
            not guaranteed. <Link href="/disclaimer" className="underline underline-offset-2 hover:text-ink">Read the disclaimer</Link>.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
