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

const initialLanguage = getInitialLanguage();

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

// Keeps <html lang> truthful for screen readers and search engines — without
// this it stays hardcoded to "es" from index.html even after switching to EN.
document.documentElement.lang = initialLanguage;

i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // ignore write failures — language just won't persist this session.
  }
});

export default i18n;
