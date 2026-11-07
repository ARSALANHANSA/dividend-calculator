import type { Faq } from "@/types/content";

/** Calculator-focused questions shown on the homepage. */
export const homeFaqs: Faq[] = [
  {
    question: "How accurate is this dividend calculator?",
    answer:
      "The math is exact for the assumptions you enter, but the assumptions themselves are estimates. Real dividends, share prices, and growth rates change from year to year, and dividends can be cut or eliminated. Treat the results as one possible scenario, not a forecast.",
  },
  {
    question: "Should I enter a dividend yield or a dividend per share?",
    answer:
      "Either works. If you know the dollar amount a company pays per share each year, enter that. If you only know the yield, enter it with the current share price and the calculator converts it: dividend per share = yield × share price.",
  },
  {
    question: "What does yield on cost mean in the results?",
    answer:
      "Yield on cost is the final year's dividends divided by the total amount you contributed (your initial investment plus any additions). It shows how much income your original money produces after years of dividend growth and reinvestment.",
  },
  {
    question: "Why is the monthly income figure an average?",
    answer:
      "Monthly income is the final year's annual income divided by 12. If your investment pays quarterly, you'd receive larger payments four times a year rather than the same amount each month.",
  },
  {
    question: "Does the calculator include taxes?",
    answer:
      "Only if you enter a dividend tax rate. That single rate is deducted from every payment before it's reinvested. It does not model tax brackets, qualified vs. ordinary dividends, or capital gains when you sell.",
  },
  {
    question: "Can I model a dividend cut or a falling share price?",
    answer: "Yes. Enter a negative dividend growth rate to model a shrinking dividend, or a negative share price growth rate to model declining prices.",
  },
  {
    question: "Can I use this as a JEPQ or VYM dividend calculator?",
    answer:
      "Yes. Enter the fund's current share price and its last 12 months of distributions per share (or its yield). Choose Monthly for JEPQ or Quarterly for VYM. The dedicated JEPQ and VYM dividend calculator pages come preset for each fund and explain what to enter.",
  },
];

/** Broader questions for the /faq page. Kept distinct from homeFaqs to avoid duplication. */
export const siteFaqs: Faq[] = [
  {
    question: "Is the Dividend Calculator free?",
    answer: "Yes. There's no charge, no sign-up, and no account. Every feature is available to everyone.",
  },
  {
    question: "Are my numbers saved or sent anywhere?",
    answer:
      "No. Calculations run entirely in your browser using JavaScript. The values you type are not transmitted to a server and are not saved in your browser. Refreshing the page resets the calculator to its example values.",
  },
  {
    question: "Does the calculator look up stock prices or dividends?",
    answer:
      "No. It doesn't connect to any market data service. You enter the share price, dividend, and growth assumptions yourself, which also means it keeps working offline once the page has loaded.",
  },
  {
    question: "Does this site recommend stocks or funds?",
    answer:
      "No. We don't recommend any security, fund, or strategy, and nothing on the site is investment, financial, or tax advice. The calculator and guides are for education.",
  },
  {
    question: "What's the difference between a dividend calculator and a DRIP calculator?",
    answer:
      "A DRIP calculator focuses on reinvesting dividends. This calculator handles both cases: switch reinvestment on or off, and the results compare the two side by side.",
  },
  {
    question: "Why might my brokerage show different numbers?",
    answer:
      "Brokerages use actual payment dates, real prices on each reinvestment date, fees, and your actual tax situation. This calculator uses constant assumptions and smooth monthly price growth, so results will differ.",
  },
  {
    question: "Can I use the calculator for ETFs and mutual funds?",
    answer:
      "Yes, as long as you enter the fund's distribution per share or yield and a share price. This works for ETFs such as JEPQ (monthly) and VYM (quarterly). Fund distributions can include capital gains and return of capital, and they often vary more than company dividends, so test several scenarios.",
  },
  {
    question: "Who writes the guides?",
    answer:
      "The guides are written and maintained by the Dividend Calculator site team. They are reviewed against official sources such as SEC Investor.gov and IRS publications, which are linked at the bottom of each guide. See the About page for details.",
  },
  {
    question: "I found an error. How do I report it?",
    answer: "Please let us know through the Contact page. We review reported errors and update the calculator or guides when a correction is needed.",
  },
];
