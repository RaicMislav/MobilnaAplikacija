import React, { createContext, useState } from "react";
import { supabase } from "./supabaseConfig";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
   
    const login = async (email) => {
        try {
            setIsLoggedIn(true);
            const { data: profileData, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("email", email)
                .single();
    
            if (profileError) throw profileError;
    
            // Store the fetched user profile
            setUser(profileData);
        } catch (error) {
            console.error("Error fetching user profile:", error.message);
            throw error;
        }
    };
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{login, logout, isLoggedIn, user}}>
            {children}
        </AuthContext.Provider>
    )
};