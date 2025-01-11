import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { translations } from "./translations";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [language, setLanguage] = useState("en");

    const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);
    const changeLanguage = (lang) => setLanguage(lang);

    const theme = isDarkMode ? darkTheme : lightTheme;

    const translate = (key) => {
        return translations[language]?.[key] || key;
    };

    return (
        <SettingsContext.Provider
            value={{
                isDarkMode,
                language,
                toggleDarkMode,
                changeLanguage,
                theme,
                translate,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
