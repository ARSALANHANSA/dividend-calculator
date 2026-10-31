"use client";

import { useRef, useState, type FormEvent } from "react";
import { Calculator, RotateCcw, ShieldCheck } from "lucide-react";
import { compareDrip, dividendPerShareToYield, yieldToDividendPerShare } from "@/lib/dividend";
import {
  DEFAULT_FORM_VALUES,
  parseNumber,
  validateForm,
  type CalculatorFormValues,
  type FieldName,
} from "@/lib/validation";
import { formatCurrency, formatCurrencyCents, formatPercent } from "@/lib/format";
import { FormGroup, ModeToggle, NumberField, SelectField } from "./Fields";
import ResultsPanel from "./ResultsPanel";
import YearTable from "./YearTable";

type Result = { comparison: ReturnType<typeof compareDrip>; reinvest: boolean; warnings: string[] };

function calculate(values: CalculatorFormValues) {
  const validation = validateForm(values);
  if (!validation.ok) return { errors: validation.errors };
  const result: Result = {
    comparison: compareDrip(validation.inputs),
    reinvest: validation.inputs.reinvestDividends,
    warnings: validation.warnings,
  };
  return { result };
}

const initialResult = calculate(DEFAULT_FORM_VALUES).result!;

export default function DividendCalculator() {
  const [values, setValues] = useState<CalculatorFormValues>(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [result, setResult] = useState<Result>(initialResult);
  const [stale, setStale] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof CalculatorFormValues>(key: K, value: CalculatorFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setStale(true);
  };

  const field = (name: FieldName) => ({
    id: name,
    value: values[name],
    onChange: (v: string) => set(name, v),
    error: errors[name],
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = calculate(values);
    if (outcome.errors) {
      setErrors(outcome.errors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setErrors({});
    setResult(outcome.result);
    setStale(false);
    const shown = outcome.result.reinvest ? outcome.result.comparison.withDrip : outcome.result.comparison.withoutDrip;
    setAnnouncement(`Results updated: ending value ${formatCurrency(shown.summary.endingTotalValue)}.`);
    // On small screens the results sit below the form, so bring them into view.
    const results = document.getElementById("results");
    const top = results?.getBoundingClientRect().top ?? 0;
    if (results && (top < 0 || top > window.innerHeight * 0.6)) results.scrollIntoView({ block: "start" });
  };

  const onReset = () => {
    setValues(DEFAULT_FORM_VALUES);
    setErrors({});
    setResult(initialResult);
    setStale(false);
    setAnnouncement("Inputs reset to the example values.");
  };

  // Show the derived counterpart of whichever dividend input is active.
  const price = parseNumber(values.sharePrice);
  const derivedDividendHint = (() => {
    if (!(price > 0)) return "Enter a share price to see the equivalent figure.";
    if (values.dividendMode === "yield") {
      const y = parseNumber(values.dividendYield);
      return y >= 0 ? `Equals ${formatCurrencyCents(yieldToDividendPerShare(y, price))} per share per year (yield × price).` : undefined;
    }
    const d = parseNumber(values.dividendPerShare);
    return d >= 0 ? `Equals a ${formatPercent(dividendPerShareToYield(d, price))} yield (dividend ÷ price).` : undefined;
  })();

  const errorList = Object.entries(errors) as [FieldName, string][];
  const projection = result.reinvest ? result.comparison.withDrip : result.comparison.withoutDrip;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <form onSubmit={onSubmit} noValidate className="card space-y-6 p-5 sm:p-6 lg:col-span-5" aria-label="Dividend calculator inputs">
          {errorList.length > 0 && (
            <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-danger/40 bg-danger/5 p-4 text-sm">
              <p className="font-semibold text-danger">Please fix {errorList.length === 1 ? "this field" : `these ${errorList.length} fields`}:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/85">
                {errorList.map(([name, message]) => (
                  <li key={name}>
                    <a href={`#${name}`} className="underline underline-offset-2">{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FormGroup title="Your holding">
            <ModeToggle
              name="holdingMode"
              legend="Enter holding as"
              value={values.holdingMode}
              onChange={(v) => set("holdingMode", v)}
              options={[
                { value: "amount", label: "Dollar amount" },
                { value: "shares", label: "Number of shares" },
              ]}
            />
            {values.holdingMode === "amount" ? (
              <NumberField {...field("initialInvestment")} label="Initial investment" prefix="$" hint="The current market value of your position." />
            ) : (
              <NumberField {...field("shares")} label="Number of shares" hint="Fractional shares are fine, e.g. 12.5." />
            )}
            <NumberField {...field("sharePrice")} label="Current share price" prefix="$" hint="Used to convert dollars into shares and to price reinvested dividends." />
          </FormGroup>

          <FormGroup title="Dividend">
            <ModeToggle
              name="dividendMode"
              legend="Enter dividend as"
              value={values.dividendMode}
              onChange={(v) => set("dividendMode", v)}
              options={[
                { value: "yield", label: "Yield (%)" },
                { value: "perShare", label: "Dividend per share ($)" },
              ]}
            />
            {values.dividendMode === "yield" ? (
              <NumberField {...field("dividendYield")} label="Annual dividend yield" suffix="%" hint={derivedDividendHint} />
            ) : (
              <NumberField {...field("dividendPerShare")} label="Annual dividend per share" prefix="$" hint={derivedDividendHint} />
            )}
            <SelectField
              {...field("payoutFrequency")}
              label="Payout frequency"
              options={[
                { value: "12", label: "Monthly (12 per year)" },
                { value: "4", label: "Quarterly (4 per year)" },
                { value: "2", label: "Semi-annual (2 per year)" },
                { value: "1", label: "Annual (1 per year)" },
              ]}
            />
          </FormGroup>

          <FormGroup title="Growth assumptions">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <NumberField {...field("dividendGrowthRate")} label="Dividend growth" suffix="%/yr" optional inputMode="decimal" hint="Negative values model cuts." />
              <NumberField {...field("priceGrowthRate")} label="Share price growth" suffix="%/yr" optional hint="Negative values model declines." />
            </div>
          </FormGroup>

          <FormGroup title="Contributions">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <NumberField {...field("contributionAmount")} label="Additional contribution" prefix="$" optional />
              <SelectField
                {...field("contributionFrequency")}
                label="Contribution frequency"
                options={[
                  { value: "12", label: "Every month" },
                  { value: "1", label: "Every year" },
                ]}
              />
            </div>
          </FormGroup>

          <FormGroup title="Period and options">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <NumberField {...field("years")} label="Investment period" suffix="years" inputMode="numeric" hint="1 to 100 years." />
              <NumberField {...field("taxRate")} label="Dividend tax rate" suffix="%" optional hint="Withheld from each payment before reinvesting." />
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line p-3">
              <input
                type="checkbox"
                checked={values.reinvestDividends}
                onChange={(e) => set("reinvestDividends", e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent"
              />
              <span className="text-sm">
                <span className="font-medium text-ink">Reinvest dividends (DRIP)</span>
                <span className="block text-muted">Use each payment to buy more shares instead of taking cash.</span>
              </span>
            </label>
          </FormGroup>

          <div className="flex flex-wrap gap-3 border-t border-line pt-5">
            <button type="submit" className="btn-primary flex-1">
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Calculate dividends
            </button>
            <button type="button" onClick={onReset} className="btn-secondary">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Calculated in your browser. Your numbers are not sent anywhere or saved, and no account is needed.
          </p>
        </form>

        <section id="results" aria-label="Calculator results" className="scroll-mt-4 lg:col-span-7">
          <p role="status" className="sr-only">{announcement}</p>
          <div className="card p-5 sm:p-6">
            {stale && (
              <p className="mb-4 rounded-lg border border-warn/30 bg-warn/5 px-3 py-2 text-sm text-warn">
                You&apos;ve changed inputs. Press &ldquo;Calculate dividends&rdquo; to update these results.
              </p>
            )}
            {result.warnings.map((w) => (
              <p key={w} className="mb-4 rounded-lg border border-warn/30 bg-warn/5 px-3 py-2 text-sm text-warn">{w}</p>
            ))}
            <ResultsPanel projection={projection} withDrip={result.comparison.withDrip} withoutDrip={result.comparison.withoutDrip} />
          </div>
        </section>
      </div>

      <section aria-labelledby="breakdown-heading">
        <h2 id="breakdown-heading" className="mb-4 font-display text-2xl font-medium text-ink">Year-by-year breakdown</h2>
        <YearTable rows={projection.rows} showTax={projection.inputs.taxRate > 0} showCash={!projection.inputs.reinvestDividends} />
      </section>
    </div>
  );
}
