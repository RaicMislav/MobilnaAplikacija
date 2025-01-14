import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
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
            }, 2800);

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
                    {/* Main Logo */}
                    <Image
                        source={getLogo()}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    
                    {/* Loading Spinner */}
                    <ActivityIndicator
                        size="large"
                        color="#ffffff" 
                        style={styles.spinner}
                    />
                    
                    {/* Footer Logo */}
                    <View style={styles.footerLogoContainer}>
                        <Image
                            source={require('../assets/StartLogo.png')} 
                            style={styles.footerLogo}
                            resizeMode="contain"
                        />
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
        height: height * 0.28, 
        marginBottom: 20, 
    },
    spinner: {
        marginTop: 10, 
    },
    footerLogoContainer: {
        position: 'absolute',
        bottom: height * 0.02, 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    footerLogo: {
        width: width * 0.64,
        height: height * 0.14,
        
    },
});

export default StartScreen;
