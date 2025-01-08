import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

const StartScreen = ( ) => {
    const navigation = useNavigation();
    const handleGetStarted = () => {
        navigation.navigate('LoggedOutView');
    };

    return (
        <ImageBackground 
            source={require('../assets/background.jpg')} 
            style={styles.background} 
            resizeMode="cover"
        >
            <View style={styles.container}>
                
                
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../assets/logo.png')} 
                        style={styles.logo} 
                        resizeMode="contain" 
                    />
                </View>

                
                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    logoContainer: {
        flex: 2, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%', 
        height: '50%',
    },
    buttonWrapper: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'flex-start', 
        paddingLeft: 20, 
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 20, 
        paddingHorizontal: 120, 
        borderRadius: 12, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 20, 
        fontWeight: 'bold',
    },
});

export default StartScreen;
