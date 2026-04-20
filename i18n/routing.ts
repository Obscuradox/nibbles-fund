import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "pt-BR", "zh-CN", "ja", "ko", "fr", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const LOCALE_META: Record<string, { label: string; native: string }> = {
  en: { label: "English", native: "English" },
  es: { label: "Spanish", native: "Español" },
  "pt-BR": { label: "Portuguese (Brazil)", native: "Português" },
  "zh-CN": { label: "Chinese (Simplified)", native: "中文" },
  ja: { label: "Japanese", native: "日本語" },
  ko: { label: "Korean", native: "한국어" },
  fr: { label: "French", native: "Français" },
  de: { label: "German", native: "Deutsch" },
};
