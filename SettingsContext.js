import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { translations } from "./translations";

export const SettingsContext = createContext();

import backgroundDark from "./assets/background.jpg";
import backgroundLight from "./assets/backgroundlight.jpg";

import logoDark from "./assets/logo.png";
import logoLight from "./assets/logoblack.png";

export const SettingsProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [language, setLanguage] = useState("en");

    const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);
    const changeLanguage = (lang) => setLanguage(lang);

    const theme = isDarkMode ? darkTheme : lightTheme;

    const translate = (key) => {
        return translations[language]?.[key] || key;
    };

    const getBackgroundImage = () => {
        return isDarkMode ? backgroundDark : backgroundLight;
    };

    const getLogo = () => {
        return isDarkMode ? logoDark : logoLight;
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
                getBackgroundImage,
                getLogo
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
