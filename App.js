import React from "react";
import { AuthProvider } from "./AuthContext";
import Navigation from "./Navigation";
import { SettingsProvider } from "./SettingsContext";

export default App = () => {
    return (
        <SettingsProvider>
            <AuthProvider>
                <Navigation /> 
            </AuthProvider>
        </SettingsProvider>
    );
};
