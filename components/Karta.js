import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import { SettingsContext } from '../SettingsContext';

const Karta = () => {

  const apiKey = 'fnAD8b722Z4MY5G3ttHBm_lRoIAWNfFwPQlCVR9QXdc';
  const mapUrl = `https://wego.here.com/?map=43.3436,17.8103,15&apikey=${apiKey}`;

  const { translate, theme, getBackgroundImage } = useContext(SettingsContext)

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Dobrodošli u Karte</Text>
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
    width: '100%',
    height: '100%',
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
    color: 'white',  
  },
  map: {
    width: '100%',
    height: '60%', 
    marginTop: 20,
  },
});

export default Karta;