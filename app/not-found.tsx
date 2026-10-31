import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        The link may be broken, or the page may have moved. Here are some places to go instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Go to the Dividend Calculator
        </Link>
        <Link href="/dividend-guides" className="btn-secondary">
          Browse dividend guides
        </Link>
      </div>
      <h2 className="mt-12 text-sm font-semibold text-ink">Popular guides</h2>
      <ul className="mt-3 space-y-2">
        {guides.slice(0, 5).map((g) => (
          <li key={g.slug}>
            <Link href={`/dividend-guides/${g.slug}`} className="link">
              {g.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
