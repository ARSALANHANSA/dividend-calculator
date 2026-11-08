import Link from "next/link";
import DataTable from "../DataTable";

export default function ThousandAMonthInDividends() {
  return (
    <>
      <p className="!mt-0 rounded-xl border border-line bg-surface p-5">
        <strong>In short: </strong>
        To earn $1,000 a month in dividends, you need about $300,000 invested at a 4% yield. At a 3% yield it&apos;s
        $400,000, and at a 6% yield it&apos;s $200,000. The exact number depends on three things: the yield you earn,
        the taxes you pay, and how much time you give compounding to work.
      </p>
      <p>
        $1,000 a month is a popular goal because it covers a real bill, like rent, a car payment, or groceries for a
        family. Below, you&apos;ll see the formula, a table for every common yield, realistic timelines for building
        the portfolio, and how to plug your own numbers into the <Link href="/">dividend calculator</Link>.
      </p>

      <h2>The simple formula</h2>
      <p>Divide the yearly income you want by the dividend yield. $1,000 a month is $12,000 a year, so:</p>
      <div className="not-prose my-6 rounded-xl border border-line bg-surface p-5">
        <p className="text-sm font-medium text-muted">Formula</p>
        <p className="mt-1 font-medium tabular-nums text-ink">
          Amount needed = Annual income goal ÷ Dividend yield = $12,000 ÷ 0.04 = $300,000
        </p>
      </div>
      <p>
        The yield is the yearly dividend divided by the share price. A stock trading at $50 that pays $2 a year yields
        4%. If you&apos;re unsure where yield comes from, the{" "}
        <Link href="/dividend-guides/dividend-yield">dividend yield guide</Link> explains trailing vs. forward yield
        and why yield moves with the price.
      </p>

      <h2>How much you need at each dividend yield</h2>
      <p>
        The higher the yield, the less money you need, but higher yields usually come with more risk. Here&apos;s the
        amount required for $1,000 a month before taxes:
      </p>
      <DataTable
        caption="Amount needed for $1,000 a month in dividends at each dividend yield"
        headers={["Dividend yield", "Amount needed for $12,000/year", "Typical example"]}
        rows={[
          ["2%", "$600,000", "Broad market index fund"],
          ["3%", "$400,000", "Dividend growth stocks and ETFs"],
          ["4%", "$300,000", "High-dividend ETFs, utilities"],
          ["5%", "$240,000", "REITs, telecom stocks"],
          ["6%", "$200,000", "Some REITs and BDCs"],
          ["8%", "$150,000", "Covered-call income funds"],
          ["10%", "$120,000", "High-risk, high-yield funds"],
        ]}
      />
      <p>
        The examples are broad categories, not recommendations. Yields change daily with prices, so always check the
        current figure before running your numbers.
      </p>

      <h2>How long it takes to reach $1,000 a month</h2>
      <p>
        Most people don&apos;t start with $300,000. They build it by adding money every month and reinvesting every
        dividend (DRIP). We ran these scenarios through our calculator, starting with $10,000 in a 4% yield holding
        paid quarterly, with all dividends reinvested and no taxes:
      </p>
      <DataTable
        caption="Years to reach $1,000 a month in dividends by monthly contribution"
        headers={["Monthly contribution", "Years with no growth", "Years with 5% dividend growth and 4% price growth"]}
        rows={[
          ["$500", "27 years", "18 years"],
          ["$1,000", "18 years", "13 years"],
          ["$2,000", "11 years", "9 years"],
        ]}
      />
      <p>
        Two things stand out. First, doubling your monthly contribution cuts years off the goal. Second, dividend
        growth matters as much as the money you add: at $500 a month, growth saves 9 years. In the growth scenario at
        $500 a month, you&apos;d contribute about $118,000 of your own money, and dividends plus price growth do the
        rest.
      </p>
      <p>
        That&apos;s the power of reinvesting. Each payment buys more shares, and those shares pay their own dividends.
        The <Link href="/dividend-guides/dividend-reinvestment-drip">DRIP guide</Link> walks through a 20-year example,
        and the <Link href="/dividend-guides/dividend-growth">dividend growth guide</Link> shows why small differences
        in growth add up over decades.
      </p>

      <h2>Don&apos;t forget taxes</h2>
      <p>
        If you want $1,000 a month you can actually spend, you need more than $12,000 in pre-tax dividends. In a
        taxable US account, qualified dividends are usually taxed at 0%, 15%, or 20% depending on income, while
        ordinary dividends are taxed like wages.
      </p>
      <p>To find your pre-tax target, divide $12,000 by (1 − your tax rate):</p>
      <DataTable
        caption="Pre-tax dividend income and investment needed for $1,000 a month after tax"
        headers={["Tax rate on dividends", "Pre-tax income needed", "Amount needed at 4% yield"]}
        rows={[
          ["0% (e.g. Roth IRA)", "$12,000", "$300,000"],
          ["15%", "$14,118", "$352,941"],
          ["20%", "$15,000", "$375,000"],
        ]}
      />
      <p>
        Holding dividend investments in a tax-advantaged account can shrink the target noticeably. The{" "}
        <Link href="/dividend-guides/dividend-taxes">dividend taxes guide</Link> covers qualified vs. ordinary
        dividends, the holding period, and Form 1099-DIV. Tax rules vary by person and change over time, so check with
        a tax professional for your situation.
      </p>

      <h2>Why chasing a high yield can backfire</h2>
      <p>
        A 10% yield cuts the amount you need to $120,000, but it often means the market expects trouble. A yield climbs
        when the share price falls, and a falling price can signal that the dividend is about to be cut.
      </p>
      <ul>
        <li>
          <strong>Dividend cuts.</strong> If a company pays out more than it earns, the dividend may not last. Check
          the <Link href="/dividend-guides/payout-ratio">payout ratio</Link> before trusting a high yield.
        </li>
        <li>
          <strong>Shrinking principal.</strong> Some high-yield funds pay out part of your own capital, so the share
          price slowly erodes over time.
        </li>
        <li>
          <strong>Little growth.</strong> High-yield holdings often raise payments slowly or not at all, while a 3%
          yielder that raises its dividend 7% a year pays more than a flat 5% yielder after about 8 years of raises.
        </li>
      </ul>
      <p>
        A balanced mix of moderate yield and steady dividend growth is usually a more reliable path to $1,000 a month
        than reaching for the highest number.
      </p>

      <h2>Run your own numbers</h2>
      <p>
        The <Link href="/">Dividend Calculator</Link> shows exactly when your portfolio could reach $1,000 a month.
        Here&apos;s how to set it up:
      </p>
      <ol>
        <li>Enter what you have invested today and the current share price.</li>
        <li>Enter the dividend yield (or dividend per share) and the payout frequency.</li>
        <li>Add a dividend growth rate and share price growth rate. Use 0% for a cautious estimate.</li>
        <li>Enter your monthly contribution and your dividend tax rate.</li>
        <li>
          Switch on <strong>Reinvest dividends (DRIP)</strong> and set the investment period.
        </li>
        <li>
          Press <strong>Calculate dividends</strong>, then check the <strong>Average monthly income</strong> result
          and the year-by-year table to see which year crosses $1,000.
        </li>
      </ol>
      <p>
        Try three versions: a cautious one at 0% growth, a middle one, and one with DRIP switched off. The gap between
        them shows how much your result depends on each assumption. Investing in a specific fund? The{" "}
        <Link href="/dividend-guides/jepq-dividend">JEPQ dividend calculator</Link> and{" "}
        <Link href="/dividend-guides/vym-dividend">VYM dividend calculator</Link> come preset.
      </p>
    </>
  );
}

/** Closing section, rendered after the FAQs. */
export function ThousandAMonthBottomLine() {
  return (
    <>
      <h2>The bottom line</h2>
      <p>
        $1,000 a month in dividends takes roughly $300,000 at a 4% yield, more after taxes and less at higher yields.
        Regular contributions, reinvested dividends, and steady dividend growth can get you there years sooner than
        saving alone. Open the <Link href="/">Dividend Calculator</Link>, enter your own numbers, and see which year
        your income crosses $1,000 a month.
      </p>
    </>
  );
}
