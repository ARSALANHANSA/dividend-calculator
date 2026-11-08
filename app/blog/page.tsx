import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { formatPostDate, posts } from "@/data/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dividend Investing Blog: Income Goals, Strategy and Examples",
  description:
    "Articles on dividend income goals, reinvestment, taxes, and building a dividend portfolio, with worked numbers you can check in the Dividend Calculator.",
  path: "/blog",
  absoluteTitle: true,
});

export default function BlogIndexPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        intro="Practical articles on dividend income, with the math shown and numbers you can rerun in the calculator."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <div className="container-page py-10">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-accent/40"
              >
                <p className="text-xs text-muted">
                  <time dateTime={post.published}>{formatPostDate(post.published)}</time> · {post.readingMinutes} min read
                </p>
                <h2 className="mt-2 font-display text-xl font-medium text-ink group-hover:text-accent">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted">
          New to dividends? Start with the <Link href="/dividend-guides" className="link">dividend guides</Link>.
        </p>
      </div>
    </>
  );
}
