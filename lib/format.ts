const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const cents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

/** Whole dollars, except cents below $10 so small payments stay meaningful. */
export function formatCurrency(value: number): string {
  return Math.abs(value) < 10 && value !== 0 ? cents.format(value) : wholeDollars.format(value);
}

export function formatCurrencyCents(value: number): string {
  return cents.format(value);
}

export function formatCompactCurrency(value: number): string {
  return compact.format(value);
}

export function formatPercent(value: number, digits = 2): string {
  return `${value.toFixed(digits)}%`;
}

export function formatShares(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}
