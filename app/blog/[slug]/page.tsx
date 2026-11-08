import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculator } from "lucide-react";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import ThousandAMonthInDividends, { ThousandAMonthBottomLine } from "@/components/blog/posts/ThousandAMonthInDividends";
import { formatPostDate, getPost, posts } from "@/data/posts";
import { buildMetadata, publisherJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

type Props = { params: { slug: string } };

// Body before the FAQs, and an optional closing section after them.
const bodies: Record<string, { Body: ComponentType; After?: ComponentType }> = {
  "how-much-to-invest-for-1000-a-month-in-dividends": {
    Body: ThousandAMonthInDividends,
    After: ThousandAMonthBottomLine,
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    type: "article",
    absoluteTitle: true,
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  const content = post && bodies[post.slug];
  if (!post || !content) notFound();
  const { Body, After } = content;

  const path = `/blog/${post.slug}`;
  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished: post.published,
    dateModified: post.updated,
    inLanguage: "en-US",
    author: publisherJsonLd,
    publisher: publisherJsonLd,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={postJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PageHeader
        title={post.title}
        intro={post.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]}
        meta={
          <>
            <time dateTime={post.published}>{formatPostDate(post.published)}</time>
            {post.updated !== post.published && (
              <>
                {" "}
                · Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </>
            )}{" "}
            · {post.readingMinutes} min read · General education, not financial or tax advice
          </>
        }
      />

      <div className="container-page py-10">
        <article className="prose-content mx-auto">
          <Body />

          <div className="my-10 flex flex-col items-start gap-3 rounded-xl border border-accent/30 bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="!my-0 text-base">See when your own portfolio could reach your income goal.</p>
            <Link href="/" className="btn-primary !text-white !no-underline">
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Use the Dividend Calculator
            </Link>
          </div>

          <h2>Frequently asked questions</h2>
          <div className="not-prose">
            <FaqList faqs={post.faqs} />
          </div>

          {After && <After />}

          <p className="text-sm text-muted">
            This article is for educational purposes only and is not investment, financial, or tax advice. Projections
            are hypothetical and not guaranteed. See our full <Link href="/disclaimer">disclaimer</Link>.
          </p>
          <p className="text-sm">
            <Link href="/blog">← All blog posts</Link>
          </p>
        </article>
      </div>
    </>
  );
}
