import React, { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      localStorage.removeItem("darkMode");
      document.documentElement.classList.remove("ion-palette-dark");
      return false;
    }
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const applyTheme = () => {
      if (darkMode) {
        document.documentElement.classList.add("ion-palette-dark");
        const style = document.createElement('style');
        style.id = 'dark-mode-fix';
        style.textContent = `
          .ion-palette-dark ion-header,
          .ion-palette-dark ion-toolbar {
            --background: #121212 !important;
            background: #121212 !important;
            border: none !important;
            border-bottom: none !important;
            box-shadow: none !important;
          }
          .ion-palette-dark ion-header::before,
          .ion-palette-dark ion-header::after,
          .ion-palette-dark ion-toolbar::before,
          .ion-palette-dark ion-toolbar::after {
            display: none !important;
            visibility: hidden !important;
            background: transparent !important;
            border: none !important;
          }
        `;
        const existingStyle = document.getElementById('dark-mode-fix');
        if (existingStyle) {
          existingStyle.remove();
        }
        document.head.appendChild(style);
      } else {
        document.documentElement.classList.remove("ion-palette-dark");
        const existingStyle = document.getElementById('dark-mode-fix');
        if (existingStyle) {
          existingStyle.remove();
        }
      }
      localStorage.setItem("darkMode", darkMode.toString());
    };
    
    applyTheme();
    setTimeout(applyTheme, 0);
    setTimeout(applyTheme, 10);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};