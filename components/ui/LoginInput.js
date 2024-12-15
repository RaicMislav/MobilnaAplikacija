import React from "react"
import { TextInput, StyleSheet } from "react-native";

export default function LoginInput ({placeholder, value, onChangeText, secureTextEntry, onSubmitEditing}) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText} 
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
        />
    );
}

const styles = StyleSheet.create({
    input: {
      backgroundColor: 'white',   // Set background to white
      borderRadius: 8,            // Optional: rounded corners
      padding: 12,                // Optional: padding for text inside
      width: '25%',              // Optional: full width of the container
      marginBottom: 10,           // Optional: space between inputs
      fontSize: 16,               // Optional: text size inside input
    },
  });