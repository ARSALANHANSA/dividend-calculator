import DividendCalculator from "@/components/DividendCalculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      {/* Hero */}
      <header className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 sm:px-8">
          <p className="font-mono text-xs tracking-wide text-pine mb-4">
            No. 001 — Income Projection Tools
          </p>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight text-ink max-w-2xl">
            See what your dividends could grow into.
          </h1>
          <p className="mt-5 max-w-xl text-ink/70 leading-relaxed">
            Enter what you hold today, and this calculator projects your dividend
            income and portfolio value forward — with or without reinvestment,
            year by year.
          </p>
        </div>
      </header>

      {/* Calculator */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <DividendCalculator />
      </section>

      {/* Explainer */}
      <section className="border-t border-line bg-white/40">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
          <h2 className="font-display text-3xl text-ink mb-6">
            How the dividend calculator works
          </h2>
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>
              A dividend calculator projects how a stock or portfolio&apos;s dividend
              income and total value could change over time, based on a few
              assumptions you control: how much you start with, the current
              dividend yield, how fast that dividend tends to grow each year,
              and whether you reinvest the payouts instead of taking them as
              cash.
            </p>
            <p>
              Each year, the tool calculates the dividend paid on your balance,
              adds it back into your holdings if reinvestment is switched on,
              adds any new contribution you&apos;ve entered, and then grows the
              balance by your expected share price appreciation rate. The
              dividend yield itself increases each year by your chosen growth
              rate, reflecting a company raising its payout over time.
            </p>
            <p>
              The result is a year-by-year statement showing your starting
              balance, the dividend earned, your contribution, and your ending
              balance — so you can see exactly how compounding and
              reinvestment build up over the years you enter.
            </p>
          </div>

          <h2 className="font-display text-3xl text-ink mt-14 mb-6">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-line">
            <Faq
              q="What is dividend reinvestment (DRIP)?"
              a="Dividend reinvestment means using the cash dividend you receive to buy more shares of the same stock, automatically, instead of withdrawing it. Over many years, this compounds because each reinvested dividend then earns its own dividend."
            />
            <Faq
              q="What dividend growth rate should I use?"
              a="A common starting point is the company's average annual dividend increase over the past 5–10 years, which you can find in its dividend history or investor relations page. Using a conservative rate gives a more realistic projection than assuming growth continues at a recent high rate."
            />
            <Faq
              q="Does this calculator account for taxes?"
              a="No. This tool projects gross dividend income and portfolio value before any dividend or capital gains tax. Tax treatment varies by country, account type, and individual circumstances, so actual after-tax returns will be lower."
            />
            <Faq
              q="Is this financial advice?"
              a="No. This calculator is an educational estimation tool based on the assumptions you enter. It does not account for dividend cuts, market volatility, or company-specific risk, and should not be the sole basis for an investment decision."
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 text-xs text-ink/50">
          For educational purposes only. Not financial advice.
        </div>
      </footer>
    </main>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-5">
      <h3 className="font-display text-lg text-ink mb-1.5">{q}</h3>
      <p className="text-sm text-ink/70 leading-relaxed">{a}</p>
    </div>
  );
}
