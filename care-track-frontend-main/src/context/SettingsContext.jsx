import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { translations } from "./translations";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {

  const [settings, setSettings] = useState(() => {

    const saved = localStorage.getItem("adminSettings");

    return saved
      ? JSON.parse(saved)
      : {
          theme: "light",
          language: "en",
          fontSize: "medium",
          notifications: true,
          autoRefresh: false,
        };
  });

  /* TRANSLATIONS */

  const t = translations[settings.language];

  /* APPLY SETTINGS */

  useEffect(() => {

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(settings.theme);

    root.dir =
      settings.language === "ar"
        ? "rtl"
        : "ltr";

    root.lang = settings.language;

    root.style.fontSize =
      settings.fontSize === "small"
        ? "14px"
        : settings.fontSize === "medium"
        ? "16px"
        : "18px";

    document.body.style.background =
      settings.theme === "dark"
        ? "#020617"
        : "#f8fafc";

    document.body.style.color =
      settings.theme === "dark"
        ? "#ffffff"
        : "#0f172a";

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        t,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}