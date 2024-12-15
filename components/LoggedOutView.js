import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Image, ImageBackground } from "react-native";
import LoginInput from "./ui/LoginInput";
import LoginButton from "./ui/LoginButton";
import ErrorMessage from "./ui/ErrorMessage";
import { AuthContext } from "../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import logo from '../assets/logo.png';

export default function LoggedOutView() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    signInWithEmailAndPassword(auth, email, passw)
      .then(() => {
        login();
      })
      .catch((error) => {
        let errorMessage = "Something went wrong. Please try again.";

        if (error.code === "auth/invalid-email") {
          errorMessage = "Please enter a valid email address.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        } else if (error.code === "auth/invalid-credential") {
          errorMessage = "Invalid credentials. Please check your information.";
        }

        setErrorMsg(errorMessage);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")} 
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        {/* Add your logo here */}
        <Image source={logo} style={styles.logo} />

        <Text style={styles.welcomeText}>Prijava na Aplikaciju</Text>

        <LoginInput
          placeholder="Unesite vašu email adresu"
          value={email}
          secureTextEntry={false}
          onChangeText={setEmail}
          onSubmitEditing={() => passw !== "" && handleLogin()}
        />

        <LoginInput
          placeholder="Unesite vašu lozinku"
          secureTextEntry={true}
          value={passw}
          onChangeText={setPassw}
          onSubmitEditing={handleLogin}
        />

        <ErrorMessage error={errorMsg} />
        <LoginButton title="Prijava" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20, 
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
});