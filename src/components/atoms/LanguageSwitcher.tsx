import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { STORAGE_KEY, type SupportedLanguage } from "../../i18n";

// Reloading lets every animated section, ticker, and carousel re-run its
// mount sequence in the new language instead of freezing mid-cycle. The
// switch itself is driven by local state, not i18n, so the page content
// stays in the current language until that reload actually happens.
const RELOAD_DELAY_MS = 320;

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const currentLang: SupportedLanguage = i18n.resolvedLanguage === "en" ? "en" : "es";
  const [pendingLang, setPendingLang] = useState<SupportedLanguage | null>(null);
  const isSpanish = (pendingLang ?? currentLang) !== "en";

  const handleChange = (checked: boolean) => {
    const next: SupportedLanguage = checked ? "en" : "es";
    if (next === currentLang || pendingLang) return;
    setPendingLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — language just won't persist after reload.
    }
    window.setTimeout(() => window.location.reload(), RELOAD_DELAY_MS);
  };

  return (
    <Switch
      checked={!isSpanish}
      onChange={handleChange}
      disabled={pendingLang !== null}
      aria-label={isSpanish ? t("header.switchToEnglish") : t("header.switchToSpanish")}
      className={`group relative inline-flex h-8 w-[70px] shrink-0 cursor-pointer items-center rounded-full border border-navy/15 bg-navy/[0.06] p-0.5 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-default ${className}`}
    >
      <span
        aria-hidden="true"
        className="relative z-10 flex w-full items-center justify-between px-[7px] text-[11px] font-medium leading-none text-navy/40"
      >
        <span className={isSpanish ? "text-transparent" : ""}>ES</span>
        <span className={!isSpanish ? "text-transparent" : ""}>EN</span>
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0.5 left-0.5 z-20 flex w-8 items-center justify-center rounded-full bg-navy text-[11px] font-semibold text-white shadow-[0_2px_6px_-1px_rgba(30,72,101,.55)] transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none group-active:scale-95 ${
          isSpanish ? "translate-x-0" : "translate-x-[32px]"
        }`}
      >
        {isSpanish ? "ES" : "EN"}
      </span>
    </Switch>
  );
}
