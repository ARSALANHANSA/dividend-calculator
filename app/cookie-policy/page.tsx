import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import CookieSettingsButton from "@/components/cookies/CookieSettingsButton";
import { buildMetadata } from "@/lib/seo";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "What cookies and browser storage Dividend Calculator uses, why, and how to change your consent preferences.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <ContentPage title="Cookie Policy" path="/cookie-policy" intro="This site uses almost no browser storage. Here is the complete list.">
      <h2>What we use</h2>
      <div className="not-prose my-6 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-medium">Name</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Purpose</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">{CONSENT_STORAGE_KEY}</td>
              <td className="px-4 py-3">Local storage, necessary</td>
              <td className="px-4 py-3">Remembers your cookie choices so the banner doesn&apos;t reappear on every page.</td>
              <td className="px-4 py-3">Until you clear site data or change your choice</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        That entry never leaves your device. The site sets no other cookies and does not save the values you enter in the
        calculator.
      </p>

      <h2>Categories</h2>
      <h3>Necessary storage</h3>
      <p>
        Storage required to remember your consent preference. It is always on, because without it we couldn&apos;t
        respect your choice. It contains no personal or financial information.
      </p>
      <h3>Analytics (optional, off by default)</h3>
      <p>
        No analytics service is installed. The setting exists so that, if one is ever added, it will only run with your
        consent.
      </p>
      <h3>Marketing (optional, off by default)</h3>
      <p>No advertising or marketing scripts are installed. The same rule applies: none would run without your consent.</p>

      <h2>Changing your preferences</h2>
      <p>
        You can review or withdraw your choices at any time.{" "}
        <CookieSettingsButton label="Open cookie settings" className="text-accent underline underline-offset-2" /> or
        use the &ldquo;Cookie Settings&rdquo; link in the footer. You can also clear site data in your browser settings,
        which removes the stored preference and shows the banner again.
      </p>

      <p>
        See the <Link href="/privacy-policy">Privacy Policy</Link> for more on how we handle information.
      </p>
    </ContentPage>
  );
}
