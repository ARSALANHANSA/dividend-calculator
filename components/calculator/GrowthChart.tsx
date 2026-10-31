import type { YearRow } from "@/lib/dividend";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

const WIDTH = 640;
const HEIGHT = 240;
const PAD = { top: 16, right: 16, bottom: 28, left: 56 };

/** Lightweight SVG line chart: total value vs. money contributed. */
export default function GrowthChart({ rows, startingValue }: { rows: YearRow[]; startingValue: number }) {
  if (rows.length === 0) return null;

  const points = [
    { year: 0, value: startingValue, contributed: startingValue },
    ...rows.map((r) => ({ year: r.year, value: r.totalValue, contributed: r.totalContributed })),
  ];
  const maxValue = Math.max(...points.map((p) => Math.max(p.value, p.contributed)), 1);
  const lastYear = rows[rows.length - 1].year;
  const innerW = WIDTH - PAD.left - PAD.right;
  const innerH = HEIGHT - PAD.top - PAD.bottom;
  const x = (year: number) => PAD.left + (year / lastYear) * innerW;
  const y = (value: number) => PAD.top + innerH - (value / maxValue) * innerH;
  const line = (key: "value" | "contributed") =>
    points.map((p) => `${x(p.year).toFixed(1)},${y(p[key]).toFixed(1)}`).join(" ");

  const gridValues = [0, 0.25, 0.5, 0.75, 1].map((f) => f * maxValue);
  const last = points[points.length - 1];
  const summary = `Line chart. Total value grows from ${formatCurrency(startingValue)} to ${formatCurrency(
    last.value,
  )} over ${lastYear} years, while total money contributed grows to ${formatCurrency(last.contributed)}.`;

  return (
    <figure>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={summary} className="h-auto w-full">
        {gridValues.map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y(v)} y2={y(v)} stroke="#E4E1DA" strokeWidth="1" />
            <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6B6760">
              {formatCompactCurrency(v)}
            </text>
          </g>
        ))}
        <text x={x(0)} y={HEIGHT - 8} fontSize="11" fill="#6B6760" textAnchor="start">
          Today
        </text>
        <text x={x(lastYear)} y={HEIGHT - 8} fontSize="11" fill="#6B6760" textAnchor="end">
          Year {lastYear}
        </text>
        <polyline points={line("contributed")} fill="none" stroke="#A8A39A" strokeWidth="2" strokeDasharray="5 4" />
        <polyline points={line("value")} fill="none" stroke="#3D6B5C" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0.5 w-4 bg-accent" /> Total value (shares + any cash
          dividends)
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0 w-4 border-t-2 border-dashed border-[#A8A39A]" /> Total
          contributed
        </span>
      </figcaption>
    </figure>
  );
}
