import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "../supabaseConfig";
import { SettingsContext } from "../SettingsContext";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const { login } = useContext(AuthContext);
  const { getBackgroundImage, theme, translate } = useContext(SettingsContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setErrorMsg(translate("Molimo vas da unesete ispravnu email adresu."));
      return;
    }

    // validacija se moze implementirati u supabase configu
    if (password.length < 6) {
      setErrorMsg(translate("Lozinka mora imati najmanje 6 znakova."));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(translate("Lozinke se ne podudaraju."));
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setErrorMsg(translate("Registracija uspješna, molimo vas da potvrdite email adresu."));
    } catch (error) {
      setErrorMsg(error.message || "Nešto je pošlo po krivu. Molimo vas da pokušate ponovo.");
    }
  };

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Text style={[styles.headerText, { color: theme.text }]}>{translate("Registracija")}</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder={translate("Email adresa")}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="key" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder={translate("Lozinka")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="key" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder={translate("Potvrda lozinke")}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>

        {errorMsg ? <Text style={[styles.errorMsg, { color: theme.text }]}>{errorMsg}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={[styles.buttonText, { color: theme.text }]}>{translate("Registracija")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoggedOutView")}>
          <Text style={[styles.linkText, { color: theme.text }]}>{translate("Već imate račun? Prijavite se.")}</Text>
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
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  },
  errorMsg: {
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
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
