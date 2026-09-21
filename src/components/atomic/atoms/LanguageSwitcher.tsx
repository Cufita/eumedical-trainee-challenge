import { useTranslation } from "react-i18next";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const isSpanish = i18n.resolvedLanguage !== "en";

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`inline-flex items-center gap-0.5 rounded-full border border-navy/15 bg-navy/[0.04] p-0.5 text-[12px] font-medium leading-none ${className}`}
    >
      <button
        type="button"
        onClick={() => void i18n.changeLanguage("es")}
        aria-pressed={isSpanish}
        aria-label={t("header.switchToSpanish")}
        className={`rounded-full px-2.5 py-1.5 transition-colors duration-150 ${
          isSpanish ? "bg-navy text-white" : "text-navy/55 hover:text-navy"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => void i18n.changeLanguage("en")}
        aria-pressed={!isSpanish}
        aria-label={t("header.switchToEnglish")}
        className={`rounded-full px-2.5 py-1.5 transition-colors duration-150 ${
          !isSpanish ? "bg-navy text-white" : "text-navy/55 hover:text-navy"
        }`}
      >
        EN
      </button>
    </div>
  );
}
