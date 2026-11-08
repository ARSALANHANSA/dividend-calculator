import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DividendCalculator from "@/components/calculator/DividendCalculator";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { guides } from "@/data/guides";
import { homeFaqs } from "@/data/faqs";
import { buildMetadata, publisherJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Dividend Calculator: Estimate Dividend Income & DRIP Growth",
  description:
    "Free dividend calculator. Estimate annual and monthly dividend income, DRIP reinvestment growth, total dividends, and yield on cost, with a year-by-year breakdown.",
  path: "/",
  absoluteTitle: true,
});

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  url: siteConfig.url,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Browser-based calculator that projects dividend income, dividend reinvestment (DRIP), dividend growth, contributions, and taxes over time.",
  publisher: publisherJsonLd,
};

const inputGuide = [
  ["Initial investment or shares", "The current value of your position, or the number of shares you own. Your brokerage statement shows both."],
  ["Share price", "Today's price per share, from your brokerage or any market quote."],
  ["Dividend yield or dividend per share", "Listed on your brokerage's holding page or the company's investor relations dividend history."],
  ["Payout frequency", "How many regular payments are made each year. Check the dividend history."],
  ["Dividend growth rate", "Your estimate of how fast the dividend will rise. A long-term historical average is a common starting point."],
  ["Share price growth", "Your estimate of yearly price change. Use 0% to isolate dividend effects."],
  ["Contributions", "Money you plan to add each month or year."],
  ["Tax rate", "An approximate rate on dividends. Use 0% for tax-advantaged accounts."],
] as const;

