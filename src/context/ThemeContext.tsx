"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("theme-mode", "dark");
  }, []);

  const toggleDarkMode = () => {
    // Dark theme is enforced by design; no toggle action.
    setIsDark(true);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
