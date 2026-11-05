# Dividend Calculator

Source for **https://dividend-calculator.pro**: a free, browser-based dividend calculator with supporting
dividend guides, legal pages, cookie consent, and technical SEO.

- Next.js 14 (App Router), TypeScript, Tailwind CSS, lucide-react icons
- Every page is statically prerendered. No backend, database, API keys, `.env` files, or external data APIs.
- The calculator runs entirely in the browser. Inputs are never sent or stored.

## Getting started

Requires Node.js 18.17+ to build and run the site. Running the unit tests needs **Node 22.18+**, which can run
TypeScript directly.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run build`     | Production build (static prerender of all pages) |
| `npm start`         | Serve the production build                       |
| `npm test`          | Unit tests for the calculation and validation logic |
| `npm run typecheck` | TypeScript check                                 |
| `npm run lint`      | ESLint (`next/core-web-vitals`)                  |

## Deploying

Any host that runs Next.js works. On Vercel, import the repository and use the defaults; no environment
variables are needed. The canonical domain lives in `lib/site-config.ts`, not in an environment variable.

## Before launch: owner checklist

1. **Contact email**: set via `contactEmail` in `lib/site-config.ts`. Set it to `null` to hide it; the contact
   page then says that no address has been published yet.
2. **Legal review**: have the Privacy Policy, Terms, and Disclaimer reviewed for your jurisdiction, including
   the governing law and liability sections. Confirm your hosting provider's logging practices, which the
   Privacy Policy mentions.
3. **Content review date**: update `lastReviewed` in `lib/site-config.ts` whenever guides are revised. It
   feeds the "Last reviewed" dates, the sitemap, and the Article structured data.
4. **Domain redirect**: at your host, 301/308-redirect `www.dividend-calculator.pro` to `dividend-calculator.pro`
   (the canonical domain set in `lib/site-config.ts`).
5. Submit `https://dividend-calculator.pro/sitemap.xml` in Google Search Console.

## Project structure

```
app/                     Routes, metadata, sitemap.ts, robots.ts, not-found.tsx, OG image
  page.tsx               Homepage + calculator (targets "dividend calculator")
  dividend-guides/       Guide hub and [slug] guide pages (statically generated)
  about, contact, faq, privacy-policy, terms-and-conditions, cookie-policy, disclaimer
components/
  calculator/            Calculator form, results, SVG chart, year table
  cookies/               Consent banner + settings dialog, footer settings button
  layout/                Header, mobile nav, footer
data/                    Guide content (guides.ts) and FAQs (faqs.ts)
lib/
  dividend.ts            Pure projection logic (no React)
  validation.ts          Form parsing and validation
  format.ts              USD / percent formatting
  consent.ts             Consent storage helpers (hasConsent() for any future optional script)
  seo.ts                 Metadata and structured-data helpers
  site-config.ts         Site name, domain, navigation, contact email
types/                   Shared content types
tests/                   node:test unit tests
```

## Calculator formulas

The projection (`lib/dividend.ts`) simulates the period month by month:

1. **Dividend per share**: entered directly, or derived from yield: `DPS = yield × share price`.
   Growth is applied once a year: `DPS(year n) = DPS(1) × (1 + dividend growth)^(n − 1)`.
2. **Share price** grows evenly each month: `price × (1 + price growth)^(1/12)`, which compounds to the annual rate.
3. **Payments** happen every `12 ÷ frequency` months: `payment = shares × DPS ÷ frequency`.
4. **Tax**, if entered, is withheld from each payment: `net = payment × (1 − tax rate)`.
5. **DRIP on**: `new shares = net ÷ that month's price`. **DRIP off**: net dividends are held as cash that
   earns no interest.
6. **Contributions** buy shares at the end of each month (monthly) or the end of each year (annual), after
   that month's dividend.

Results: final-year annual income (monthly = ÷12, quarterly = ÷4), total dividends, ending shares and value,
and **yield on cost** = final-year gross dividends ÷ total contributed (initial investment + contributions).
The same inputs are also run with DRIP flipped to produce the with/without comparison.

The model doesn't include fees, inflation, specific payment dates, interest on cash, or capital gains tax on
sale. These limits are stated on the site.

## Cookie consent

The site loads no analytics or marketing scripts. The banner stores one local storage key,
`dc_cookie_consent`. If you add an optional script later, gate it with `hasConsent("analytics")` (or
`"marketing"`) from `lib/consent.ts`, listen for the `dc:consent-changed` event, and update the Privacy and
Cookie policies first.
