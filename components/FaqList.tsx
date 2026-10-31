import type { Faq } from "@/types/content";

/** Native <details> accordion: accessible and needs no client JavaScript. */
export default function FaqList({ faqs, headingLevel = 3 }: { faqs: Faq[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-surface">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
            <Heading className="text-base font-medium text-ink">{faq.question}</Heading>
            <span
              aria-hidden="true"
              className="mt-0.5 text-lg leading-none text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
