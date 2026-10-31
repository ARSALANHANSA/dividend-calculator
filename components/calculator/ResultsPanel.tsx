import Link from "next/link";
import { PAYOUT_FREQUENCY_LABELS, type Projection } from "@/lib/dividend";
import { formatCurrency, formatCurrencyCents, formatPercent, formatShares } from "@/lib/format";
import GrowthChart from "./GrowthChart";

function Stat({ label, value, note, large }: { label: string; value: string; note?: string; large?: boolean }) {
  return (
    <div className="rounded-lg border border-line bg-paper/60 p-4">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className={`mt-1 font-semibold tabular-nums text-ink ${large ? "text-2xl text-accent" : "text-lg"}`}>{value}</dd>
      {note && <dd className="mt-0.5 text-xs text-muted">{note}</dd>}
    </div>
  );
}

export default function ResultsPanel({
  projection,
  withDrip,
  withoutDrip,
}: {
  projection: Projection;
  withDrip: Projection;
  withoutDrip: Projection;
}) {
  const { inputs, summary, rows } = projection;
  const hasTax = inputs.taxRate > 0;
  const frequencyLabel = PAYOUT_FREQUENCY_LABELS[inputs.payoutFrequency].toLowerCase();
  const startingYield = (inputs.annualDividendPerShare / inputs.sharePrice) * 100;
  const netLabel = hasTax ? " after tax" : "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-ink">Your estimate after {inputs.years} {inputs.years === 1 ? "year" : "years"}</h2>
        <p className="mt-1 text-sm text-muted">
          Hypothetical projection {inputs.reinvestDividends ? "with" : "without"} dividend reinvestment. Not a guarantee.
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Stat label="Ending total value" value={formatCurrency(summary.endingTotalValue)} large
          note={inputs.reinvestDividends ? undefined : `Includes ${formatCurrency(summary.cashDividends)} in cash dividends`} />
        <Stat label={`Annual dividend income (year ${inputs.years})${netLabel}`} value={formatCurrency(summary.finalAnnualNet)} large
          note={`Year 1 income: ${formatCurrency(summary.startingAnnualIncome)} before tax`} />
        <Stat label={`Average monthly income${netLabel}`} value={formatCurrency(summary.finalMonthlyNet)} note={`In year ${inputs.years}`} />
        <Stat label={`Quarterly income${netLabel}`} value={formatCurrency(summary.finalQuarterlyNet)}
          note={`Paid ${frequencyLabel}: about ${formatCurrencyCents(summary.finalPerPaymentNet)} per payment`} />
        <Stat label={`Total dividends earned${netLabel}`} value={formatCurrency(summary.totalNetDividends)}
          note={hasTax ? `${formatCurrency(summary.totalGrossDividends)} gross, ${formatCurrency(summary.totalTaxes)} tax` : undefined} />
        <Stat label="Total contributed" value={formatCurrency(summary.totalContributed)} note="Initial investment plus contributions" />
        <Stat label="Ending shares" value={formatShares(summary.endingShares)} note={`At ${formatCurrencyCents(summary.endingSharePrice)} per share`} />
        <Stat label="Yield on cost (final year)" value={formatPercent(summary.yieldOnCost)} note={`Starting yield: ${formatPercent(startingYield)}`} />
      </dl>

      <div className="rounded-xl border border-line p-4">
        <h3 className="mb-3 text-sm font-semibold text-ink">Growth over time</h3>
        <GrowthChart rows={rows} startingValue={summary.startingValue} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm tabular-nums">
          <caption className="px-4 pt-3 text-left text-sm font-semibold text-ink">
            With vs. without DRIP (same inputs)
          </caption>
          <thead className="text-xs text-muted">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-medium"><span className="sr-only">Measure</span></th>
              <th scope="col" className="px-4 py-2 text-right font-medium">With DRIP</th>
              <th scope="col" className="px-4 py-2 text-right font-medium">Without DRIP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            <tr>
              <th scope="row" className="px-4 py-2 text-left font-normal text-muted">Ending total value</th>
              <td className="px-4 py-2 text-right">{formatCurrency(withDrip.summary.endingTotalValue)}</td>
              <td className="px-4 py-2 text-right">{formatCurrency(withoutDrip.summary.endingTotalValue)}</td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-2 text-left font-normal text-muted">Final-year income{netLabel}</th>
              <td className="px-4 py-2 text-right">{formatCurrency(withDrip.summary.finalAnnualNet)}</td>
              <td className="px-4 py-2 text-right">{formatCurrency(withoutDrip.summary.finalAnnualNet)}</td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-2 text-left font-normal text-muted">Ending shares</th>
              <td className="px-4 py-2 text-right">{formatShares(withDrip.summary.endingShares)}</td>
              <td className="px-4 py-2 text-right">{formatShares(withoutDrip.summary.endingShares)}</td>
            </tr>
          </tbody>
        </table>
        <p className="px-4 pb-3 pt-1 text-xs text-muted">
          Without DRIP, dividends are counted as uninvested cash that earns nothing.
        </p>
      </div>

      <div className="rounded-xl bg-accent-soft p-5 text-sm leading-relaxed text-ink/85">
        <h3 className="mb-2 font-semibold text-ink">How this was calculated</h3>
        <p>
          You start with {formatShares(inputs.initialShares)} shares at {formatCurrencyCents(inputs.sharePrice)}, paying{" "}
          {formatCurrencyCents(inputs.annualDividendPerShare)} per share a year (a {formatPercent(startingYield)} yield), split
          into {inputs.payoutFrequency} {frequencyLabel} {inputs.payoutFrequency === 1 ? "payment" : "payments"}. Each payment
          equals shares held × annual dividend per share ÷ {inputs.payoutFrequency}
          {hasTax ? `, minus ${formatPercent(inputs.taxRate, 1)} tax` : ""}.{" "}
          {inputs.reinvestDividends
            ? "Each payment buys more shares at that month's projected price."
            : "Payments are kept as cash and not reinvested."}{" "}
          The dividend per share rises {formatPercent(inputs.dividendGrowthRate, 1)} at the start of each year and the share
          price changes {formatPercent(inputs.priceGrowthRate, 1)} a year, applied evenly month by month.
          {inputs.contributionAmount > 0 &&
            ` You add ${formatCurrency(inputs.contributionAmount)} at the end of every ${inputs.contributionFrequency === 12 ? "month" : "year"}, buying shares at that month's price.`}
        </p>
        <p className="mt-2">
          Learn more about{" "}
          <Link href="/dividend-guides/dividend-yield" className="link">dividend yield</Link>,{" "}
          <Link href="/dividend-guides/dividend-reinvestment-drip" className="link">how DRIP compounding works</Link>,{" "}
          <Link href="/dividend-guides/dividend-growth" className="link">dividend growth rates</Link>, and{" "}
          <Link href="/dividend-guides/dividend-taxes" className="link">how dividends are taxed</Link>.
        </p>
      </div>
    </div>
  );
}
