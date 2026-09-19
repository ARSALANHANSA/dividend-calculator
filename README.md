# Dividend Calculator

A Next.js (App Router) + Tailwind CSS tool site built around the keyword
"dividend calculator". Includes an interactive projection calculator plus
on-page SEO content (explainer + FAQ) targeting the keyword.

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- No external UI libraries — everything is hand-built for a distinct look

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/layout.tsx` — fonts (Newsreader, IBM Plex Sans, IBM Plex Mono) + SEO metadata
- `app/page.tsx` — hero, calculator section, explainer, FAQ
- `components/DividendCalculator.tsx` — the interactive calculator (client component)
- `app/globals.css` — base styles + `.input` utility
- `tailwind.config.ts` — color/type tokens (paper/ink/pine/gold ledger palette)

## Calculator methodology

Each projected year:
1. Dividend = starting balance × current yield
2. If reinvestment is on, the dividend is added back to the balance
3. The annual contribution is added
4. The balance grows by the expected share-price appreciation rate
5. The yield itself compounds by the dividend growth rate (simulating raises)

This is a simplified educational model — it doesn't account for taxes,
dividend cuts, or market volatility. Adjust `DividendCalculator.tsx` if you
want a different methodology (e.g. modeling yield as dividend ÷ live price).

## Deploying

Works out of the box on Vercel:

```bash
npx vercel
```

## Customizing for other keywords

If you want to reuse this shell for a related keyword (e.g. "DRIP calculator",
"dividend yield calculator"), update:
- `metadata` in `app/layout.tsx` (title, description, keywords)
- The hero copy and FAQ content in `app/page.tsx`
"# dividendCalculator" 
"# dividendCalculator" 
"# dividendCalculator" 
"# dividend-calculator" 
"# dividend-calculator" 
"# dividend-calculator" 
