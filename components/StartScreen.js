import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, ActivityIndicator, Text, Dimensions } from 'react-native';
import { SettingsContext } from '../SettingsContext';

const { width, height } = Dimensions.get('window'); 

const StartScreen = () => {
    const navigation = useNavigation();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const { theme, getBackgroundImage, getLogo } = useContext(SettingsContext);

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
            source={getBackgroundImage()}
            style={styles.background}
            resizeMode="cover"
            onLoadEnd={() => setIsImageLoaded(true)} 
        >
            {isImageLoaded && (
                <View style={styles.container}>
                    
                    <Image
                        source={getLogo()}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    
                    <ActivityIndicator
                        size="large"
                        color="#ffffff" 
                        style={styles.spinner}
                    />
                    
                    <View style={styles.textContainer}>
                        <Text style={[styles.poweredText, { color: theme.text }]}>Powered by</Text>
                        <Text style={[styles.zbunjeniText, { color: theme.text }]}>zBunjeni</Text>
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
