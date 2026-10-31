import Link from "next/link";
import { Mail } from "lucide-react";
import ContentPage from "@/components/ContentPage";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "How to contact Dividend Calculator with questions, feedback, or corrections to the calculator or dividend guides. No personal financial advice is given by email.",
  path: "/contact",
});

export default function ContactPage() {
  const email = siteConfig.contactEmail;
  return (
    <ContentPage title="Contact Us" path="/contact" showUpdated={false} intro="Questions, feedback, or a correction to report? We'd like to hear from you.">
      {email ? (
        <>
          <p className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
            Email us at <a href={`mailto:${email}`}>{email}</a>
          </p>
          <h2>Write your message here</h2>
          <p>
            This form doesn&apos;t send anything from our website. When you press the button, it opens your own email app
            with a pre-filled message to us. You then review it and send it yourself. If no email app opens, copy the
            address above instead.
          </p>
          <div className="not-prose">
            <ContactForm email={email} />
          </div>
        </>
      ) : (
        <p className="rounded-xl border border-line bg-surface p-5">
          A contact email address hasn&apos;t been published yet. It will appear on this page before the site launches.
        </p>
      )}

      <h2>Before you write</h2>
      <ul>
        <li>
          We can&apos;t provide personalized investment, financial, or tax advice, or tell you whether to buy or sell any
          security. For that, please consult a qualified professional.
        </li>
        <li>Please don&apos;t send account numbers, Social Security numbers, or other sensitive financial details.</li>
        <li>
          For questions about how the calculator works, the <Link href="/faq">FAQ</Link> and the{" "}
          <Link href="/dividend-guides">dividend guides</Link> may already have the answer.
        </li>
      </ul>
      <p>
        See our <Link href="/privacy-policy">Privacy Policy</Link> for how we handle emails you send.
      </p>
    </ContentPage>
  );
}
