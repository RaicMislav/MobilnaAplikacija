import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("en");

    const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);
    const changeLanguage = (lang) => setLanguage(lang);

    return (
        <SettingsContext.Provider
            value={{
                isDarkMode,
                language,
                toggleDarkMode,
                changeLanguage,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