const resultGuide = [
  ["Annual dividend income", "Dividends received in the final year of the period, after any tax rate you entered."],
  ["Monthly and quarterly income", "The final year's income divided by 12 and by 4. These are averages, whatever the actual payout schedule."],
  ["Total dividends earned", "The sum of every payment over the whole period. Shown before and after tax when a tax rate is entered."],
  ["Ending total value", "Shares owned at the end × projected share price, plus any dividends kept as cash when DRIP is off."],
  ["Ending shares", "Your starting shares plus shares bought with contributions and, if DRIP is on, reinvested dividends."],
  ["Yield on cost", "Final-year dividends (before tax) ÷ total money you contributed. It shows income relative to what you actually put in."],
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={appJsonLd} />

      <section className="border-b border-line bg-surface">
        <div className="container-page pb-6 pt-10 sm:pt-12">
          <h1 className="font-display text-3xl font-bold leading-tight text-accent sm:text-4xl">Dividend Calculator</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            Estimate your future dividend income, the effect of reinvesting dividends, and how your portfolio could grow
            over time. Enter your own numbers below.
          </p>
        </div>
      </section>

      <section className="container-page py-8" aria-label="Calculator">
        <DividendCalculator />
      </section>

      <div className="container-page">
        <article className="prose-content mx-auto mt-10">
          <h2>What this dividend calculator does</h2>
          <p>
            This tool projects how a dividend-paying investment could produce income and grow over a period you choose.
            It starts with what you own today, applies the dividend yield, dividend growth, share price growth, and
            contributions you enter, and shows the result year by year.
          </p>
          <p>
            It works as a dividend income calculator, a dividend yield calculator, and a DRIP calculator in one: switch
            dividend reinvestment on or off and the results show both outcomes side by side. Everything runs in your
            browser. Your numbers aren&apos;t sent anywhere or saved, and you don&apos;t need an account.
          </p>

          <h2>How to use the calculator</h2>
          <ol>
            <li>Enter your holding as a dollar amount or a number of shares, plus the current share price.</li>
            <li>Enter the dividend as a yield (%) or as an annual dividend per share ($), and choose how often it&apos;s paid.</li>
            <li>Add your growth assumptions for the dividend and the share price. Leave them at 0% to keep things constant.</li>
            <li>Optionally add regular contributions and a dividend tax rate.</li>
            <li>Choose how many years to project and whether to reinvest dividends.</li>
            <li>
              Press <strong>Calculate dividends</strong>. Edit any value and calculate again to compare scenarios, or press{" "}
              <strong>Reset</strong> to return to the example values.
            </li>
          </ol>

          <h2>Inputs you need and where to find them</h2>
        </article>

        <div className="mx-auto mt-2 max-w-prose overflow-hidden rounded-xl border border-line bg-surface">
          <dl className="divide-y divide-line">
            {inputGuide.map(([term, detail]) => (
              <div key={term} className="grid gap-1 px-5 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-ink">{term}</dt>
                <dd className="text-sm leading-relaxed text-muted sm:col-span-2">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <article className="prose-content mx-auto">
          <h2>How dividend income and reinvestment are calculated</h2>
          <p>The calculator simulates every month of the period using these formulas:</p>
        </article>

        <div className="mx-auto mt-2 max-w-prose space-y-2 rounded-xl border border-line bg-surface p-5 text-sm leading-relaxed">
          <p><strong>Dividend per share from yield:</strong> annual dividend per share = yield × share price</p>
          <p><strong>Dividend per share in year n:</strong> starting dividend × (1 + dividend growth)<sup>n − 1</sup></p>
          <p><strong>Each payment:</strong> shares owned × annual dividend per share ÷ payments per year</p>
          <p><strong>After tax:</strong> net payment = payment × (1 − tax rate)</p>
          <p><strong>DRIP:</strong> new shares = net payment ÷ that month&apos;s share price</p>
          <p><strong>Share price:</strong> grows by (1 + price growth)<sup>1/12</sup> each month, compounding to the annual rate</p>
          <p><strong>Contributions:</strong> buy shares at the end of each month or year, after that month&apos;s dividend</p>
        </div>

        <article className="prose-content mx-auto">
          <p>
            For example, 100 shares at $50 paying $2.00 a year (a 4% yield) once a year produce a $200 payment. With
            DRIP, that buys 4 more shares, so next year&apos;s payment is 104 × $2.00 = $208. That growing payment is
            the compounding effect. The <Link href="/dividend-guides/dividend-reinvestment-drip">DRIP guide</Link>{" "}
            walks through it in more detail.
          </p>

          <h2>What each result means</h2>
        </article>

        <div className="mx-auto mt-2 max-w-prose overflow-hidden rounded-xl border border-line bg-surface">
          <dl className="divide-y divide-line">
            {resultGuide.map(([term, detail]) => (
              <div key={term} className="grid gap-1 px-5 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-ink">{term}</dt>
                <dd className="text-sm leading-relaxed text-muted sm:col-span-2">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <article className="prose-content mx-auto">
          <h2>Factors that can change your dividend income</h2>
          <ul>
            <li>
              <strong>Dividend cuts and suspensions.</strong> Companies can reduce or stop dividends at any time,
              especially when earnings fall. A high <Link href="/dividend-guides/payout-ratio">payout ratio</Link> leaves
              less room for error.
            </li>
            <li>
              <strong>Share price changes.</strong> Reinvested dividends buy fewer shares when prices are high and more
              when they are low, and the value of your holding moves with the market.
            </li>
            <li>
              <strong>Taxes.</strong> In a taxable account, dividends, including reinvested ones, are generally taxed
              each year. See <Link href="/dividend-guides/dividend-taxes">how dividends are taxed</Link>.
            </li>
            <li>
              <strong>Fees.</strong> Fund expense ratios and any plan or trading fees reduce returns. The calculator
              doesn&apos;t deduct fees, so reduce your growth assumptions to account for them.
            </li>
            <li>
              <strong>Payout frequency.</strong> More frequent payments compound slightly faster with DRIP and change the
              size of each payment. See <Link href="/dividend-guides/payout-frequency">payout frequency</Link>.
            </li>
          </ul>

          <h2>Limitations of dividend projections</h2>
          <p>
            Every projection here assumes constant rates: the same dividend growth, price growth, and tax rate every year.
            Real markets don&apos;t behave that way. The calculator also doesn&apos;t model fees, inflation, specific
            payment dates, cash interest, capital gains taxes when you sell, or the timing differences between the
            ex-dividend date and payment date.
          </p>
          <p>
            Results are rounded for display, and small changes in assumptions can produce large differences over long
            periods. Use the calculator to compare scenarios and understand how the pieces interact, not to predict what
            will actually happen. It does not provide investment, financial, or tax advice. See the full{" "}
            <Link href="/disclaimer">disclaimer</Link>.
          </p>

          <h2>Frequently asked questions</h2>
        </article>

        <div className="mx-auto mt-2 max-w-prose">
          <FaqList faqs={homeFaqs} />
          <p className="mt-3 text-sm text-muted">
            More answers on the <Link href="/faq" className="link">FAQ page</Link>.
          </p>
        </div>

        <section className="mx-auto mt-16 max-w-4xl" aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-center font-display text-2xl font-medium text-ink sm:text-3xl">
            Dividend guides
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted">
            Plain-English explanations of the concepts behind each calculator input.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/dividend-guides/${guide.slug}`}
                  className="card group flex h-full flex-col p-5 transition-colors hover:border-accent/40"
                >
                  <span className="font-medium text-ink group-hover:text-accent">{guide.shortTitle}</span>
                  <span className="mt-1 text-sm leading-relaxed text-muted">{guide.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <article className="prose-content mx-auto">
          <h2>Next steps</h2>
          <p>
            Try a few versions of your own scenario: one with conservative growth, one at 0% growth, and one with DRIP
            switched off. The gap between them shows how much the result depends on each assumption. If you&apos;re new
            to dividends, start with the <Link href="/dividend-guides/dividend-yield">dividend yield guide</Link>, then{" "}
            <Link href="/dividend-guides/dividend-growth">dividend growth</Link>. Estimating income from a fund? Try
            the <Link href="/dividend-guides/jepq-dividend">JEPQ dividend calculator</Link> or the{" "}
            <Link href="/dividend-guides/vym-dividend">VYM dividend calculator</Link>. Setting an income goal? Read{" "}
            <Link href="/blog/how-much-to-invest-for-1000-a-month-in-dividends">
              how much you need to invest to make $1,000 a month in dividends
            </Link>
            . For decisions about your own money,
            consider speaking with a qualified financial professional.
          </p>
          <p className="flex items-center gap-1">
            <a href="#main" className="inline-flex items-center gap-1">
              Back to the calculator <ArrowRight className="h-4 w-4 -rotate-90" aria-hidden="true" />
            </a>
          </p>
        </article>
      </div>
    </>
  );
}
