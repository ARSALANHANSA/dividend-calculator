import type { YearRow } from "@/lib/dividend";
import { formatCurrency, formatCurrencyCents, formatPercent, formatShares } from "@/lib/format";

export default function YearTable({ rows, showTax, showCash }: { rows: YearRow[]; showTax: boolean; showCash: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface" tabIndex={0} aria-labelledby="year-table-caption">
      <table className="w-full min-w-[720px] text-right text-sm tabular-nums">
        <caption id="year-table-caption" className="px-4 py-3 text-left text-sm text-muted">
          Year-by-year projection. Values are end-of-year estimates, rounded for display.
        </caption>
        <thead className="border-y border-line bg-paper text-xs uppercase tracking-wide text-muted">
          <tr>
            <th scope="col" className="px-4 py-2.5 text-left font-medium">Year</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Dividend / share</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Share price</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Shares</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Dividends</th>
            {showTax && <th scope="col" className="px-4 py-2.5 font-medium">Tax</th>}
            <th scope="col" className="px-4 py-2.5 font-medium">Contributions</th>
            {showCash && <th scope="col" className="px-4 py-2.5 font-medium">Cash dividends</th>}
            <th scope="col" className="px-4 py-2.5 font-medium">Total value</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Yield on cost</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.year} className="hover:bg-paper/60">
              <th scope="row" className="px-4 py-2 text-left font-medium text-ink">{r.year}</th>
              <td className="px-4 py-2">{formatCurrencyCents(r.dividendPerShare)}</td>
              <td className="px-4 py-2">{formatCurrencyCents(r.sharePrice)}</td>
              <td className="px-4 py-2">{formatShares(r.shares)}</td>
              <td className="px-4 py-2 text-accent">{formatCurrency(r.grossDividends)}</td>
              {showTax && <td className="px-4 py-2">{formatCurrency(r.taxes)}</td>}
              <td className="px-4 py-2">{formatCurrency(r.contributions)}</td>
              {showCash && <td className="px-4 py-2">{formatCurrency(r.cashDividends)}</td>}
              <td className="px-4 py-2 font-medium text-ink">{formatCurrency(r.totalValue)}</td>
              <td className="px-4 py-2">{formatPercent(r.yieldOnCost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
