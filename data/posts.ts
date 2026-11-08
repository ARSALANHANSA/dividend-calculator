import type { BlogPost } from "@/types/content";

// Newest first. Each post's body lives in components/blog/posts and is mapped
// to its slug in app/blog/[slug]/page.tsx.
export const posts: BlogPost[] = [
  {
    slug: "how-much-to-invest-for-1000-a-month-in-dividends",
    title: "How Much Do You Need to Invest to Make $1,000 a Month in Dividends?",
    metaTitle: "How Much to Invest for $1,000 a Month in Dividends",
    metaDescription:
      "You need about $300,000 at a 4% yield to earn $1,000 a month in dividends. See the formula, a table for every yield, timelines, and the effect of taxes.",
    summary:
      "The formula, the amount needed at every common yield, how long it takes with monthly contributions and DRIP, and how taxes change the target.",
    published: "2026-11-08",
    updated: "2026-11-08",
    readingMinutes: 7,
    faqs: [
      {
        question: "How much do I need to invest to make $500 a month in dividends?",
        answer: "About $150,000 at a 4% yield. $500 a month is $6,000 a year, and $6,000 ÷ 0.04 = $150,000.",
      },
      {
        question: "How much do I need for $2,000 a month in dividends?",
        answer: "About $600,000 at a 4% yield, or $400,000 at a 6% yield. Divide $24,000 by your yield.",
      },
      {
        question: "How much does $100,000 pay in dividends per month?",
        answer: "At a 4% yield, $100,000 pays about $4,000 a year, or roughly $333 a month before taxes. At 3% it's $250 a month.",
      },
      {
        question: "Can I get paid every month?",
        answer:
          "Yes. Some stocks, REITs, and funds pay monthly, and you can also combine quarterly payers with different schedules. The payout frequency guide explains how schedules affect each payment.",
      },
      {
        question: "Is $1,000 a month in dividends realistic?",
        answer:
          "For many investors, yes, with time. Investing $1,000 a month into a 4% yielder with moderate dividend growth could get there in about 13 years in our example. Results depend on markets, and dividends are never guaranteed.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
