// Converts raw form strings into validated DividendInputs. Type-only imports
// keep this file runnable under `node --test` without a bundler.
import type { ContributionFrequency, DividendInputs, PayoutFrequency } from "./dividend";

export type HoldingMode = "amount" | "shares";
export type DividendMode = "yield" | "perShare";

export type CalculatorFormValues = {
  holdingMode: HoldingMode;
  initialInvestment: string;
  shares: string;
  sharePrice: string;
  dividendMode: DividendMode;
  dividendYield: string;
  dividendPerShare: string;
  payoutFrequency: string;
  dividendGrowthRate: string;
  priceGrowthRate: string;
  contributionAmount: string;
  contributionFrequency: string;
  years: string;
  reinvestDividends: boolean;
  taxRate: string;
};

export type FieldName = Exclude<
  keyof CalculatorFormValues,
  "holdingMode" | "dividendMode" | "reinvestDividends"
>;

export type ValidationResult =
  | { ok: true; inputs: DividendInputs; warnings: string[] }
  | { ok: false; errors: Partial<Record<FieldName, string>> };

export const DEFAULT_FORM_VALUES: CalculatorFormValues = {
  holdingMode: "amount",
  initialInvestment: "10000",
  shares: "100",
  sharePrice: "50",
  dividendMode: "yield",
  dividendYield: "3.5",
  dividendPerShare: "1.75",
  payoutFrequency: "4",
  dividendGrowthRate: "5",
  priceGrowthRate: "4",
  contributionAmount: "100",
  contributionFrequency: "12",
  years: "20",
  reinvestDividends: true,
  taxRate: "0",
};

type Rule = { label: string; min: number; max: number; minInclusive?: boolean; required?: boolean; integer?: boolean };

const RULES: Record<FieldName, Rule> = {
  initialInvestment: { label: "Initial investment", min: 0, max: 1_000_000_000, minInclusive: false, required: true },
  shares: { label: "Number of shares", min: 0, max: 1_000_000_000, minInclusive: false, required: true },
  sharePrice: { label: "Share price", min: 0, max: 1_000_000, minInclusive: false, required: true },
  dividendYield: { label: "Dividend yield", min: 0, max: 100, required: true },
  dividendPerShare: { label: "Annual dividend per share", min: 0, max: 1_000_000, required: true },
  payoutFrequency: { label: "Payout frequency", min: 1, max: 12, required: true },
  dividendGrowthRate: { label: "Dividend growth rate", min: -50, max: 50 },
  priceGrowthRate: { label: "Share price growth rate", min: -50, max: 50 },
  contributionAmount: { label: "Contribution", min: 0, max: 100_000_000 },
  contributionFrequency: { label: "Contribution frequency", min: 1, max: 12, required: true },
  years: { label: "Investment period", min: 1, max: 100, required: true, integer: true },
  taxRate: { label: "Dividend tax rate", min: 0, max: 100 },
};

/** Accepts "10,000", "$10000" and "4%" style input. Returns NaN for junk. */
export function parseNumber(raw: string): number {
  const cleaned = raw.trim().replace(/[$,%\s]/g, "");
  if (cleaned === "") return NaN;
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(cleaned)) return NaN;
  return Number(cleaned);
}

function checkField(name: FieldName, raw: string): { value: number; error?: string } {
  const rule = RULES[name];
  if (raw.trim() === "") {
    return rule.required ? { value: NaN, error: `Enter a ${rule.label.toLowerCase()}.` } : { value: 0 };
  }
  const value = parseNumber(raw);
  if (Number.isNaN(value)) return { value, error: `${rule.label} must be a number.` };
  if (rule.integer && !Number.isInteger(value)) return { value, error: `${rule.label} must be a whole number of years.` };
  const belowMin = rule.minInclusive === false ? value <= rule.min : value < rule.min;
  if (belowMin) {
    const msg =
      rule.minInclusive === false
        ? `${rule.label} must be greater than ${rule.min}.`
        : rule.min === 0
          ? `${rule.label} cannot be negative.`
          : `${rule.label} must be at least ${rule.min}.`;
    return { value, error: msg };
  }
  if (value > rule.max) return { value, error: `${rule.label} cannot be more than ${rule.max.toLocaleString("en-US")}.` };
  return { value };
}

export function validateForm(values: CalculatorFormValues): ValidationResult {
  const errors: Partial<Record<FieldName, string>> = {};
  const read = (name: FieldName) => {
    const { value, error } = checkField(name, values[name]);
    if (error) errors[name] = error;
    return value;
  };

  const sharePrice = read("sharePrice");
  const initialShares =
    values.holdingMode === "amount" ? read("initialInvestment") / sharePrice : read("shares");

  let annualDividendPerShare: number;
  if (values.dividendMode === "yield") {
    annualDividendPerShare = (read("dividendYield") / 100) * sharePrice;
  } else {
    annualDividendPerShare = read("dividendPerShare");
    if (!errors.dividendPerShare && !errors.sharePrice && annualDividendPerShare > sharePrice) {
      errors.dividendPerShare = "Annual dividend per share cannot exceed the share price (a yield above 100%).";
    }
  }

  const payoutFrequency = read("payoutFrequency");
  if (!errors.payoutFrequency && ![1, 2, 4, 12].includes(payoutFrequency)) {
    errors.payoutFrequency = "Choose a payout frequency.";
  }
  const contributionFrequency = read("contributionFrequency");
  if (!errors.contributionFrequency && ![1, 12].includes(contributionFrequency)) {
    errors.contributionFrequency = "Choose a contribution frequency.";
  }

  const dividendGrowthRate = read("dividendGrowthRate");
  const priceGrowthRate = read("priceGrowthRate");
  const contributionAmount = read("contributionAmount");
  const years = read("years");
  const taxRate = read("taxRate");

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const warnings: string[] = [];
  const yieldPercent = (annualDividendPerShare / sharePrice) * 100;
  if (yieldPercent > 15) {
    warnings.push(
      `A ${yieldPercent.toFixed(1)}% yield is unusually high. Very high yields sometimes signal a falling share price or a dividend at risk of being cut, so double-check the figure.`,
    );
  }
  if (dividendGrowthRate > 15) {
    warnings.push("Dividend growth above 15% a year is rarely sustained for long periods. Consider testing a lower rate.");
  }
  if (priceGrowthRate > 15) {
    warnings.push("Share price growth above 15% a year compounds quickly. Consider testing a more conservative rate.");
  }

  return {
    ok: true,
    warnings,
    inputs: {
      initialShares,
      sharePrice,
      annualDividendPerShare,
      payoutFrequency: payoutFrequency as PayoutFrequency,
      dividendGrowthRate,
      priceGrowthRate,
      contributionAmount,
      contributionFrequency: contributionFrequency as ContributionFrequency,
      years,
      reinvestDividends: values.reinvestDividends,
      taxRate,
    },
  };
}
