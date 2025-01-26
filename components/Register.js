import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker"; // Import DropDownPicker
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
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState(null); // Country value state
  const [city, setCity] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false); // Dropdown open state
  const [countries, setCountries] = useState([
    { label: "Croatia", value: "Croatia" },
    { label: "Canada", value: "Canada" },
    { label: "China", value: "China" },
    { label: "Colombia", value: "Colombia" },
    { label: "Czech Republic", value: "Czech Republic" },
    { label: "United States", value: "United States" },
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
    { label: "Italy", value: "Italy" },
    { label: "India", value: "India" },
  ]);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setErrorMsg(translate("Molimo vas da unesete ispravnu email adresu."));
      return;
    }

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

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            email,
            name,
            surname,
            country,
            city,
          },
        ]);

      if (profileError) {
        throw profileError;
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
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <TextInput
              placeholder={translate("Ime")}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <TextInput
              placeholder={translate("Prezime")}
              value={surname}
              onChangeText={setSurname}
              style={styles.input}
            />
          </View>
        </View>

            <View style={[styles.rowContainer, { zIndex: open ? 1000 : 1 }]}>
            <View style={[styles.halfWidth, { zIndex: open ? 1000 : 1 }]}>
              <DropDownPicker
                open={open}
                value={country}
                items={countries}
                setOpen={setOpen}
                setValue={setCountry}
                setItems={setCountries}
                placeholder={translate("Unesite ili odaberite državu")}
                searchable={true}
                searchPlaceholder={translate("Pretraži državu...")}
                searchTextInputProps={{
                  autoCorrect: false,
                  spellCheck: false,
                  autoCapitalize: "none",
                  placeholderTextColor: "#A0A0A0",
                }}
                style={[styles.input, styles.dropdown]}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                placeholder={translate("Grad")}
                value={city}
                onChangeText={setCity}
                style={styles.input}
              />
            </View>
    </View>


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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
    alignItems: "center",
  },
  halfWidth: {
    width: "49%",
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
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 5,
    height: 50,
    justifyContent: "center", // Center content vertically
  },
  dropdownContainer: {
    borderColor: "gray",
    backgroundColor: "white",
    zIndex: 1000, // Ensure dropdown items are above other inputs
  },
  dropdownText: {
    fontSize: 16,
    color: "black",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "gray",
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
