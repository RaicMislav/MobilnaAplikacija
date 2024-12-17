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
      backgroundColor: 'white',  
      borderRadius: 8,            
      padding: 12,                
      width: '25%',              
      marginVertical: 5,           
      fontSize: 16,             
    },
  });