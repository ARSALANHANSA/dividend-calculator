// Pure dividend projection logic. No React and no runtime imports, so it can
// be unit tested directly with `node --test` (see tests/).
//
// Model, simulated month by month:
//   1. The share price grows smoothly: price × (1 + priceGrowth)^(1/12) each month.
//   2. The annual dividend per share is fixed within a year and rises by the
//      dividend growth rate at the start of each new year:
//        DPS(year) = DPS(1) × (1 + dividendGrowth)^(year − 1)
//   3. On payout months (every 12 / frequency months):
//        gross payment = shares × DPS(year) / frequency
//        tax           = gross × taxRate
//        net           = gross − tax
//      With DRIP on, net buys shares at that month's price; otherwise it is
//      kept as cash (no interest).
//   4. Contributions are made at the end of each month (monthly) or the end of
//      each year (annual), after that month's dividend, at that month's price.

export type PayoutFrequency = 1 | 2 | 4 | 12;
export type ContributionFrequency = 1 | 12;

export type DividendInputs = {
  initialShares: number;
  sharePrice: number;
  annualDividendPerShare: number;
  payoutFrequency: PayoutFrequency;
  /** Percent per year, e.g. 5 for 5%. May be negative. */
  dividendGrowthRate: number;
  /** Percent per year. May be negative. */
  priceGrowthRate: number;
  contributionAmount: number;
  contributionFrequency: ContributionFrequency;
  years: number;
  reinvestDividends: boolean;
  /** Percent of each dividend withheld for tax, 0–100. */
  taxRate: number;
};

export type YearRow = {
  year: number;
  dividendPerShare: number;
  sharePrice: number;
  shares: number;
  grossDividends: number;
  taxes: number;
  netDividends: number;
  contributions: number;
  totalContributed: number;
  portfolioValue: number;
  /** Net dividends kept as cash when DRIP is off. */
  cashDividends: number;
  totalValue: number;
  /** This year's gross dividends ÷ total contributed so far, as a percent. */
  yieldOnCost: number;
};

export type ProjectionSummary = {
  startingValue: number;
  startingAnnualIncome: number;
  finalAnnualGross: number;
  finalAnnualNet: number;
  finalQuarterlyNet: number;
  finalMonthlyNet: number;
  finalPerPaymentNet: number;
  totalGrossDividends: number;
  totalTaxes: number;
  totalNetDividends: number;
  totalContributed: number;
  endingShares: number;
  endingSharePrice: number;
  endingPortfolioValue: number;
  cashDividends: number;
  endingTotalValue: number;
  yieldOnCost: number;
};

export type Projection = {
  inputs: DividendInputs;
  rows: YearRow[];
  summary: ProjectionSummary;
};

export const PAYOUT_FREQUENCY_LABELS: Record<PayoutFrequency, string> = {
  12: "Monthly",
  4: "Quarterly",
  2: "Semi-annual",
  1: "Annual",
};

export function yieldToDividendPerShare(yieldPercent: number, sharePrice: number): number {
  return (yieldPercent / 100) * sharePrice;
}

export function dividendPerShareToYield(dividendPerShare: number, sharePrice: number): number {
  return sharePrice > 0 ? (dividendPerShare / sharePrice) * 100 : 0;
}

export function projectDividends(inputs: DividendInputs): Projection {
  const {
    initialShares,
    sharePrice,
    annualDividendPerShare,
    payoutFrequency,
    dividendGrowthRate,
    priceGrowthRate,
    contributionAmount,
    contributionFrequency,
    years,
    reinvestDividends,
    taxRate,
  } = inputs;

  const monthsPerPayment = 12 / payoutFrequency;
  const monthlyPriceFactor = Math.pow(1 + priceGrowthRate / 100, 1 / 12);
  const tax = taxRate / 100;

  let shares = initialShares;
  let price = sharePrice;
  let cash = 0;
  let totalContributed = initialShares * sharePrice;
  const rows: YearRow[] = [];

  for (let year = 1; year <= years; year++) {
    const dps = annualDividendPerShare * Math.pow(1 + dividendGrowthRate / 100, year - 1);
    let gross = 0;
    let taxes = 0;
    let contributions = 0;

    for (let month = 1; month <= 12; month++) {
      price *= monthlyPriceFactor;

      if (month % monthsPerPayment === 0) {
        const payment = (shares * dps) / payoutFrequency;
        const withheld = payment * tax;
        const net = payment - withheld;
        gross += payment;
        taxes += withheld;
        if (reinvestDividends) shares += net / price;
        else cash += net;
      }

      const contributes = contributionFrequency === 12 || month === 12;
      if (contributionAmount > 0 && contributes) {
        shares += contributionAmount / price;
        contributions += contributionAmount;
      }
    }

    totalContributed += contributions;
    const portfolioValue = shares * price;
    rows.push({
      year,
      dividendPerShare: dps,
      sharePrice: price,
      shares,
      grossDividends: gross,
      taxes,
      netDividends: gross - taxes,
      contributions,
      totalContributed,
      portfolioValue,
      cashDividends: cash,
      totalValue: portfolioValue + cash,
      yieldOnCost: totalContributed > 0 ? (gross / totalContributed) * 100 : 0,
    });
  }

  const last = rows[rows.length - 1];
  const sum = (key: "grossDividends" | "taxes" | "netDividends") =>
    rows.reduce((total, row) => total + row[key], 0);

  return {
    inputs,
    rows,
    summary: {
      startingValue: initialShares * sharePrice,
      startingAnnualIncome: initialShares * annualDividendPerShare,
      finalAnnualGross: last?.grossDividends ?? 0,
      finalAnnualNet: last?.netDividends ?? 0,
      finalQuarterlyNet: (last?.netDividends ?? 0) / 4,
      finalMonthlyNet: (last?.netDividends ?? 0) / 12,
      finalPerPaymentNet: (last?.netDividends ?? 0) / payoutFrequency,
      totalGrossDividends: sum("grossDividends"),
      totalTaxes: sum("taxes"),
      totalNetDividends: sum("netDividends"),
      totalContributed,
      endingShares: shares,
      endingSharePrice: price,
      endingPortfolioValue: shares * price,
      cashDividends: cash,
      endingTotalValue: shares * price + cash,
      yieldOnCost: last?.yieldOnCost ?? 0,
    },
  };
}

/** Runs the projection with DRIP on and off so the two can be compared. */
export function compareDrip(inputs: DividendInputs): { withDrip: Projection; withoutDrip: Projection } {
  return {
    withDrip: projectDividends({ ...inputs, reinvestDividends: true }),
    withoutDrip: projectDividends({ ...inputs, reinvestDividends: false }),
  };
}
