import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Image, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { SettingsContext } from "../SettingsContext";
import { supabase } from "../supabaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function LoggedOutView() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { theme, translate, getBackgroundImage, getLogo } = useContext(SettingsContext);
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: passw,
      });

      if (error) {
        throw error;
      }

      // On successful login, call the login function from AuthContext
      login(email);
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.message.includes("invalid_email")) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message.includes("incorrect_password")) {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.message.includes("user_not_found")) {
        errorMessage = "No account found with this email.";
      }

      setErrorMsg(errorMessage);
    }
  };

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Image source={getLogo()} style={styles.logo} />

        <Text style={[styles.welcomeText, { color: theme.text }]}>Prijava na Aplikaciju</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Unesite vašu email adresu"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardAppearance="light"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwRef.focus();
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="key" size={20} color="gray" style={styles.icon} />
          <TextInput
            ref={(input) => (passwRef = input)}
            placeholder="Unesite vašu lozinku"
            value={passw}
            onChangeText={setPassw}
            secureTextEntry={true}
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardAppearance="light"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
        </View>

        {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Prijava</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[styles.linkText, { color: theme.text }]}>Don't have an account? Sign up here</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    padding: 0,
    borderWidth: 0,
    outlineStyle: "none",
  },
  errorMsg: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    width: "90%",
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
