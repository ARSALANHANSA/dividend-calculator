export type Faq = { question: string; answer: string };

export type Source = { label: string; url: string };

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type WorkedExample = {
  title: string;
  steps: string[];
  result: string;
};

export type Guide = {
  slug: string;
  /** Used in navigation and cards. */
  shortTitle: string;
  /** The page H1. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  definition: string;
  formula?: { label: string; expression: string; note?: string }[];
  sections: GuideSection[];
  examples: WorkedExample[];
  misconceptions: { myth: string; reality: string }[];
  faqs: Faq[];
  related: string[];
  sources: Source[];
};
