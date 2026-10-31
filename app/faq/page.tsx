import Link from "next/link";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { siteFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about Dividend Calculator: privacy, how results compare to your brokerage, using it for ETFs, and where the guide information comes from.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader
        title="Frequently asked questions"
        intro="About the site, your privacy, and how to interpret the calculator. Questions about specific results are also answered below the calculator."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <div className="container-page py-10">
        <div className="max-w-prose">
          <FaqList faqs={siteFaqs} headingLevel={2} />
          <p className="mt-8 text-sm leading-relaxed text-muted">
            For concepts like yield, DRIP, and taxes, see the <Link href="/dividend-guides" className="link">dividend guides</Link>.
            Still have a question? <Link href="/contact" className="link">Contact us</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
