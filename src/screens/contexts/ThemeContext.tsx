import React, { createContext, useContext, useState, ReactNode } from "react";

type ThemeType = {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeType>({} as ThemeType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeApp = () => useContext(ThemeContext);
