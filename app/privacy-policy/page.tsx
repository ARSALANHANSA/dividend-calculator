import Link from "next/link";
import ContentPage, { ContactEmail } from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Dividend Calculator handles your information: calculator inputs stay in your browser, one local storage entry remembers your cookie choice, and no analytics or ads are used.",
  path: "/privacy-policy",
});

// Owner review: confirm the hosting provider and its logging practices before
// launch, and have the policy reviewed for any jurisdiction you operate in.
export default function PrivacyPolicyPage() {
  return (
    <ContentPage title="Privacy Policy" path="/privacy-policy" intro="We built this site to need as little information about you as possible. This policy explains exactly what that means.">
      <h2>Summary</h2>
      <ul>
        <li>The calculator runs entirely in your browser. Your financial inputs are not sent to us or anyone else.</li>
        <li>We don&apos;t ask you to create an account or give us personal information to use the site.</li>
        <li>We store one entry in your browser&apos;s local storage to remember your cookie choice.</li>
        <li>We don&apos;t use analytics, advertising, or social media tracking scripts.</li>
      </ul>

      <h2>Calculator inputs</h2>
      <p>
        Investment amounts, share prices, yields, growth rates, tax rates, and any other values you enter are processed
        by JavaScript running on your own device. They are not transmitted to our servers or any third party, and they
        are not saved in cookies or browser storage. When you refresh or leave the page, they are cleared.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        Like any website, when your browser requests a page, the server that delivers it receives standard technical
        information such as your IP address, browser type, the page requested, and the time of the request. Our hosting
        provider may process this information in server logs to deliver the site, keep it secure, and diagnose problems.
        We don&apos;t use this information to identify you or build a profile of you, and we don&apos;t combine it with
        other data.
      </p>

      <h2>Browser storage and cookies</h2>
      <p>
        We use your browser&apos;s local storage to save one item, <code>{CONSENT_STORAGE_KEY}</code>, which records your
        cookie consent choices and when you made them. It contains no personal or financial information, stays on your
        device, and is never sent to a server. Depending on where you live, storing even this preference may be subject to
        privacy rules; we treat it as strictly necessary to respect your choice.
      </p>
      <p>
        We don&apos;t currently set analytics or marketing cookies. If that ever changes, those tools will only run after
        you&apos;ve given consent, and we will update this policy first. Details are in our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>Fonts and third-party services</h2>
      <p>
        The site&apos;s fonts and icons are bundled with the website and served from our own host, so your browser does
        not contact font or icon services when you visit. The site does not load third-party scripts. Links to external
        websites, such as the IRS or Investor.gov, take you to sites with their own privacy policies.
      </p>

      <h2>If you email us</h2>
      <p>
        If you contact us by email, we receive your email address and whatever you include in your message. We use it only
        to reply and to fix any issue you report, and we keep it only as long as needed for that purpose. Please don&apos;t
        send sensitive financial details.
      </p>

      <h2>Data retention</h2>
      <p>
        We don&apos;t store calculator inputs at all. The consent entry stays in your browser until you clear your browser
        storage or change your choice. Server logs, if kept by our hosting provider, are retained according to that
        provider&apos;s standard practices.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>You can change or withdraw cookie consent at any time using &ldquo;Cookie Settings&rdquo; in the footer.</li>
        <li>You can delete the consent entry by clearing your browser&apos;s site data.</li>
        <li>
          Depending on where you live, you may have rights to access, correct, or delete personal information we hold
          about you. Because we hold very little, this would usually only apply to emails you have sent us. Contact us to
          make a request.
        </li>
      </ul>

      <h2>Children</h2>
      <p>This site is intended for adults. We don&apos;t knowingly collect personal information from children.</p>

      <h2>Changes to this policy</h2>
      <p>
        If our practices change, for example if we add analytics, we will update this page and the date at the top before
        the change takes effect.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through <ContactEmail />.
      </p>
    </ContentPage>
  );
}
