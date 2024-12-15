import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

// Import background image
import backgroundImage from '../assets/background.jpg';  // Update the path as needed

const Karta = () => {
  // Replace with your HERE API key
  const apiKey = 'fnAD8b722Z4MY5G3ttHBm_lRoIAWNfFwPQlCVR9QXdc';
  
  // URL for the map with the API key
  const mapUrl = `https://wego.here.com/?map=43.3436,17.8103,15&apikey=${apiKey}`;

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Dobrodošli u Karte</Text>
        <WebView
          originWhitelist={['*']}
          source={{ uri: mapUrl }}
          style={styles.map}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',  // Make the text color stand out against the background
  },
  map: {
    width: '100%',
    height: '60%',  // Adjust the size of the map
    marginTop: 20,
  },
});

export default Karta;