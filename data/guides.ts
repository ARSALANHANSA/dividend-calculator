import type { Guide, Source } from "@/types/content";

// Sources checked on 2026-11-01. Keep URLs to official publications.
const SOURCES = {
  investorDividend: { label: "Investor.gov (SEC): Dividend", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dividend" },
  investorExDate: {
    label: "Investor.gov (SEC): Ex-Dividend Dates: When Are You Entitled to Stock and Cash Dividends",
    url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/ex-dividend-dates-when-are-you-entitled-stock-and",
  },
  investorCompound: { label: "Investor.gov (SEC): Compound Interest Calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
  irsPub550: { label: "IRS Publication 550, Investment Income and Expenses", url: "https://www.irs.gov/publications/p550" },
  irsTopic404: { label: "IRS Topic No. 404, Dividends and Other Corporate Distributions", url: "https://www.irs.gov/taxtopics/tc404" },
  irsTopic409: { label: "IRS Topic No. 409, Capital Gains and Losses", url: "https://www.irs.gov/taxtopics/tc409" },
  irsTopic559: { label: "IRS Topic No. 559, Net Investment Income Tax", url: "https://www.irs.gov/taxtopics/tc559" },
  irs1099Div: { label: "IRS: About Form 1099-DIV, Dividends and Distributions", url: "https://www.irs.gov/forms-pubs/about-form-1099-div" },
  jpmJepq: {
    label: "J.P. Morgan Asset Management: JPMorgan Nasdaq Equity Premium Income ETF (JEPQ)",
    url: "https://am.jpmorgan.com/us/en/asset-management/adv/products/jpmorgan-nasdaq-equity-premium-income-etf-etf-shares-46654q203",
  },
  vanguardVym: { label: "Vanguard: Vanguard High Dividend Yield ETF (VYM)", url: "https://investor.vanguard.com/investment-products/etfs/profile/vym" },
} satisfies Record<string, Source>;

// Fund pages state only stable facts (structure, payout schedule). Yields and
// payment amounts change, so readers are sent to the fund's own page for them.
const FUND_EXAMPLES_NOTE =
  "These examples use hypothetical round numbers, not the fund's actual price or distributions. Check the fund's official page for current figures before entering them. Dividend Calculator isn't affiliated with J.P. Morgan or Vanguard, and this page isn't a recommendation to buy or sell any fund.";

export const guides: Guide[] = [
  {
    slug: "dividend-yield",
    shortTitle: "Dividend Yield",
    title: "Dividend Yield: What It Means and How to Calculate It",
    metaTitle: "Dividend Yield Calculator Guide: Formula and Examples",
    metaDescription:
      "Learn what dividend yield measures, how to calculate it from the annual dividend and share price, and why a high yield is not always a good sign.",
    summary: "The formula for dividend yield, trailing vs. forward yield, and why yield moves when the share price does.",
    definition:
      "Dividend yield is a stock's annual dividend per share divided by its current share price, expressed as a percentage. It tells you how much cash income the investment pays each year relative to what it costs to buy today.",
    formula: [
      { label: "Dividend yield", expression: "Dividend yield (%) = Annual dividend per share ÷ Share price × 100" },
      { label: "Annual dividend from a payment", expression: "Annual dividend per share = Dividend per payment × Payments per year" },
      { label: "Income from a yield", expression: "Annual dividend income = Investment value × Dividend yield" },
    ],
    sections: [
      {
        heading: "How dividend yield affects your income",
        paragraphs: [
          "Yield is the bridge between the money you invest and the cash it produces. At a 3% yield, every $1,000 invested produces about $30 a year in dividends, before tax, as long as the dividend stays the same.",
          "Because yield is calculated from today's price, it changes every time the share price moves, even if the company never changes its dividend. A falling price pushes the yield up; a rising price pushes it down. Your actual income depends on the dividend per share and how many shares you own, not on the yield figure itself.",
        ],
      },
      {
        heading: "Trailing yield vs. forward yield",
        paragraphs: [
          "Financial websites usually show one of two versions. Trailing yield uses the dividends actually paid over the past 12 months. Forward yield takes the most recent dividend payment and multiplies it by the number of payments per year, assuming that rate continues.",
          "Forward yield reflects recent dividend increases or cuts sooner, but it is an assumption about the future. Trailing yield is based on real payments but can lag behind changes. When you enter a yield in the calculator, check which version your source uses.",
        ],
      },
      {
        heading: "Where to find the inputs",
        bullets: [
          "Your brokerage account usually lists the current dividend per share and yield for each holding.",
          "A company's investor relations website typically publishes its dividend history and declared payment amounts.",
          "Fund providers list distribution history and distribution yield in fund documents. Fund yields can be calculated in different ways, so read the definition.",
        ],
      },
      {
        heading: "Using yield in the Dividend Calculator",
        paragraphs: [
          "The calculator lets you enter either a yield or a dollar dividend per share. If you enter a yield, it converts it to dollars using the share price you provide: dividend per share = yield × price. From then on it tracks the dollar dividend, which is how companies actually declare dividends.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: calculating yield from a quarterly dividend",
        steps: [
          "A stock trades at $80 and pays $0.60 per share each quarter.",
          "Annual dividend per share = $0.60 × 4 = $2.40.",
          "Dividend yield = $2.40 ÷ $80 × 100 = 3.0%.",
          "A $10,000 investment would produce about $10,000 × 3.0% = $300 a year before tax.",
        ],
        result: "Yield: 3.0%. Estimated annual income on $10,000: $300.",
      },
      {
        title: "Hypothetical example: the same dividend after a price drop",
        steps: [
          "The share price falls from $80 to $60. The dividend stays at $2.40 a year.",
          "New yield = $2.40 ÷ $60 × 100 = 4.0%.",
          "Someone who already owned the shares still receives $2.40 per share. Only a new buyer gets the higher yield on their purchase price.",
        ],
        result: "The yield rose from 3.0% to 4.0% only because the price fell. Income per share did not change.",
      },
    ],
    misconceptions: [
      {
        myth: "A higher yield is always better.",
        reality:
          "An unusually high yield can mean the market expects the dividend to be cut, or that the share price has fallen sharply. Yield says nothing on its own about whether the payment is sustainable.",
      },
      {
        myth: "The yield I see is what I will earn.",
        reality:
          "Yield is a snapshot based on today's price and recent dividends. Companies can raise, lower, suspend, or eliminate dividends at any time.",
      },
      {
        myth: "Dividend yield is the same as total return.",
        reality: "Total return also includes changes in the share price. A stock can pay a 4% yield and still lose value overall if its price falls.",
      },
    ],
    faqs: [
      {
        question: "What is a good dividend yield?",
        answer:
          "There is no single good number. Typical yields vary by industry, interest rates, and market conditions. Compare a yield with similar companies and with the company's own history, and look at whether earnings and cash flow support the payment.",
      },
      {
        question: "Why did my stock's yield change when the dividend didn't?",
        answer: "Yield is the dividend divided by the current price. When the share price moves, the yield moves the opposite way, even if the dividend stays the same.",
      },
      {
        question: "Can dividend yield be negative?",
        answer: "No. A company either pays a dividend or it doesn't. The lowest possible yield is 0%.",
      },
    ],
    related: ["dividend-growth", "payout-ratio", "dividend-reinvestment-drip"],
    sources: [SOURCES.investorDividend],
  },
  {
    slug: "dividend-reinvestment-drip",
    shortTitle: "Dividend Reinvestment (DRIP)",
    title: "Dividend Reinvestment (DRIP): How Reinvesting Dividends Compounds",
    metaTitle: "DRIP Calculator Guide: How Dividend Reinvestment Works",
    metaDescription:
      "See how a dividend reinvestment plan (DRIP) buys more shares with each payment, how the compounding math works, and how reinvested dividends are taxed.",
    summary: "How each reinvested payment buys more shares, a worked 20-year comparison, and the tax point many people miss.",
    definition:
      "Dividend reinvestment means using each dividend payment to buy more shares of the same investment instead of taking the cash. Programs that do this automatically are called dividend reinvestment plans, or DRIPs. They can be run by a brokerage or offered directly by a company.",
    formula: [
      { label: "Shares bought per payment", expression: "New shares = Net dividend payment ÷ Share price on the payment date" },
      { label: "Payment size", expression: "Dividend payment = Shares owned × Annual dividend per share ÷ Payments per year" },
      {
        label: "Simplified growth with no price or dividend change",
        expression: "Ending value ≈ Starting value × (1 + Yield ÷ n)^(n × Years)",
        note: "n is the number of payments per year. This only holds if price and dividend stay constant.",
      },
    ],
    sections: [
      {
        heading: "Why reinvesting compounds",
        paragraphs: [
          "When a dividend buys more shares, those new shares receive the next dividend too. Each payment is slightly larger than the last, even if the company never raises its dividend. Over long periods this snowball effect can make a large difference to both share count and income.",
          "Compounding works in both directions. Reinvesting also means buying more shares when prices are falling and adding to a position that may be declining. Reinvestment increases exposure to one investment; it does not reduce risk.",
        ],
      },
      {
        heading: "Brokerage DRIPs vs. company plans",
        bullets: [
          "Many brokerages let you switch on reinvestment for individual holdings, often buying fractional shares so the entire payment is invested.",
          "Some companies run their own plans through a transfer agent. These may allow optional cash purchases and occasionally offer shares at a discount. Fees and rules vary by plan.",
          "Reinvested dividends usually buy shares at the market price on or around the payment date, so you do not choose the price.",
        ],
      },
      {
        heading: "Reinvested dividends are still taxable",
        paragraphs: [
          "In a regular taxable brokerage account, reinvested dividends are generally treated as if you received the cash and then bought shares. IRS Publication 550 explains that you must still report the dividends as income, and if a plan lets you buy shares below fair market value, you report the fair market value of those shares as dividend income.",
          "Each reinvestment also creates a new purchase with its own cost basis. Keeping records, or relying on your broker's cost-basis reporting, helps you calculate gains correctly when you sell.",
        ],
      },
      {
        heading: "Modeling DRIP in the calculator",
        paragraphs: [
          "With DRIP switched on, the Dividend Calculator takes each payment, subtracts any tax rate you entered, and buys shares at that month's projected price. With DRIP off, payments are tracked as cash that earns nothing. The results panel shows both scenarios side by side using the same inputs.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: two quarters of reinvestment",
        steps: [
          "You own 200 shares priced at $40. The quarterly dividend is $0.40 per share.",
          "First payment: 200 × $0.40 = $80, which buys $80 ÷ $40 = 2 new shares. You now own 202 shares.",
          "Second payment: 202 × $0.40 = $80.80, which buys 2.02 shares at the same $40 price. You now own 204.02 shares.",
        ],
        result: "Each payment is slightly larger than the one before because the reinvested shares also earn dividends.",
      },
      {
        title: "Hypothetical example: 20 years with and without DRIP",
        steps: [
          "Start with $10,000 at a 4% yield, paid once a year. Assume the share price and dividend never change and there are no taxes or contributions.",
          "Without reinvestment: you collect $400 a year, or $8,000 over 20 years. Total value is $10,000 in shares + $8,000 cash = $18,000.",
          "With reinvestment: value grows 4% a year, so $10,000 × 1.04^20 ≈ $21,911.",
        ],
        result: "Reinvesting produces roughly $3,900 more in this simplified scenario. Real results depend on price changes, dividend changes, and taxes.",
      },
    ],
    misconceptions: [
      {
        myth: "If I reinvest, I don't owe tax on the dividends.",
        reality: "In a taxable account, reinvested dividends are generally taxable in the year they are paid, the same as cash dividends.",
      },
      {
        myth: "DRIP always beats taking cash.",
        reality:
          "Reinvesting adds to the same holding regardless of price or prospects. Taking cash can make sense for income needs, rebalancing, or diversification. It depends on your situation.",
      },
      {
        myth: "Reinvestment guarantees growth.",
        reality: "If the share price falls or the dividend is cut, reinvested money can lose value like any other investment.",
      },
    ],
    faqs: [
      {
        question: "Does DRIP buy fractional shares?",
        answer: "Many brokerages and company plans buy fractional shares so the full payment is invested. Check your provider's rules, since some only buy whole shares and pay the remainder in cash.",
      },
      {
        question: "Can I turn DRIP on for some holdings and not others?",
        answer: "Most brokerages let you choose reinvestment holding by holding. You can model different choices in the calculator by running it separately for each holding.",
      },
      {
        question: "Is a DRIP calculator different from a dividend calculator?",
        answer: "A DRIP calculator is a dividend calculator that models reinvestment. This calculator does both: switch reinvestment on or off and compare the results.",
      },
    ],
    related: ["payout-frequency", "dividend-taxes", "dividend-growth"],
    sources: [SOURCES.irsPub550, SOURCES.investorCompound],
  },
  {
    slug: "dividend-growth",
    shortTitle: "Dividend Growth Rate",
    title: "Dividend Growth Rate: How Rising Dividends Change Future Income",
    metaTitle: "Dividend Growth Calculator Guide: Growth Rate Formula",
    metaDescription:
      "How to calculate a dividend growth rate, project future dividends, and compare a high-yield, low-growth stock with a low-yield, high-growth one.",
    summary: "How to measure a dividend's historical growth rate and why small differences in growth add up over decades.",
    definition:
      "The dividend growth rate is the annual percentage change in a company's dividend per share. A company that raised its annual dividend from $2.00 to $2.10 grew it by 5% that year.",
    formula: [
      { label: "One-year growth", expression: "Growth (%) = (This year's dividend ÷ Last year's dividend − 1) × 100" },
      {
        label: "Compound annual growth rate (CAGR)",
        expression: "CAGR = (Ending dividend ÷ Starting dividend)^(1 ÷ Years) − 1",
      },
      { label: "Projected dividend", expression: "Dividend in year n = Current dividend × (1 + Growth rate)^n" },
    ],
    sections: [
      {
        heading: "Why growth matters as much as yield",
        paragraphs: [
          "Yield tells you what an investment pays today. Growth tells you how that payment might change. Over a few years the difference is small, but over decades a faster-growing dividend can overtake a higher starting yield.",
          "Growth is not guaranteed. Dividends can be frozen, cut, or eliminated, especially during recessions or when a company's earnings fall. Historical growth describes the past only.",
        ],
      },
      {
        heading: "Choosing a growth rate to enter",
        bullets: [
          "Look at the dividend history on the company's investor relations page and calculate the CAGR over 5 and 10 years. Short periods can be distorted by one large raise.",
          "Compare growth with earnings growth. Dividends that grow much faster than earnings push the payout ratio up, which cannot continue forever.",
          "Test a range. Run the calculator at a conservative rate, a middle rate, and 0% to see how sensitive your result is.",
          "Enter a negative growth rate to model a gradual dividend decline.",
        ],
      },
      {
        heading: "The rule of 72",
        paragraphs: [
          "A quick way to sense growth rates: divide 72 by the growth rate to estimate how many years it takes for the dividend to double. At 6% a year, a dividend doubles in roughly 72 ÷ 6 = 12 years. At 3%, it takes about 24 years. This is an approximation, not an exact result.",
        ],
      },
      {
        heading: "How the calculator applies growth",
        paragraphs: [
          "The Dividend Calculator holds the dividend per share constant within each year and raises it by your growth rate at the start of the next year. That mirrors how many companies announce one raise per year. Share price growth is entered separately, so you can model a dividend that grows faster or slower than the share price.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: measuring historical growth",
        steps: [
          "A company paid $2.00 per share eight years ago and pays $2.95 today.",
          "CAGR = ($2.95 ÷ $2.00)^(1 ÷ 8) − 1 = 1.475^0.125 − 1.",
          "1.475^0.125 ≈ 1.0498, so the CAGR is about 5.0% a year.",
        ],
        result: "Average dividend growth: about 5.0% a year over eight years.",
      },
      {
        title: "Hypothetical example: high yield vs. high growth",
        steps: [
          "Option A: $10,000 at a 5% yield growing 1% a year. Year 1 income is $500.",
          "Option B: $10,000 at a 2.5% yield growing 8% a year. Year 1 income is $250.",
          "In year 11, A pays about $552 and B about $540. In year 12, A pays about $558 and B about $583.",
          "This ignores share price changes, reinvestment, and taxes, and assumes both growth rates hold, which is unlikely in practice.",
        ],
        result: "Option B's annual income overtakes Option A's in year 12 in this simplified example.",
      },
    ],
    misconceptions: [
      {
        myth: "A long record of raises means the dividend is safe.",
        reality: "A history of increases shows past behavior. Companies with long records have still cut dividends when business conditions changed.",
      },
      {
        myth: "I should use the company's best recent growth rate.",
        reality: "Recent high growth often slows. Using a conservative rate, or several rates, gives a more realistic range.",
      },
    ],
    faqs: [
      {
        question: "What is a realistic dividend growth rate?",
        answer:
          "It varies widely by company and period, and it can be negative. Base your estimate on the specific company's long-term history and earnings growth, and test lower rates to see how much the result depends on that assumption.",
      },
      {
        question: "Should dividend growth and share price growth be the same?",
        answer:
          "Not necessarily. Over long periods they are often related because both depend on earnings, but they can diverge for years. The calculator keeps them separate so you can test different combinations.",
      },
    ],
    related: ["payout-ratio", "dividend-yield", "dividend-reinvestment-drip"],
    sources: [SOURCES.investorCompound, SOURCES.investorDividend],
  },
  {
    slug: "payout-frequency",
    shortTitle: "Payout Frequency",
    title: "Dividend Payout Frequency: Monthly, Quarterly, and Annual Dividends",
    metaTitle: "Monthly Dividend Calculator Guide: Payout Frequency Explained",
    metaDescription:
      "How monthly, quarterly, semi-annual, and annual dividend schedules change the size of each payment, cash-flow timing, and DRIP compounding.",
    summary: "How payout schedules change the size and timing of each payment, and how much they really affect compounding.",
    definition:
      "Payout frequency is how often an investment pays its dividend: monthly, quarterly, semi-annually, or annually. The frequency changes the size and timing of each payment, but not the annual amount the company has declared.",
    formula: [
      { label: "Payment size", expression: "Dividend per payment = Annual dividend per share ÷ Payments per year" },
      { label: "Your payment", expression: "Your payment = Shares owned × Dividend per payment" },
      { label: "Average monthly income", expression: "Average monthly income = Annual dividend income ÷ 12" },
    ],
    sections: [
      {
        heading: "Common schedules",
        bullets: [
          "Quarterly payments are common among US-listed companies.",
          "Monthly payments are offered by some funds, real estate investment trusts (REITs), and other income-focused investments.",
          "Semi-annual and annual payments are more common among companies listed outside the US.",
          "Some companies also pay occasional special dividends, which are one-time payments and should not be treated as recurring income.",
        ],
      },
      {
        heading: "Does frequency change how much I earn?",
        paragraphs: [
          "Without reinvestment, no: a stock paying $2.40 a year pays $2.40 whether that arrives as 12 payments of $0.20 or 4 of $0.60. With reinvestment, more frequent payments compound slightly faster because each payment starts earning sooner.",
          "The difference is usually modest compared with the effects of yield, dividend growth, and price changes. Frequency matters more for budgeting: monthly payments can make it easier to match income to monthly bills.",
        ],
      },
      {
        heading: "Monthly income from quarterly dividends",
        paragraphs: [
          "The calculator shows an average monthly income figure (annual income ÷ 12) for every payout schedule. If your holdings pay quarterly, you won't receive that amount every month; you'll receive larger payments four times a year. Some investors hold several companies with different payment months to smooth out cash flow.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: same dividend, different schedules",
        steps: [
          "You own 500 shares of a stock that pays $2.40 per share per year.",
          "Monthly: $2.40 ÷ 12 = $0.20 per share, or 500 × $0.20 = $100 each month.",
          "Quarterly: $2.40 ÷ 4 = $0.60 per share, or 500 × $0.60 = $300 each quarter.",
          "Either way, annual income is 500 × $2.40 = $1,200 before tax.",
        ],
        result: "Annual income is the same, $1,200. Only payment size and timing differ.",
      },
      {
        title: "Hypothetical example: compounding with DRIP over 30 years",
        steps: [
          "$10,000 invested at a 4% yield, with a constant share price and dividend, all payments reinvested.",
          "Annual payments: $10,000 × 1.04^30 ≈ $32,434.",
          "Monthly payments: $10,000 × (1 + 0.04 ÷ 12)^360 ≈ $33,135.",
        ],
        result: "Monthly reinvestment ends about $700 higher after 30 years in this simplified case, roughly 2%.",
      },
    ],
    misconceptions: [
      {
        myth: "Monthly dividend payers are better investments.",
        reality: "Payment frequency says nothing about the quality of the business or the safety of the dividend. Judge the investment, not the schedule.",
      },
      {
        myth: "A monthly payer must have a higher yield.",
        reality: "Frequency and yield are independent. Compare the annual dividend to the price, whatever the schedule.",
      },
    ],
    faqs: [
      {
        question: "How do I find a stock's payout frequency?",
        answer: "Check the dividend history on the company's investor relations page or in your brokerage account. Count how many regular payments were made over the past year.",
      },
      {
        question: "Does the calculator handle monthly dividends?",
        answer: "Yes. Choose monthly, quarterly, semi-annual, or annual. The calculator pays dividends on the matching months and, if DRIP is on, reinvests each payment when it arrives.",
      },
    ],
    related: ["dividend-reinvestment-drip", "ex-dividend-date", "dividend-yield"],
    sources: [SOURCES.investorDividend, SOURCES.investorCompound],
  },
  {
    slug: "dividend-taxes",
    shortTitle: "Dividend Taxes",
    title: "How Dividends Are Taxed in the US: Qualified vs. Ordinary Dividends",
    metaTitle: "Dividend Tax Guide: Qualified vs. Ordinary Dividends (US)",
    metaDescription:
      "A general overview of US dividend taxes: qualified vs. ordinary dividends, the holding period rule, Form 1099-DIV, reinvested dividends, and the net investment income tax.",
    summary: "A general US overview of qualified vs. ordinary dividends, the holding period, Form 1099-DIV, and the NIIT.",
    definition:
      "In the US, most dividends received in a taxable account are taxable income in the year they are paid. Dividends that meet IRS requirements are \"qualified\" and taxed at lower long-term capital gain rates; the rest are \"ordinary\" (non-qualified) and taxed at regular income tax rates.",
    formula: [
      { label: "Tax on dividends (simplified)", expression: "Dividend tax ≈ Qualified dividends × Qualified rate + Ordinary dividends × Ordinary rate" },
      { label: "After-tax income", expression: "Net dividend = Gross dividend × (1 − Effective tax rate)" },
    ],
    sections: [
      {
        heading: "Important: this is general information",
        paragraphs: [
          "Tax rules change, rates and income thresholds are adjusted regularly, and your situation depends on your income, filing status, account type, and state. This page is a general educational overview, not tax advice. Check current IRS guidance and consult a qualified tax professional before making decisions.",
        ],
      },
      {
        heading: "Qualified vs. ordinary dividends",
        paragraphs: [
          "Qualified dividends are taxed at the long-term capital gain rates of 0%, 15%, or 20%, depending on your taxable income. Ordinary dividends are taxed at your regular income tax rate, which can be considerably higher.",
          "To be qualified, a dividend generally has to be paid by a US corporation or a qualifying foreign corporation, and you must meet a holding period. For common stock, IRS Publication 550 says you must have held the stock for more than 60 days during the 121-day period that begins 60 days before the ex-dividend date. Some payments, such as many distributions from REITs and money market funds, are generally not qualified.",
        ],
      },
      {
        heading: "Form 1099-DIV",
        paragraphs: [
          "Brokerages and other payers report dividends on Form 1099-DIV. Box 1a shows total ordinary dividends, and Box 1b shows the portion that is qualified. The payer determines which dividends are qualified and reports them on the form.",
        ],
      },
      {
        heading: "Other rules to know",
        bullets: [
          "Reinvested dividends are generally taxable in the year they are paid, even though you never received cash.",
          "The net investment income tax (NIIT) adds 3.8% for individuals whose modified adjusted gross income exceeds $200,000 (single or head of household), $250,000 (married filing jointly), or $125,000 (married filing separately), according to IRS Topic 559.",
          "Dividends inside tax-advantaged accounts such as IRAs and 401(k)s are generally not taxed when paid. Taxes, if any, depend on the account type and the rules for withdrawals.",
          "Many states tax dividends as income. Dividends from foreign companies may have foreign tax withheld, which may be eligible for a credit.",
        ],
      },
      {
        heading: "Using the tax rate field in the calculator",
        paragraphs: [
          "The calculator's dividend tax rate is a single, simplified rate deducted from every payment before it is reinvested. To estimate a rate, you could combine your expected federal rate on qualified dividends with any state tax. Leave it at 0% for tax-advantaged accounts. The calculator does not model brackets, the holding period, NIIT, or capital gains on sale.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: qualified vs. ordinary",
        steps: [
          "An investor receives $1,000 in dividends in a taxable account.",
          "If all $1,000 is qualified and their qualified rate is 15%, federal tax is $1,000 × 15% = $150.",
          "If all $1,000 is ordinary and their marginal income tax rate is 22%, federal tax is $1,000 × 22% = $220.",
        ],
        result: "The same $1,000 could cost $150 or $220 in federal tax, depending on whether the dividends are qualified.",
      },
      {
        title: "Hypothetical example: the holding period",
        steps: [
          "An investor buys shares 10 days before the ex-dividend date and sells them 20 days after it.",
          "They held the shares for about 30 days within the 121-day window, not more than 60.",
        ],
        result: "The dividend would generally not be qualified for that investor, so it would be taxed at ordinary rates.",
      },
    ],
    misconceptions: [
      {
        myth: "All dividends get the low qualified rate.",
        reality: "Only dividends that meet the IRS requirements, including the holding period, are qualified. Others are taxed as ordinary income.",
      },
      {
        myth: "Small dividends don't need to be reported.",
        reality: "Payers generally issue Form 1099-DIV when dividends reach $10, but taxable dividends are reportable whether or not you receive the form.",
      },
    ],
    faqs: [
      {
        question: "What tax rate should I enter in the calculator?",
        answer:
          "Use an approximate combined rate you'd expect to pay on dividends, such as your qualified dividend rate plus any state tax, or 0% for a tax-advantaged account. For a precise figure, ask a tax professional.",
      },
      {
        question: "Are dividends in a Roth IRA taxed?",
        answer: "Dividends inside a Roth IRA are generally not taxed when paid, and qualified Roth withdrawals are generally tax-free. Rules on eligibility and withdrawals apply, so check IRS guidance or a professional.",
      },
      {
        question: "Does the calculator tell me how much tax I will owe?",
        answer: "No. It applies the single rate you enter as a rough estimate. Your actual tax depends on many factors it does not model.",
      },
    ],
    related: ["ex-dividend-date", "dividend-reinvestment-drip", "dividend-yield"],
    sources: [SOURCES.irsTopic404, SOURCES.irsPub550, SOURCES.irs1099Div, SOURCES.irsTopic559, SOURCES.irsTopic409],
  },
  {
    slug: "payout-ratio",
    shortTitle: "Payout Ratio",
    title: "Dividend Payout Ratio: How Much of Earnings a Company Pays Out",
    metaTitle: "Dividend Payout Ratio: Formula, Examples, and Limits",
    metaDescription:
      "Learn how to calculate the dividend payout ratio from earnings or free cash flow, what it suggests about dividend sustainability, and how it relates to growth.",
    summary: "The share of earnings paid as dividends, what it suggests about room for growth, and why it varies by industry.",
    definition:
      "The payout ratio is the percentage of a company's earnings paid to shareholders as dividends. A company that earns $4.00 per share and pays $2.40 per share in dividends has a 60% payout ratio.",
    formula: [
      { label: "Earnings payout ratio", expression: "Payout ratio (%) = Dividends per share ÷ Earnings per share × 100" },
      { label: "Cash flow payout ratio", expression: "Cash payout ratio (%) = Dividends paid ÷ Free cash flow × 100" },
      {
        label: "Sustainable growth estimate",
        expression: "Sustainable growth ≈ Return on equity × (1 − Payout ratio)",
        note: "A textbook approximation that assumes stable profitability and financing.",
      },
    ],
    sections: [
      {
        heading: "Why the payout ratio matters for income",
        paragraphs: [
          "Earnings not paid as dividends are retained to fund the business, reduce debt, or buy back shares. A lower ratio leaves more room to keep paying the dividend if earnings dip, and more capacity to raise it over time.",
          "A ratio above 100% means a company is paying out more than it earned in that period. That can happen briefly, for example during a bad year, but it cannot be sustained indefinitely without borrowing, selling assets, or cutting the dividend.",
        ],
      },
      {
        heading: "Earnings vs. cash flow",
        paragraphs: [
          "Accounting earnings include non-cash items such as depreciation and one-time charges, so they can swing in ways that don't affect the cash available for dividends. Many analysts also check dividends against free cash flow, the cash left after the business funds its operations and investments.",
        ],
      },
      {
        heading: "Industry differences",
        bullets: [
          "Mature businesses with steady cash flow often pay out a larger share of earnings than fast-growing companies that reinvest heavily.",
          "Real estate investment trusts (REITs) must distribute most of their taxable income to keep their tax status, so their ratios based on standard earnings often look very high. Industry-specific measures are commonly used instead.",
          "Compare a company with its own history and with similar businesses rather than with a universal target.",
        ],
      },
      {
        heading: "Connecting payout ratio to the calculator",
        paragraphs: [
          "The calculator does not ask for a payout ratio, but it can inform the dividend growth rate you enter. If a company already pays out nearly all its earnings, dividend growth above its earnings growth is hard to sustain, so a conservative growth assumption may be more realistic.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: calculating the ratio",
        steps: [
          "A company reports earnings of $4.00 per share and pays $2.40 per share in annual dividends.",
          "Payout ratio = $2.40 ÷ $4.00 × 100 = 60%.",
          "The company retains $1.60 per share (40%) to reinvest or strengthen its balance sheet.",
        ],
        result: "Payout ratio: 60%.",
      },
      {
        title: "Hypothetical example: estimating sustainable growth",
        steps: [
          "The same company earns a 12% return on equity and pays out 60% of earnings.",
          "Sustainable growth ≈ 12% × (1 − 0.60) = 4.8% a year.",
        ],
        result: "About 4.8% a year, a rough ceiling for long-term dividend growth if profitability and payout stay the same.",
      },
    ],
    misconceptions: [
      {
        myth: "A low payout ratio guarantees the dividend is safe.",
        reality: "A low ratio provides a cushion, but earnings can fall quickly. Debt, cash flow, and business conditions matter too.",
      },
      {
        myth: "There is one ideal payout ratio.",
        reality: "Appropriate ratios differ widely by industry, business maturity, and company structure.",
      },
    ],
    faqs: [
      {
        question: "Where do I find a company's payout ratio?",
        answer: "Many financial websites show it, or you can calculate it from the dividends per share and earnings per share in the company's annual report.",
      },
      {
        question: "Why is a payout ratio sometimes negative or missing?",
        answer: "If a company reports a loss, earnings per share is negative and the ratio isn't meaningful. Websites may show it as negative, blank, or not applicable.",
      },
    ],
    related: ["dividend-growth", "dividend-yield", "ex-dividend-date"],
    sources: [SOURCES.investorDividend],
  },
  {
    slug: "ex-dividend-date",
    shortTitle: "Ex-Dividend Date",
    title: "Ex-Dividend Date: Who Gets the Dividend and When",
    metaTitle: "Ex-Dividend Date Explained: Record Date and Payment Date",
    metaDescription:
      "Understand the declaration, ex-dividend, record, and payment dates, when you must buy to receive a dividend, and why share prices often drop on the ex-date.",
    summary: "The four dividend dates, when you must own shares to be paid, and why the price usually adjusts on the ex-date.",
    definition:
      "The ex-dividend date is the first day a stock trades without the right to its next dividend. If you buy on or after the ex-dividend date, the seller receives that dividend. If you buy before it, you do.",
    sections: [
      {
        heading: "The four dividend dates",
        bullets: [
          "Declaration date: the company's board announces the dividend amount, record date, and payment date.",
          "Ex-dividend date: the cutoff for buyers. Purchases made on or after this date don't receive the upcoming dividend.",
          "Record date: the date you must be on the company's books as a shareholder to receive the dividend.",
          "Payment date: the date the dividend is actually paid to eligible shareholders.",
        ],
      },
      {
        heading: "How the ex-dividend date is set",
        paragraphs: [
          "According to the SEC's Investor.gov, the ex-dividend date for stocks is usually set on the record date, or one business day before it if the record date is not a business day. This reflects the current one-business-day settlement cycle for most stock trades.",
          "There is an exception for very large dividends. When a dividend equals 25% or more of the stock's value, special rules apply and the ex-dividend date is set differently.",
        ],
      },
      {
        heading: "What happens to the share price",
        paragraphs: [
          "On the ex-dividend date, the share price often falls by roughly the amount of the dividend, because new buyers no longer receive it. Other market forces affect the price on any given day, so the drop is rarely exact.",
          "This is why buying just before the ex-date to \"capture\" a dividend doesn't produce free money. You receive the dividend, but the shares are typically worth about that much less, and the dividend may be taxable.",
        ],
      },
      {
        heading: "Ex-dividend dates and taxes",
        paragraphs: [
          "The ex-dividend date is also the reference point for the IRS holding period that determines whether a dividend is qualified. Holding a stock only briefly around the ex-date can make the dividend ordinary rather than qualified. See the dividend taxes guide for details.",
        ],
      },
      {
        heading: "Why this calculator doesn't use dates",
        paragraphs: [
          "The Dividend Calculator projects years into the future, so it models payments by frequency rather than specific dates. It assumes you own your shares throughout and are eligible for every payment.",
        ],
      },
    ],
    examples: [
      {
        title: "Example based on Investor.gov's illustration",
        steps: [
          "A company sets a record date of Monday, March 16, 2026.",
          "Because the record date is a business day, the ex-dividend date is also March 16, 2026.",
          "To receive the dividend, you would need to buy the shares before March 16, by Friday, March 13, excluding holidays.",
          "If the record date had fallen on a Sunday, the ex-dividend date would move to the prior business day, Friday, March 13.",
        ],
        result: "Buy before the ex-dividend date to be entitled to the dividend.",
      },
      {
        title: "Hypothetical example: the price adjustment",
        steps: [
          "A stock closes at $50.00 the day before its ex-dividend date and will pay a $0.50 dividend.",
          "All else being equal, it might open around $49.50 on the ex-date.",
          "A buyer the day before receives $0.50 but holds shares worth about $0.50 less.",
        ],
        result: "Total value is roughly unchanged before tax. The dividend is not a free gain.",
      },
    ],
    misconceptions: [
      {
        myth: "You need to hold the stock until the payment date.",
        reality: "Entitlement is based on owning the shares before the ex-dividend date. You can sell on or after the ex-date and still receive the dividend on the payment date.",
      },
      {
        myth: "Buying right before the ex-date is a reliable way to earn extra income.",
        reality: "The share price typically adjusts down by about the dividend amount, and short holding periods can make the dividend non-qualified for tax purposes.",
      },
    ],
    faqs: [
      {
        question: "If I buy on the ex-dividend date, do I get the dividend?",
        answer: "No. The seller receives it. You must buy before the ex-dividend date.",
      },
      {
        question: "If I sell on the ex-dividend date, do I still get the dividend?",
        answer: "Yes, for a regular cash dividend. If you owned the shares before the ex-date, you remain entitled even if you sell on or after it.",
      },
    ],
    related: ["dividend-taxes", "payout-frequency", "payout-ratio"],
    sources: [SOURCES.investorExDate, SOURCES.irsPub550],
  },
  {
    slug: "jepq-dividend",
    shortTitle: "JEPQ Dividend Calculator",
    title: "JEPQ Dividend Calculator",
    metaTitle: "JEPQ Dividend Calculator: Monthly Income and DRIP Estimates",
    metaDescription:
      "How the JEPQ dividend works: why JEPQ pays monthly, why the amount changes, how its income is taxed, and how to estimate your own JEPQ income with DRIP.",
    summary:
      "Estimate your monthly JEPQ income, total distributions, and growth with reinvestment. Below the calculator: why JEPQ pays every month and why the payment changes.",
    calculator: {
      heading: "Calculate your JEPQ dividend income",
      intro:
        "The calculator is set to monthly payouts with 0% distribution growth. The price and distribution below are round example numbers, not JEPQ's actual figures. Replace them with the current share price and the total of the last 12 monthly distributions per share.",
      dataSource: SOURCES.jpmJepq,
      defaults: {
        holdingMode: "amount",
        initialInvestment: "10000",
        sharePrice: "50",
        dividendMode: "perShare",
        dividendPerShare: "4.50",
        payoutFrequency: "12",
        dividendGrowthRate: "0",
        priceGrowthRate: "0",
        contributionAmount: "0",
        years: "10",
        reinvestDividends: true,
        taxRate: "0",
      },
    },
    definition:
      "JEPQ is the ticker for the JPMorgan Nasdaq Equity Premium Income ETF, an actively managed fund that holds stocks drawn mainly from the Nasdaq-100 and sells call options, largely through equity-linked notes (ELNs), to generate income. It pays a distribution every month, and the amount changes from month to month.",
    formula: [
      { label: "Annual JEPQ income", expression: "Annual income ≈ Shares owned × Sum of the last 12 monthly distributions per share" },
      { label: "Trailing distribution yield", expression: "Yield (%) = Last 12 months of distributions per share ÷ Share price × 100" },
      { label: "Average monthly income", expression: "Monthly income ≈ Annual income ÷ 12" },
    ],
    sections: [
      {
        heading: "Where the JEPQ dividend comes from",
        paragraphs: [
          "Most of JEPQ's income doesn't come from company dividends. Many Nasdaq-100 companies pay small dividends or none at all. Instead, the fund earns option premiums by selling call options tied to the Nasdaq-100, mostly through equity-linked notes issued by banks. It pays that income out to shareholders each month along with the dividends from its stocks.",
          "Selling call options is a trade-off. The fund collects premium income, but it gives up part of the gains when the Nasdaq-100 rises strongly. In a fast-rising market JEPQ will usually lag the index; in a flat or choppy market the premiums can make up a larger share of its return.",
        ],
      },
      {
        heading: "Why the monthly payment changes",
        paragraphs: [
          "Option premiums depend on market volatility. When markets are volatile, options are priced higher and the fund tends to collect more; when markets are calm, premiums shrink. So JEPQ's monthly distribution rises and falls, and no particular amount is guaranteed.",
          "For planning, it's more realistic to use the total of the last 12 monthly payments than to multiply the latest month by 12. A single high or low month can make the forward yield look very different from what the fund paid over a full year.",
        ],
      },
      {
        heading: "How JEPQ distributions are taxed",
        paragraphs: [
          "In a US taxable account, income from options and equity-linked notes generally doesn't count as qualified dividends, so a large part of JEPQ's distribution may be taxed at ordinary income rates rather than the lower qualified-dividend rates. The exact split changes each year and is reported on your Form 1099-DIV.",
          "Reinvested distributions are taxed the same way as cash ones. In a tax-advantaged account such as an IRA, distributions aren't taxed when paid. Investors outside the US may face withholding tax on US fund distributions; the rate depends on your country and any tax treaty.",
        ],
      },
      {
        heading: "How to estimate JEPQ income with the calculator",
        bullets: [
          "Find the current share price and the last 12 months of distributions on the fund's official page or your brokerage.",
          "Enter your shares or investment amount and the share price.",
          "Choose \"Dividend per share\" and enter the 12-month total, or enter the trailing yield instead.",
          "Set the payout frequency to Monthly.",
          "Use a dividend growth rate of 0% as a neutral starting point. JEPQ's payments aren't designed to grow every year the way some company dividends are.",
          "Consider a share price growth rate at or below 0% for a cautious estimate, since the option strategy limits upside.",
          "Enter your tax rate, and switch DRIP on or off to compare reinvesting with taking the cash.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: monthly income from $10,000",
        steps: [
          "Assume a share price of $50, so $10,000 buys 200 shares.",
          "Assume the last 12 monthly distributions added up to $4.50 per share, a trailing yield of $4.50 ÷ $50 = 9%.",
          "Annual income = 200 × $4.50 = $900 before tax.",
          "Average monthly income = $900 ÷ 12 = $75. Actual months will be above or below that.",
        ],
        result: "About $900 a year, or $75 a month on average, before tax.",
      },
      {
        title: "Hypothetical example: 10 years with and without DRIP",
        steps: [
          "Same assumptions: 200 shares at $50 and $4.50 a year per share, paid monthly. Distribution growth and price growth are both 0%, with no tax and no contributions.",
          "Without DRIP: you keep receiving $900 a year, for $9,000 in total. Your 200 shares are still worth $10,000.",
          "With DRIP: each monthly payment buys more shares. After 10 years you own about 490 shares, and the final year pays about $2,102.",
          "Ending value with DRIP is about $24,514, compared with $19,000 ($10,000 in shares plus $9,000 in cash) without it.",
        ],
        result: "Reinvesting monthly more than doubles the final year's income in this example, but only if the share price and distribution hold steady.",
      },
    ],
    examplesNote: FUND_EXAMPLES_NOTE,
    misconceptions: [
      {
        myth: "JEPQ's yield is guaranteed income.",
        reality: "The distribution depends on option premiums and market conditions, and it changes every month. It can fall substantially.",
      },
      {
        myth: "A high yield means JEPQ beats the Nasdaq-100.",
        reality:
          "Selling call options caps part of the upside. In strong rising markets JEPQ typically returns less than the index in total, even with its distributions.",
      },
      {
        myth: "JEPQ's distributions are qualified dividends.",
        reality: "Much of the income comes from options and equity-linked notes, which are generally taxed as ordinary income. Check your Form 1099-DIV.",
      },
    ],
    faqs: [
      {
        question: "How often does JEPQ pay dividends?",
        answer: "Monthly. JEPQ has paid a distribution every month since it launched in 2022. The amount changes from month to month.",
      },
      {
        question: "How much will I earn from JEPQ each month?",
        answer:
          "Multiply your shares by the latest monthly distribution per share for a rough figure, or use the 12-month total divided by 12 for a steadier average. Enter your numbers in the calculator with Monthly frequency to project income over time.",
      },
      {
        question: "Where can I find JEPQ's current yield and distribution history?",
        answer:
          "On J.P. Morgan Asset Management's official JEPQ page or through your brokerage. This site doesn't show live fund data, so always check a current source before entering numbers.",
      },
      {
        question: "Should I reinvest JEPQ distributions?",
        answer:
          "It depends on whether you need the income now. Reinvesting buys more shares and compounds income if the price and distributions hold up. Taking the cash gives steady income to spend. The calculator shows both outcomes side by side.",
      },
    ],
    related: ["vym-dividend", "dividend-reinvestment-drip", "payout-frequency"],
    sources: [SOURCES.jpmJepq, SOURCES.irs1099Div, SOURCES.irsPub550],
  },
  {
    slug: "vym-dividend",
    shortTitle: "VYM Dividend Calculator",
    title: "VYM Dividend Calculator",
    metaTitle: "VYM Dividend Calculator: Quarterly Income and DRIP Growth",
    metaDescription:
      "How the VYM dividend works: what Vanguard's High Dividend Yield ETF holds, when it pays, how its dividends are taxed, and how to project your VYM income.",
    summary:
      "Estimate your quarterly VYM income and how dividend growth and reinvestment could build it over time. Below the calculator: what VYM holds and how it pays.",
    calculator: {
      heading: "Calculate your VYM dividend income",
      intro:
        "The calculator is set to quarterly payouts. The price, dividend, and 6% dividend growth below are round example numbers, not VYM's actual figures. Replace them with the current share price, the total of the last four quarterly dividends per share, and your own growth assumption.",
      dataSource: SOURCES.vanguardVym,
      defaults: {
        holdingMode: "amount",
        initialInvestment: "10000",
        sharePrice: "125",
        dividendMode: "perShare",
        dividendPerShare: "3.50",
        payoutFrequency: "4",
        dividendGrowthRate: "6",
        priceGrowthRate: "0",
        contributionAmount: "0",
        years: "20",
        reinvestDividends: true,
        taxRate: "0",
      },
    },
    definition:
      "VYM is the ticker for the Vanguard High Dividend Yield ETF, an index fund that aims to track the FTSE High Dividend Yield Index. The index holds US companies forecast to have above-average dividend yields and excludes real estate investment trusts (REITs). VYM pays dividends quarterly.",
    formula: [
      { label: "Annual VYM income", expression: "Annual income ≈ Shares owned × Sum of the last 4 quarterly dividends per share" },
      { label: "Quarterly income", expression: "Quarterly income ≈ Annual income ÷ 4" },
      { label: "Trailing dividend yield", expression: "Yield (%) = Last 4 quarterly dividends per share ÷ Share price × 100" },
    ],
    sections: [
      {
        heading: "Where the VYM dividend comes from",
        paragraphs: [
          "VYM's dividends are the dividends paid by the companies it holds, collected by the fund and passed on to shareholders after fund expenses. Because the fund tracks an index of higher-yielding US stocks, it holds hundreds of companies, and no single one decides the size of the payment.",
          "That makes VYM's income more diversified than owning a few dividend stocks, but it isn't fixed. When the companies in the index raise or cut their dividends, VYM's payments follow.",
        ],
      },
      {
        heading: "When VYM pays and why payments vary",
        paragraphs: [
          "VYM pays four times a year. Individual quarterly payments can differ noticeably, because the companies in the fund don't all pay on the same schedule, so dividends arriving within each quarter are uneven.",
          "Adding up the last four payments gives a better picture of annual income than multiplying a single quarter by four.",
        ],
      },
      {
        heading: "How VYM dividends are taxed",
        paragraphs: [
          "In a US taxable account, dividends from US companies held long enough are often qualified and taxed at lower rates than ordinary income, though some of a fund's distribution can be non-qualified. Your Form 1099-DIV shows the exact split each year.",
          "Reinvested dividends are taxed the same way as cash ones. Investors outside the US may face withholding tax on dividends from US funds; the rate depends on your country and any tax treaty.",
        ],
      },
      {
        heading: "How to estimate VYM income with the calculator",
        bullets: [
          "Find the current share price and the last four quarterly dividends on Vanguard's official page or your brokerage.",
          "Enter your shares or investment amount and the share price.",
          "Choose \"Dividend per share\" and enter the four-quarter total, or enter the trailing yield.",
          "Set the payout frequency to Quarterly.",
          "Pick a dividend growth rate you think is realistic. Looking at how much the annual total has changed over several years is a reasonable guide; use a lower number for a cautious estimate.",
          "Add your tax rate and any regular contributions, then compare results with DRIP on and off.",
        ],
      },
    ],
    examples: [
      {
        title: "Hypothetical example: quarterly income from $10,000",
        steps: [
          "Assume a share price of $125, so $10,000 buys 80 shares.",
          "Assume the last four quarterly dividends added up to $3.50 per share, a trailing yield of $3.50 ÷ $125 = 2.8%.",
          "Annual income = 80 × $3.50 = $280 before tax.",
          "Quarterly income ≈ $280 ÷ 4 = $70.",
        ],
        result: "About $280 a year, or $70 a quarter on average, before tax.",
      },
      {
        title: "Hypothetical example: 20 years of dividend growth and DRIP",
        steps: [
          "Same starting point: 80 shares at $125 and $3.50 a year per share, paid quarterly. Assume dividends grow 6% a year, the share price stays flat, and there is no tax and no contributions.",
          "Without DRIP: income grows only from dividend increases, reaching about $847 in year 20. Total dividends received are about $10,300.",
          "With DRIP: reinvesting adds shares as well. You end with about 222 shares, and year 20 pays about $2,236.",
          "Ending value with DRIP is about $27,807, compared with about $20,300 ($10,000 in shares plus $10,300 in cash) without it.",
        ],
        result: "Dividend growth and reinvestment together raise yearly income from $280 to about $2,236 in this example.",
      },
    ],
    examplesNote: FUND_EXAMPLES_NOTE,
    misconceptions: [
      {
        myth: "VYM pays the same amount every quarter.",
        reality: "Quarterly payments vary with the timing and size of the dividends paid by the companies in the fund.",
      },
      {
        myth: "A high-dividend fund can't lose value.",
        reality: "VYM's share price moves with the stock market. Dividends add to the return, but the value of your holding can still fall.",
      },
      {
        myth: "VYM's dividend always goes up.",
        reality: "Its payments depend on the companies in the index. If they cut dividends, as happens in recessions, VYM's income can fall.",
      },
    ],
    faqs: [
      {
        question: "How often does VYM pay dividends?",
        answer: "Quarterly, four times a year. The amount varies from quarter to quarter.",
      },
      {
        question: "How much will I earn from VYM?",
        answer:
          "Multiply your shares by the total of the last four quarterly dividends per share for a rough annual figure. To project growth and reinvestment over time, enter your numbers in the calculator with Quarterly frequency.",
      },
      {
        question: "Where can I find VYM's current yield and dividend history?",
        answer:
          "On Vanguard's official VYM page or through your brokerage. This site doesn't show live fund data, so check a current source before entering numbers.",
      },
      {
        question: "What's the difference between VYM and JEPQ?",
        answer:
          "VYM passes on dividends from a broad index of higher-yielding US stocks and pays quarterly. JEPQ generates most of its income by selling options on the Nasdaq-100 and pays monthly, usually at a higher but more variable rate, with more of it taxed as ordinary income.",
      },
    ],
    related: ["jepq-dividend", "dividend-growth", "dividend-yield"],
    sources: [SOURCES.vanguardVym, SOURCES.irs1099Div, SOURCES.irsTopic404],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
