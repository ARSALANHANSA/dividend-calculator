import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator } from "lucide-react";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { getGuide, guides } from "@/data/guides";
import { buildMetadata, publisherJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/dividend-guides/${guide.slug}`,
    type: "article",
    absoluteTitle: true,
  });
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const path = `/dividend-guides/${guide.slug}`;
  const related = guide.related.map(getGuide).filter((g) => g !== undefined);
  const reviewed = new Date(`${siteConfig.lastReviewed}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    dateModified: siteConfig.lastReviewed,
    inLanguage: "en-US",
    author: publisherJsonLd,
    publisher: publisherJsonLd,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <PageHeader
        title={guide.title}
        intro={guide.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Dividend Guides", path: "/dividend-guides" },
          { name: guide.shortTitle, path },
        ]}
        meta={<>Last reviewed {reviewed} · General education, not financial or tax advice</>}
      />

      <div className="container-page grid grid-cols-1 gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="prose-content">
          <p className="!mt-0 rounded-xl border border-line bg-surface p-5">
            <strong>In short: </strong>
            {guide.definition}
          </p>

          {guide.formula && (
            <>
              <h2>The formula</h2>
              <div className="not-prose space-y-3">
                {guide.formula.map((f) => (
                  <div key={f.label} className="rounded-xl border border-line bg-surface p-4">
                    <p className="!my-0 text-sm font-medium text-muted">{f.label}</p>
                    <p className="!my-1 font-medium tabular-nums text-ink">{f.expression}</p>
                    {f.note && <p className="!my-0 text-sm text-muted">{f.note}</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <h2>Worked examples</h2>
          {guide.examples.map((ex) => (
            <div key={ex.title} className="my-6 rounded-xl border border-line bg-surface p-5">
              <h3 className="!mt-0">{ex.title}</h3>
              <ol>
                {ex.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p className="!mb-0 rounded-lg bg-accent-soft px-4 py-3 text-base">
                <strong>Result: </strong>
                {ex.result}
              </p>
            </div>
          ))}
          <p className="text-sm text-muted">
            Examples are hypothetical and use round numbers for illustration. They do not describe any real security.
          </p>

          <h2>Common misconceptions</h2>
          <ul>
            {guide.misconceptions.map((m) => (
              <li key={m.myth}>
                <strong>&ldquo;{m.myth}&rdquo;</strong> {m.reality}
              </li>
            ))}
          </ul>

          <div className="my-10 flex flex-col items-start gap-3 rounded-xl border border-accent/30 bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="!my-0 text-base">Run your own numbers with these assumptions.</p>
            <Link href="/" className="btn-primary !text-white !no-underline">
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Use the Dividend Calculator
            </Link>
          </div>

          <h2>Frequently asked questions</h2>
          <div className="not-prose">
            <FaqList faqs={guide.faqs} />
          </div>

          <h2>Sources</h2>
          <ul className="text-base">
            {guide.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <h2>Next step</h2>
          <p>
            {related[0] ? (
              <>
                Continue with{" "}
                <Link href={`/dividend-guides/${related[0].slug}`}>{related[0].shortTitle.toLowerCase()}</Link>, or
                plug what you&apos;ve learned into the <Link href="/">dividend calculator</Link> and compare a few
                scenarios.
              </>
            ) : (
              <>
                Plug what you&apos;ve learned into the <Link href="/">dividend calculator</Link>.
              </>
            )}
          </p>
        </article>

        <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="Related guides">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink">Related guides</h2>
            <ul className="mt-3 space-y-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={`/dividend-guides/${g.slug}`} className="group flex items-start gap-2 text-sm">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-ink group-hover:text-accent group-hover:underline">{g.shortTitle}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dividend-guides" className="group flex items-start gap-2 text-sm">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-ink group-hover:text-accent group-hover:underline">All dividend guides</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
