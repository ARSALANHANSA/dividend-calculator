import type { ReactNode } from "react";

type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  inputMode?: "decimal" | "numeric";
};

// Text inputs with inputMode keep invalid characters visible so validation can
// explain them, instead of the browser silently discarding them.
export function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  error,
  optional,
  inputMode = "decimal",
}: NumberFieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
            {prefix}
          </span>
        )}
        <input
          id={id}
          name={id}
          type="text"
          inputMode={inputMode}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`field-input ${prefix ? "pl-7" : ""} ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted">
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field-input"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Two-option radio group styled as a segmented control. */
export function ModeToggle<T extends string>({
  name,
  legend,
  value,
  onChange,
  options,
}: {
  name: string;
  legend: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">{legend}</legend>
      <div className="inline-flex rounded-lg border border-line bg-paper p-0.5 text-sm">
        {options.map((o) => (
          <label
            key={o.value}
            className={`cursor-pointer rounded-md px-3 py-1.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
              value === o.value ? "bg-surface font-medium text-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FormGroup({ title, children }: { title: string; children: ReactNode }) {
  const headingId = `group-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div role="group" aria-labelledby={headingId} className="space-y-4 border-t border-line pt-5 first:border-t-0 first:pt-0">
      <p id={headingId} className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>
      {children}
    </div>
  );
}
