/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  // load from storage
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode") === "true";
    const savedFont = localStorage.getItem("fontSize");

    setDark(savedDark);
    if (savedFont) setFontSize(savedFont);
  }, []);

  // apply globally
  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.fontSize =
      fontSize === "small"
        ? "14px"
        : fontSize === "large"
        ? "18px"
        : "16px";
  }, [fontSize]);

  return (
    <ThemeContext.Provider
      value={{ dark, setDark, fontSize, setFontSize }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);