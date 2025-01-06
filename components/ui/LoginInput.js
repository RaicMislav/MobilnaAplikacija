import React from "react"
import { TextInput, StyleSheet, Dimensions } from "react-native";

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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    input: {
      backgroundColor: 'white',   
      borderRadius: 8,            
      padding: 12,               
      width: width > 700 ? '50%' : width > 500 ? '65%' : '80%',        
      marginBottom: 10,         
      fontSize: 16,          
    },
  });