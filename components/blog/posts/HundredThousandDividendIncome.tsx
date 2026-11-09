import Link from "next/link";
import DataTable from "../DataTable";

export default function HundredThousandDividendIncome() {
  return (
    <>
      <p className="!mt-0 rounded-xl border border-line bg-surface p-5">
        <strong>Quick answer: </strong>
        $100,000 invested in dividend stocks or funds generates roughly $2,000 to $8,000 a year in dividend income, or
        about $167 to $667 a month. The exact amount depends almost entirely on one number: the dividend yield. At a 4%
        yield, $100,000 pays $4,000 a year, or about $333 a month before taxes.
      </p>
      <p>
        That is the starting point, not the ceiling. If you reinvest the dividends and the companies keep raising their
        payouts, the same $100,000 can produce several times that income 20 years from now. Below you&apos;ll find the
        formula, a yield-by-yield table, after-tax figures, and a 20-year projection you can rerun in our free{" "}
        <Link href="/">dividend calculator</Link>.
      </p>

      <h2>How much $100,000 pays at every common yield</h2>
      <p>The math is one line:</p>
      <div className="not-prose my-6 rounded-xl border border-line bg-surface p-5">
        <p className="text-sm font-medium text-muted">Formula</p>
        <p className="mt-1 font-medium tabular-nums text-ink">Annual dividend income = Amount invested × Dividend yield</p>
      </div>
      <p>
        Divide the result by 12 for an average monthly figure, or by 4 for a quarterly one. Here is what $100,000
        produces at the yields you&apos;ll actually see in the market (before taxes, no reinvestment):
      </p>
      <DataTable
        caption="Dividend income from $100,000 at each dividend yield"
        headers={["Dividend yield", "Annual income", "Monthly income", "Typical examples"]}
        rows={[
          ["1.5%", "$1,500", "$125", "Broad S&P 500 index funds"],
          ["2%", "$2,000", "$167", "Dividend growth ETFs"],
          ["3%", "$3,000", "$250", "High-dividend ETFs such as VYM"],
          ["4%", "$4,000", "$333", "Utilities, consumer staples, many REITs"],
          ["5%", "$5,000", "$417", "Higher-yield REITs, telecoms"],
          ["6%", "$6,000", "$500", "Pipelines, BDCs"],
          ["8%", "$8,000", "$667", "Option-income ETFs (yields swing a lot)"],
          ["10%", "$10,000", "$833", "Very high yield, often with real risk to the payout"],
        ]}
      />
      <p>
        Yields change every day as share prices move, so check a fund&apos;s current yield before you plug it in. Our{" "}
        <Link href="/dividend-guides/dividend-yield">dividend yield guide</Link> explains trailing vs. forward yield and
        why the number moves.
      </p>

      <h2>What $100,000 earns after taxes</h2>
      <p>
        In a taxable US account, the income you keep is lower than the table above. Most dividends from US companies
        held long enough count as qualified and are taxed at 0%, 15% or 20%, depending on your income. Non-qualified
        (ordinary) dividends, including most REIT payouts, are taxed at your regular income tax rate.
      </p>
      <p>Here is $100,000 at a 4% yield ($4,000 a year) under common tax situations:</p>
      <DataTable
        caption="After-tax dividend income from $100,000 at a 4% yield"
        headers={["Tax situation", "Tax rate", "Income you keep (year)", "Per month"]}
        rows={[
          ["IRA, Roth IRA or 401(k)", "0% now", "$4,000", "$333"],
          ["Qualified, lower income", "0%", "$4,000", "$333"],
          ["Qualified, most investors", "15%", "$3,400", "$283"],
          ["Qualified, high income", "20%", "$3,200", "$267"],
          ["Qualified, high income + 3.8% NIIT", "23.8%", "$3,048", "$254"],
          ["Ordinary dividends, 22% bracket", "22%", "$3,120", "$260"],
        ]}
      />
      <p>
        The calculator has a <strong>Dividend tax rate</strong> field that deducts your rate from every payment before
        reinvesting. For the details on holding periods, Form 1099-DIV and the NIIT, read{" "}
        <Link href="/dividend-guides/dividend-taxes">how dividends are taxed</Link>. Investors outside the US usually
        face withholding tax on US dividends, so check the rules where you live.
      </p>

      <h2>How $100,000 grows with DRIP and dividend growth</h2>
      <p>
        Reinvesting dividends and choosing companies that raise their payouts can more than double your income compared
        with taking the cash. We ran $100,000 through the calculator with a 4% starting yield, 5% yearly dividend
        growth, 4% yearly share price growth, quarterly payments, no taxes and no extra contributions:
      </p>
      <DataTable
        caption="20-year projection of $100,000 with and without dividend reinvestment"
        headers={["Year", "Annual income with DRIP", "Annual income without DRIP", "Total value with DRIP", "Total value without DRIP"]}
        rows={[
          ["1", "$4,059", "$4,000", "$108,119", "$108,000"],
          ["5", "$5,780", "$4,862", "$148,302", "$143,768"],
          ["10", "$9,068", "$6,205", "$222,067", "$198,336"],
          ["15", "$14,371", "$7,920", "$335,906", "$266,409"],
          ["20", "$23,015", "$10,108", "$513,523", "$351,376"],
        ]}
      />
      <p>
        By year 20, reinvesting turns $4,000 of yearly income into about $23,000 a year (roughly $1,900 a month), from
        the same $100,000 and without adding a dollar. Without DRIP the income still grows, but only because each share
        pays more, not because you own more shares.
      </p>
      <p>
        What if nothing grows? With 0% dividend growth and 0% price growth, DRIP alone still lifts income from $4,060 in
        year 1 to about $8,650 in year 20, because every payment buys more shares. See the{" "}
        <Link href="/dividend-guides/dividend-reinvestment-drip">DRIP guide</Link> for the step-by-step math and the{" "}
        <Link href="/dividend-guides/dividend-growth">dividend growth guide</Link> for picking a realistic growth rate.
      </p>
      <p className="text-sm text-muted">
        Without DRIP, total value counts dividends as cash that earns nothing. These are hypothetical projections using
        constant rates, not forecasts.
      </p>

      <h2>Why chasing a 10% yield is risky</h2>
      <p>
        A bigger yield means bigger income today, but a very high yield is often a warning sign rather than a bargain.
        Keep these in mind before putting $100,000 into the highest-yielding names:
      </p>
      <ul>
        <li>
          <strong>Yield rises when the price falls.</strong> A stock yielding 10% may have dropped sharply because
          investors expect the dividend to be cut.
        </li>
        <li>
          <strong>Cuts hit income and value together.</strong> If a $10,000-a-year payout is cut in half, you lose
          $5,000 of income and the share price usually falls too.
        </li>
        <li>
          <strong>Payout ratio matters.</strong> A company paying out more than it earns has little room to keep or
          raise the dividend. Our <Link href="/dividend-guides/payout-ratio">payout ratio guide</Link> shows what to
          look for.
        </li>
        <li>
          <strong>Growth often beats yield over time.</strong> In the projection above, a 4% yield growing 5% a year
          reaches a yield on cost above 20% by year 20. A flat 8% yield never does better than 8% on cost unless you
          reinvest.
        </li>
        <li>
          <strong>Option-income funds pay variable amounts.</strong> Funds like JEPQ pay monthly, but the payment
          changes each month. Try the <Link href="/dividend-guides/jepq-dividend">JEPQ dividend calculator</Link> to
          see a realistic range.
        </li>
      </ul>
      <p>
        Many investors split $100,000 across a broad dividend ETF, a few dividend growth stocks and a smaller
        high-yield slice, which balances today&apos;s income against long-term growth.
      </p>

      <h2>Run your own $100,000 scenario in the calculator</h2>
      <p>
        Your numbers will differ from ours, so test them in the <Link href="/">Dividend Calculator</Link>. It runs in
        your browser and needs no account.
      </p>
      <ol>
        <li>
          Choose <strong>Dollar amount</strong> and enter 100000 as the initial investment, plus the current share price
          of your stock or fund.
        </li>
        <li>
          Enter the annual dividend yield (for example 4) and pick the payout frequency: monthly, quarterly, semi-annual
          or annual.
        </li>
        <li>
          Add a dividend growth rate (try 5%) and a share price growth rate (try 4%). Use 0% for both to see the most
          cautious case.
        </li>
        <li>
          Add a monthly contribution if you plan to keep investing, and your dividend tax rate if the money sits in a
          taxable account.
        </li>
        <li>
          Set the period to 20 years, switch DRIP on, and press <strong>Calculate dividends</strong>.
        </li>
      </ol>
      <p>
        The results show your final-year annual, monthly and quarterly income, total dividends earned, yield on cost,
        and a side-by-side table of the same inputs with and without DRIP. Change one input at a time to see which
        assumption moves your income the most.
      </p>
    </>
  );
}

/** Closing section, rendered after the FAQs. */
export function HundredThousandBottomLine() {
  return (
    <>
      <h2>The bottom line</h2>
      <p>
        $100,000 in dividend investments pays about $2,000 to $8,000 a year today, with $3,000 to $5,000 a realistic
        range for a diversified portfolio. Taxes on qualified dividends trim that by up to about a quarter in a taxable
        account. Reinvesting and owning companies that raise their dividends is what turns that starting income into
        $20,000+ a year two decades later.
      </p>
      <p>
        Plug your own yield, growth rate and tax rate into the <Link href="/">Dividend Calculator</Link> to see your
        number year by year.
      </p>
    </>
  );
}
