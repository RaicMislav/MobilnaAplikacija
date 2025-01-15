import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LoggedInTabs from "./components/LoggedInTabs";
import LoggedOutView from "./components/LoggedOutView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./components/StartScreen";
import ChatbotScreen from "./components/ChatbotScreen";  // Importuj ChatbotScreen

const Stack = createStackNavigator();

export default Navigation = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? "LoggedIn" : "Start"}>
                {/* Logged-in flow */}
                {isLoggedIn ? (
                    <>
                        <Stack.Screen 
                            name="LoggedIn" 
                            component={LoggedInTabs} 
                            options={{ headerShown: false }} 
                        />
                        {/* Dodaj ChatbotScreen za prijavljene korisnike */}
                        <Stack.Screen 
                            name="Chatbot" 
                            component={ChatbotScreen} 
                            options={{ headerShown: false }} 
                        />
                    </>
                ) : (
                    <>
                        {/* Start Screen */}
                        <Stack.Screen 
                            name="Start" 
                            component={StartScreen} 
                            options={{ headerShown: false }} 
                        />
                        {/* Logged Out Screen */}
                        <Stack.Screen 
                            name="LoggedOutView" 
                            component={LoggedOutView} 
                            options={{ headerShown: false }} 
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
