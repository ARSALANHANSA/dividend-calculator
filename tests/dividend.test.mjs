// Run with: npm test  (uses Node's built-in test runner and TypeScript type stripping, Node 22.18+)
import { test } from "node:test";
import assert from "node:assert/strict";
import { compareDrip, dividendPerShareToYield, projectDividends, yieldToDividendPerShare } from "../lib/dividend.ts";
import { DEFAULT_FORM_VALUES, parseNumber, validateForm } from "../lib/validation.ts";

const base = {
  initialShares: 100,
  sharePrice: 50,
  annualDividendPerShare: 2, // 4% yield
  payoutFrequency: 1,
  dividendGrowthRate: 0,
  priceGrowthRate: 0,
  contributionAmount: 0,
  contributionFrequency: 1,
  years: 2,
  reinvestDividends: true,
  taxRate: 0,
};

const close = (actual, expected, tolerance = 1e-6) =>
  assert.ok(Math.abs(actual - expected) < tolerance, `expected ${expected}, got ${actual}`);

test("yield and dividend per share convert both ways", () => {
  close(yieldToDividendPerShare(4, 50), 2);
  close(dividendPerShareToYield(2, 50), 4);
  assert.equal(dividendPerShareToYield(2, 0), 0);
});

test("DRIP with annual payout compounds by the yield (hand-calculated)", () => {
  // Year 1: 100 × $2 = $200 → buys 4 shares → 104 shares
  // Year 2: 104 × $2 = $208 → buys 4.16 shares → 108.16 shares → $5,408
  const { rows, summary } = projectDividends(base);
  close(rows[0].grossDividends, 200);
  close(rows[0].shares, 104);
  close(rows[1].grossDividends, 208);
  close(summary.endingShares, 108.16);
  close(summary.endingTotalValue, 5408);
  close(summary.totalNetDividends, 408);
});

test("without DRIP, dividends accumulate as cash and income stays flat", () => {
  const { rows, summary } = projectDividends({ ...base, reinvestDividends: false });
  close(rows[1].grossDividends, 200);
  close(summary.endingShares, 100);
  close(summary.cashDividends, 400);
  close(summary.endingTotalValue, 5400);
});

test("dividend growth raises the per-share dividend each year", () => {
  const { rows } = projectDividends({ ...base, reinvestDividends: false, dividendGrowthRate: 10, years: 3 });
  close(rows[0].dividendPerShare, 2);
  close(rows[1].dividendPerShare, 2.2);
  close(rows[2].dividendPerShare, 2.42);
  close(rows[2].grossDividends, 242);
});

test("tax is withheld before reinvestment", () => {
  // $200 gross, 15% tax = $30, $170 reinvested → 3.4 shares
  const { rows, summary } = projectDividends({ ...base, years: 1, taxRate: 15 });
  close(rows[0].taxes, 30);
  close(rows[0].netDividends, 170);
  close(summary.endingShares, 103.4);
});

test("annual contributions are added at year end", () => {
  const { rows, summary } = projectDividends({
    ...base,
    reinvestDividends: false,
    contributionAmount: 1000,
    years: 2,
  });
  // Year 1 dividend on 100 shares; contribution buys 20 shares after the payout.
  close(rows[0].grossDividends, 200);
  close(rows[0].shares, 120);
  close(rows[1].grossDividends, 240);
  close(summary.totalContributed, 7000);
});

test("monthly contributions add twelve deposits per year", () => {
  const { rows } = projectDividends({ ...base, contributionAmount: 100, contributionFrequency: 12, years: 1, annualDividendPerShare: 0 });
  close(rows[0].contributions, 1200);
  close(rows[0].shares, 124);
});

test("each payout frequency pays the same annual total without DRIP", () => {
  for (const payoutFrequency of [1, 2, 4, 12]) {
    const { rows, summary } = projectDividends({ ...base, payoutFrequency, reinvestDividends: false, years: 1 });
    close(rows[0].grossDividends, 200);
    close(summary.finalPerPaymentNet, 200 / payoutFrequency);
  }
});

test("more frequent payouts compound slightly faster with DRIP", () => {
  const annual = projectDividends({ ...base, payoutFrequency: 1, years: 10 }).summary.endingTotalValue;
  const monthly = projectDividends({ ...base, payoutFrequency: 12, years: 10 }).summary.endingTotalValue;
  assert.ok(monthly > annual);
});

