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
<<<<<<< HEAD
      backgroundColor: 'white',   
      borderRadius: 8,            
      padding: 12,               
      width: '50%',              
      marginBottom: 10,         
      fontSize: 16,          
=======
      backgroundColor: 'white',  
      borderRadius: 8,            
      padding: 12,                
      width: '25%',              
      marginVertical: 5,           
      fontSize: 16,             
>>>>>>> 660316272626aea7897697a252c5ea0af2afb714
    },
  });