import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: typeof translations.it;
  otherLangs: Array<{ code: Language; label: string; path: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // Determine language from URL path
  let lang: Language = "it"; // Default to Italian for Ticino
  if (location.pathname.startsWith("/de")) lang = "de";
  else if (location.pathname.startsWith("/fr")) lang = "fr";
  else if (location.pathname.startsWith("/en")) lang = "en";

  const t = translations[lang];

  const otherLangs: Array<{ code: Language; label: string; path: string }> = [
    { code: "it", label: "Italiano", path: "/" },
    { code: "de", label: "Deutsch", path: "/de" },
    { code: "fr", label: "Français", path: "/fr" },
    { code: "en", label: "English", path: "/en" },
  ].filter(l => l.code !== lang);

  return (
    <LanguageContext.Provider value={{ lang, t, otherLangs }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
