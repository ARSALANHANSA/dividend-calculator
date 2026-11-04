import Link from "next/link";
import ContentPage, { ContactEmail } from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "The terms for using Dividend Calculator, including acceptable use, calculator limitations, no-advice terms, and limitation of liability.",
  path: "/terms-and-conditions",
});

// Owner review: have these terms reviewed by a qualified lawyer, particularly
// the limitation of liability and governing law sections, for your jurisdiction.
export default function TermsPage() {
  return (
    <ContentPage title="Terms and Conditions" path="/terms-and-conditions">
      <p>
        By using this website (the &ldquo;site&rdquo;), you agree to these terms. If you don&apos;t agree, please
        don&apos;t use the site.
      </p>

      <h2>1. What the site provides</h2>
      <p>
        The site provides a free dividend calculator and educational articles about dividend investing. Everything on the
        site is for general educational and informational purposes only.
      </p>

      <h2>2. No investment, financial, or tax advice</h2>
      <p>
        Nothing on the site is investment, financial, legal, or tax advice, or a recommendation to buy, sell, or hold any
        security. We are not a registered investment adviser, broker-dealer, or tax professional. You are responsible for
        your own decisions, and you should consult a qualified professional before acting on anything you read or
        calculate here. Please also read our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>3. Calculator accuracy and your assumptions</h2>
      <p>
        Calculator results are hypothetical estimates based entirely on values and assumptions you enter, applied at
        constant rates. They are not predictions or guarantees. Results are rounded for display and use a simplified
        model that excludes, among other things, fees, inflation, exact payment dates, and most tax rules. We try to keep
        the calculator and articles accurate, but we don&apos;t warrant that they are error-free, complete, or current.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the site for any unlawful purpose;</li>
        <li>attempt to disrupt, overload, or gain unauthorized access to the site or its hosting;</li>
        <li>copy or republish substantial parts of the site&apos;s content as your own without permission;</li>
        <li>misrepresent results from the calculator as advice or guarantees from us.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        The site&apos;s text, design, and code are owned by the site operator unless otherwise noted. You may use the
        calculator and share links to pages freely, and quote short excerpts with a link back. Trademarks and names of
        third parties mentioned belong to their owners.
      </p>

      <h2>6. External links</h2>
      <p>
        The site links to external websites such as government resources. We don&apos;t control those sites and
        aren&apos;t responsible for their content or practices.
      </p>

      <h2>7. Availability</h2>
      <p>
        We may change, suspend, or discontinue any part of the site at any time without notice. We don&apos;t guarantee
        the site will always be available or free of errors.
      </p>

      <h2>8. Disclaimer of warranties</h2>
      <p>
        To the extent permitted by law, the site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
        warranties of any kind, whether express or implied, including warranties of accuracy, fitness for a particular
        purpose, and non-infringement.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent permitted by law, the site operator will not be liable for any loss or damage arising from your use
        of, or reliance on, the site, the calculator, or its content, including investment losses, lost profits, or tax
        consequences. Some jurisdictions don&apos;t allow certain limitations, so parts of this section may not apply to
        you.
      </p>

      <h2>10. Privacy</h2>
      <p>
        Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle information. In short, calculator
        inputs never leave your browser.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top of this page shows when they last changed. Continuing to use the
        site after a change means you accept the updated terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of Pakistan, without regard to conflict-of-law rules. This doesn&apos;t
        remove any protection you have under the mandatory laws of the country where you live.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms can be sent through <ContactEmail />.
      </p>
    </ContentPage>
  );
}
