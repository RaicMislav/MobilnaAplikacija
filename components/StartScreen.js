import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, ActivityIndicator, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); 

const StartScreen = () => {
    const navigation = useNavigation();
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        
        if (isImageLoaded) {
            const timer = setTimeout(() => {
                navigation.navigate('LoggedOutView'); 
            }, 3000);

            return () => clearTimeout(timer); 
        }
    }, [isImageLoaded, navigation]);

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.background}
            resizeMode="cover"
            onLoadEnd={() => setIsImageLoaded(true)} 
        >
            {isImageLoaded && (
                <View style={styles.container}>
                    
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    
                    <ActivityIndicator
                        size="large"
                        color="#ffffff" 
                        style={styles.spinner}
                    />
                    
                    <View style={styles.textContainer}>
                        <Text style={styles.poweredText}>Powered by</Text>
                        <Text style={styles.zbunjeniText}>zBunjeni</Text>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.8, 
        height: height * 0.25, 
        marginBottom: 20, 
    },
    spinner: {
        marginTop: 10, 
    },
    textContainer: {
        position: 'absolute',
        bottom: height * 0.05, 
        alignItems: 'center',
    },
    poweredText: {
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        textAlign: 'center',
        opacity: 0.8, 
    },
    zbunjeniText: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        textAlign: 'center',
    },
});

export default StartScreen;
