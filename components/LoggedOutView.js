import React, {useState, useContext} from "react";
import { View, StyleSheet, Text } from "react-native";
import LoginInput from "./ui/LoginInput";
import LoginButton from "./ui/LoginButton";
import ErrorMessage from "./ui/ErrorMessage";
import { AuthContext } from "../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoggedOutView() {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //PROVJERA JE LI EMail VALID
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
        //ERROR MESSAGE TEXT
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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Dobrodošli!</Text>
      
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
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
});