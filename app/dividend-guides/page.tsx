import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { guides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dividend Guides: Yield, DRIP, Growth, Taxes and More",
  description:
    "Plain-English guides to dividend yield, DRIP, dividend growth, payout ratio, ex-dividend dates, dividend taxes, and JEPQ and VYM dividends.",
  path: "/dividend-guides",
  absoluteTitle: true,
});

export default function GuidesIndexPage() {
  return (
    <>
      <PageHeader
        title="Dividend guides"
        intro="Each guide explains one concept behind the Dividend Calculator, with the formula, hypothetical worked examples, and common misconceptions."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Dividend Guides", path: "/dividend-guides" },
        ]}
      />
      <div className="container-page py-10">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/dividend-guides/${guide.slug}`}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-accent/40"
              >
                <h2 className="font-display text-xl font-medium text-ink group-hover:text-accent">{guide.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{guide.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted">
          Ready to run the numbers? <Link href="/" className="link">Open the Dividend Calculator</Link>.
        </p>
      </div>
    </>
  );
}