test("quarterly DRIP matches hand calculation for one year", () => {
  // Each quarter: payment = shares × $0.50; buys payment / $50 shares → ×1.01 per quarter
  const { summary } = projectDividends({ ...base, payoutFrequency: 4, years: 1 });
  close(summary.endingShares, 100 * Math.pow(1.01, 4));
});

test("share price growth compounds to the annual rate", () => {
  const { summary } = projectDividends({ ...base, annualDividendPerShare: 0, priceGrowthRate: 6, years: 5 });
  close(summary.endingSharePrice, 50 * Math.pow(1.06, 5), 1e-6);
});

test("yield on cost uses final-year gross dividends over total contributed", () => {
  const { summary } = projectDividends({ ...base, reinvestDividends: false, dividendGrowthRate: 10, years: 3 });
  close(summary.yieldOnCost, (242 / 5000) * 100);
});

test("compareDrip returns both scenarios", () => {
  const { withDrip, withoutDrip } = compareDrip({ ...base, years: 10 });
  assert.ok(withDrip.summary.finalAnnualGross > withoutDrip.summary.finalAnnualGross);
});

test("parseNumber accepts formatted input and rejects junk", () => {
  assert.equal(parseNumber("$10,000"), 10000);
  assert.equal(parseNumber("4.5%"), 4.5);
  assert.equal(parseNumber("-3"), -3);
  assert.ok(Number.isNaN(parseNumber("")));
  assert.ok(Number.isNaN(parseNumber("abc")));
  assert.ok(Number.isNaN(parseNumber("1e5")));
  assert.ok(Number.isNaN(parseNumber("1.2.3")));
});

test("default form values validate", () => {
  const result = validateForm(DEFAULT_FORM_VALUES);
  assert.equal(result.ok, true);
  close(result.inputs.initialShares, 200);
  close(result.inputs.annualDividendPerShare, 1.75);
});

test("validation rejects empty, negative, zero and extreme values", () => {
  const check = (patch, field) => {
    const result = validateForm({ ...DEFAULT_FORM_VALUES, ...patch });
    assert.equal(result.ok, false, `expected ${field} to fail`);
    assert.ok(result.errors[field], `expected error on ${field}`);
  };
  check({ initialInvestment: "" }, "initialInvestment");
  check({ initialInvestment: "0" }, "initialInvestment");
  check({ initialInvestment: "-5" }, "initialInvestment");
  check({ sharePrice: "abc" }, "sharePrice");
  check({ dividendYield: "101" }, "dividendYield");
  check({ dividendYield: "-1" }, "dividendYield");
  check({ years: "0" }, "years");
  check({ years: "101" }, "years");
  check({ years: "2.5" }, "years");
  check({ taxRate: "120" }, "taxRate");
  check({ dividendGrowthRate: "80" }, "dividendGrowthRate");
  check({ dividendMode: "perShare", dividendPerShare: "60", sharePrice: "50" }, "dividendPerShare");
  check({ holdingMode: "shares", shares: "0" }, "shares");
});

test("optional fields default to zero when blank", () => {
  const result = validateForm({ ...DEFAULT_FORM_VALUES, contributionAmount: "", taxRate: "", dividendGrowthRate: "", priceGrowthRate: "" });
  assert.equal(result.ok, true);
  assert.equal(result.inputs.contributionAmount, 0);
  assert.equal(result.inputs.taxRate, 0);
});

test("shares mode and per-share dividend mode", () => {
  const result = validateForm({
    ...DEFAULT_FORM_VALUES,
    holdingMode: "shares",
    shares: "40",
    dividendMode: "perShare",
    dividendPerShare: "2",
  });
  assert.equal(result.ok, true);
  assert.equal(result.inputs.initialShares, 40);
  assert.equal(result.inputs.annualDividendPerShare, 2);
});

test("unusually high yield produces a warning, not an error", () => {
  const result = validateForm({ ...DEFAULT_FORM_VALUES, dividendYield: "20" });
  assert.equal(result.ok, true);
  assert.equal(result.warnings.length, 1);
});
