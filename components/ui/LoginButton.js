import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

export default function LoginButton ({title, onPress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: "navy",
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 5,
        width: width > 700 ? '25%' : width > 500 ? '35%' : '50%',    
        marginVertical: 5,
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 16,
        textAlign: "center"
    },
});