import React, { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { AuthContext } from "../AuthContext";
import LoginButton from "./ui/LoginButton";

// Import background image
import backgroundImage from '../assets/background.jpg';  // Adjust path if necessary

export default function LoggedInView() {
  const { logout } = useContext(AuthContext);

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Dobrodošli na sustav</Text>

        {/* Logout Button */}
        <LoginButton title="Odjavi se" onPress={logout} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,  // Prevent text from being too close to the edges
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white', // Text color to stand out on the background
  },
});