import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Who runs Dividend Calculator, how the calculator and guides are built and reviewed, and what the site does and does not do.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <ContentPage
      title="About Us"
      path="/about"
      intro="A free, independent tool for understanding dividend income, built to be transparent about how it works."
    >
      <h2>What this site is</h2>
      <p>
        Dividend Calculator is a free website that helps people estimate dividend income and see how reinvesting
        dividends, dividend growth, and regular contributions could affect an investment over time. Alongside the
        calculator, we publish plain-English guides to the concepts behind each input.
      </p>
      <p>
        The site is aimed at adult investors in the United States, especially beginners who want to understand the math
        before making their own decisions or talking to a professional.
      </p>

      <h2>How the calculator works</h2>
      <p>
        The calculator simulates each month of the period you choose. It pays dividends on the months that match the
        payout frequency, applies any tax rate you enter, reinvests the remainder if dividend reinvestment is switched on,
        and adds contributions. Dividend growth is applied once a year and share price growth evenly each month. The full
        set of formulas is shown on the <Link href="/">calculator page</Link>.
      </p>
      <p>
        The calculation code is tested against hand-calculated examples covering reinvestment, dividend growth, taxes,
        contributions, and every payout frequency. All calculations run in your browser. Nothing you type is sent to us.
      </p>

      <h2>How the guides are written</h2>
      <p>
        The guides are written and maintained by the Dividend Calculator site team. Factual and tax statements are checked
        against official sources, mainly the SEC&apos;s Investor.gov and IRS publications, and those sources are linked
        on each guide. Worked examples are hypothetical and use round numbers so you can follow the arithmetic.
      </p>
      <p>
        We are not a registered investment adviser, broker-dealer, or tax preparer, and we do not claim professional
        financial credentials. Our goal is to explain concepts clearly and accurately, not to tell anyone what to buy.
      </p>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t recommend stocks, funds, or investment strategies.</li>
        <li>We don&apos;t provide personalized investment, financial, or tax advice.</li>
        <li>We don&apos;t sell products, take payments, or require accounts.</li>
        <li>We don&apos;t run analytics or advertising scripts on the site.</li>
      </ul>

      <h2>Corrections and feedback</h2>
      <p>
        If you spot a mistake in a calculation or guide, please tell us through the <Link href="/contact">contact page</Link>.
        We review reports and update content when a correction is needed. Each guide shows the date it was last reviewed.
      </p>
      <p>
        Please read our <Link href="/disclaimer">disclaimer</Link> before relying on any result.
      </p>
    </ContentPage>
  );
}
