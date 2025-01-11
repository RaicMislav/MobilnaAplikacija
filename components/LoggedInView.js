import React, { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { AuthContext } from "../AuthContext";
import LoginButton from "./ui/LoginButton";

export default function LoggedInView() {
  const { logout, getBackgroundImage } = useContext(AuthContext);

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={[styles.text, { color: theme.text }]}>Dobrodošli na sustav</Text>

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
    padding: 20,  
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white', 
  },
});