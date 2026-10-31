// Cookie / storage consent helpers. The site currently loads no analytics or
// marketing scripts; these categories exist so that any future optional
// script can be gated with hasConsent() before it runs.

export const CONSENT_STORAGE_KEY = "dc_cookie_consent";
export const CONSENT_VERSION = 1;
export const OPEN_COOKIE_SETTINGS_EVENT = "dc:open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "dc:consent-changed";

export type OptionalCategory = "analytics" | "marketing";

export type ConsentPreferences = Record<OptionalCategory, boolean>;

export type StoredConsent = ConsentPreferences & {
  necessary: true;
  version: number;
  updatedAt: string;
};

export function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      version: CONSENT_VERSION,
      updatedAt: String(parsed.updatedAt ?? ""),
    };
  } catch {
    return null;
  }
}

export function saveConsent(preferences: ConsentPreferences): StoredConsent {
  const record: StoredConsent = {
    necessary: true,
    ...preferences,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage can be blocked (private mode, browser settings). The choice
    // still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: record }));
  return record;
}

export function hasConsent(category: OptionalCategory): boolean {
  return readConsent()?.[category] === true;
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
