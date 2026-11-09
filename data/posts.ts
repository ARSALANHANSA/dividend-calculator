import type { BlogPost } from "@/types/content";

// Newest first. Each post's body lives in components/blog/posts and is mapped
// to its slug in app/blog/[slug]/page.tsx.
export const posts: BlogPost[] = [
  {
    slug: "how-much-dividend-income-does-100000-generate",
    title: "How Much Dividend Income Does $100,000 Generate?",
    metaTitle: "How Much Dividend Income Does $100,000 Generate?",
    metaDescription:
      "$100,000 pays about $2,000 to $8,000 a year in dividends. See income at every yield, after-tax figures, and how DRIP grows it over 20 years.",
    summary:
      "Income from $100,000 at every common yield, what you keep after taxes, and a 20-year projection with and without reinvestment.",
    published: "2026-11-10",
    updated: "2026-11-10",
    readingMinutes: 8,
    faqs: [
      {
        question: "How much does $100,000 in dividend stocks pay per month?",
        answer:
          "At a 3% yield, about $250 a month; at 4%, about $333; at 6%, about $500. These are averages. Most stocks pay quarterly, so you'd get larger payments four times a year.",
      },
      {
        question: "Can you live off dividends from $100,000?",
        answer:
          "Not on its own for most people. At a 4% yield it pays $4,000 a year. It can cover a specific bill, such as a phone plan or utilities, and it grows if you keep reinvesting and adding money.",
      },
      {
        question: "How much do I need to invest to make $1,000 a month?",
        answer:
          "About $300,000 at a 4% yield, or $240,000 at 5%, before taxes. We break it down by yield and timeline in how much to invest for $1,000 a month in dividends.",
      },
      {
        question: "Is it better to take the cash or reinvest?",
        answer:
          "If you don't need the income yet, reinvesting usually builds far more income over time, as the 20-year table above shows. If you need the money now, taking the cash is fine. The calculator shows both outcomes side by side.",
      },
      {
        question: "What does $100,000 in VYM or JEPQ pay?",
        answer:
          "It depends on each fund's current yield, which changes over time. Use the preset VYM dividend calculator or JEPQ dividend calculator and enter 100000 as your investment.",
      },
      {
        question: "When do I get paid?",
        answer:
          "You must own the shares before the ex-dividend date to receive the next payment. Our ex-dividend date guide explains the four key dates.",
      },
    ],
  },
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
