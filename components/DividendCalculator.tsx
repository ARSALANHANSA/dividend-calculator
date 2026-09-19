"use client";

import { useMemo, useState } from "react";

type YearRow = {
  year: number;
  startBalance: number;
  dividend: number;
  contribution: number;
  endBalance: number;
  yieldOnCost: number;
};

function currency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function percent(n: number) {
  return `${n.toFixed(2)}%`;
}

export default function DividendCalculator() {
  const [initial, setInitial] = useState(10000);
  const [yieldPct, setYieldPct] = useState(4);
  const [growthPct, setGrowthPct] = useState(6);
  const [appreciationPct, setAppreciationPct] = useState(4);
  const [contribution, setContribution] = useState(1200);
  const [years, setYears] = useState(20);
  const [reinvest, setReinvest] = useState(true);

  const { rows, totals } = useMemo(() => {
    const rows: YearRow[] = [];
    let balance = initial;
    let currentYield = yieldPct / 100;
    let totalDividends = 0;
    let totalContributed = initial;

    for (let y = 1; y <= years; y++) {
      const startBalance = balance;
      const dividend = startBalance * currentYield;
      totalDividends += dividend;

      if (reinvest) balance += dividend;
      balance += contribution;
      totalContributed += contribution;
      balance *= 1 + appreciationPct / 100;

      rows.push({
        year: y,
        startBalance,
        dividend,
        contribution,
        endBalance: balance,
        yieldOnCost: (dividend / initial) * 100,
      });

      currentYield *= 1 + growthPct / 100;
    }

    return {
      rows,
      totals: {
        endBalance: balance,
        totalDividends,
        totalContributed,
        finalAnnualDividend: rows.length ? rows[rows.length - 1].dividend : 0,
      },
    };
  }, [initial, yieldPct, growthPct, appreciationPct, contribution, years, reinvest]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="border border-line bg-white/60 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ink mb-6">Your numbers</h2>

          <Field label="Initial investment" suffix="$">
            <input
              type="number"
              min={0}
              value={initial}
              onChange={(e) => setInitial(Number(e.target.value))}
              className="input"
            />
          </Field>

          <Field label="Current dividend yield" suffix="%">
            <input
              type="number"
              min={0}
              step={0.1}
              value={yieldPct}
              onChange={(e) => setYieldPct(Number(e.target.value))}
              className="input"
            />
          </Field>

          <Field label="Annual dividend growth rate" suffix="%">
            <input
              type="number"
              step={0.1}
              value={growthPct}
              onChange={(e) => setGrowthPct(Number(e.target.value))}
              className="input"
            />
          </Field>

          <Field label="Expected annual share price growth" suffix="%">
            <input
              type="number"
              step={0.1}
              value={appreciationPct}
              onChange={(e) => setAppreciationPct(Number(e.target.value))}
              className="input"
            />
          </Field>

          <Field label="Additional contribution per year" suffix="$">
            <input
              type="number"
              min={0}
              value={contribution}
              onChange={(e) => setContribution(Number(e.target.value))}
              className="input"
            />
          </Field>

          <Field label="Number of years" suffix="yrs">
            <input
              type="number"
              min={1}
              max={50}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="input"
            />
          </Field>

          <label className="flex items-center gap-3 mt-6 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={reinvest}
              onChange={(e) => setReinvest(e.target.checked)}
              className="h-4 w-4 accent-pine"
            />
            <span className="text-sm text-ink/80">
              Reinvest dividends automatically (DRIP)
            </span>
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="border border-line bg-white/60 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ink mb-6">
            Statement — after {years} years
          </h2>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 mb-8">
            <Stat label="Ending balance" value={currency(totals.endBalance)} highlight />
            <Stat label="Total contributed" value={currency(totals.totalContributed)} />
            <Stat label="Total dividends received" value={currency(totals.totalDividends)} />
            <Stat
              label="Final year dividend income"
              value={currency(totals.finalAnnualDividend)}
            />
          </div>

          <div className="overflow-x-auto border-t border-line">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-line text-left text-ink/60">
                  <th className="py-2 pr-4 font-sans font-medium">Year</th>
                  <th className="py-2 pr-4 font-sans font-medium">Start balance</th>
                  <th className="py-2 pr-4 font-sans font-medium">Dividend</th>
                  <th className="py-2 pr-4 font-sans font-medium">Contribution</th>
                  <th className="py-2 font-sans font-medium">End balance</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.year} className="border-b border-line/60">
                    <td className="py-2 pr-4">{r.year}</td>
                    <td className="py-2 pr-4">{currency(r.startBalance)}</td>
                    <td className="py-2 pr-4 text-pine-light">{currency(r.dividend)}</td>
                    <td className="py-2 pr-4">{currency(r.contribution)}</td>
                    <td className="py-2">{currency(r.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-ink/50 leading-relaxed">
            This is a simplified projection, not financial advice. It assumes the dividend
            yield grows at a constant annual rate, contributions are made at year-end, and
            share price appreciates at a constant annual rate. Actual returns vary with market
            conditions, dividend cuts, and taxes.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  suffix,
  children,
}: {
  label: string;
  suffix: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm text-ink/70 mb-1.5">{label}</label>
      <div className="flex items-center border-b border-line focus-within:border-pine transition-colors">
        {children}
        <span className="text-sm text-ink/40 pl-2">{suffix}</span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-ink/50 mb-1">{label}</div>
      <div
        className={`font-mono ${
          highlight ? "text-2xl text-pine" : "text-lg text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
