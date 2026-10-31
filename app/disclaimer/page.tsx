import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Financial Disclaimer",
  description:
    "Dividend Calculator provides hypothetical estimates for education only. It is not investment, financial, or tax advice and does not guarantee future dividends or returns.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <ContentPage title="Financial Disclaimer" path="/disclaimer">
      <h2>Educational use only</h2>
      <p>
        The Dividend Calculator and every article on this site provide hypothetical estimates and general information for
        educational purposes only. They do not provide investment, financial, legal, or tax advice, and they are not a
        recommendation to buy, sell, or hold any security, fund, or strategy.
      </p>

      <h2>No guarantees</h2>
      <p>
        Calculator results are based on the assumptions you enter, applied at constant rates. They do not guarantee
        future dividends, returns, income, or portfolio values. Real dividends, share prices, and growth rates change,
        and companies can reduce, suspend, or eliminate dividends at any time. Past dividend payments do not guarantee
        future payments.
      </p>

      <h2>Investing involves risk</h2>
      <p>
        All investing involves risk, including the possible loss of principal. Dividend-paying investments are not
        immune; their prices can fall, and their dividends can be cut.
      </p>

      <h2>Taxes</h2>
      <p>
        Tax information on this site is general, focused on the United States, and may not reflect current law or your
        circumstances. Tax rules change. The calculator&apos;s tax setting is a simplified estimate only.
      </p>

      <h2>Not a professional relationship</h2>
      <p>
        Using this site does not create an adviser, fiduciary, or client relationship. We are not a registered investment
        adviser, broker-dealer, or tax professional. Before making financial decisions, consult a qualified financial
        adviser or tax professional who can consider your full situation.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work to keep the calculator and content accurate and to cite official sources, but we can&apos;t guarantee that
        everything is complete, current, or error-free. If you find a mistake, please <Link href="/contact">let us know</Link>.
      </p>
      <p>
        See also our <Link href="/terms-and-conditions">Terms and Conditions</Link>.
      </p>
    </ContentPage>
  );
}
