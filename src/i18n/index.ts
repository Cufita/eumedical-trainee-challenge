import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "./locales/es";
import { en } from "./locales/en";

export const STORAGE_KEY = "eumedical-lang";
export type SupportedLanguage = "es" | "en";

function getInitialLanguage(): SupportedLanguage {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // localStorage unavailable (privacy mode, SSR) — fall back to default.
  }
  return "es";
}

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (language) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // ignore write failures — language just won't persist this session.
  }
});

export default i18n;
