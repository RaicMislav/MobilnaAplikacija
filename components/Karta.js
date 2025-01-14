import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { SettingsContext } from '../SettingsContext';

const Karta = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { translate, theme, getBackgroundImage } = useContext(SettingsContext);

  const mapStyles = {
    width: '100%',
    height: '100%', 
  };

  // Lokacija Sveučilišta u Mostaru
  const initialCenter = {
    lat: 43.34592, // Latitude
    lng: 17.79660, // Longitude
  };

  useEffect(() => {
    setMapLoaded(true); 
  }, []);

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.text }]}></Text>
        <View style={styles.mapContainer}>
          {mapLoaded ? (
            <LoadScript googleMapsApiKey="AIzaSyBwsDiKGcVtGZJo11d5-eXwnr02q2UmtXo">
              <GoogleMap
                mapContainerStyle={mapStyles}
                center={initialCenter}
                zoom={15}
                onLoad={() => console.log("Mapa je učitana")}
                onError={(error) => console.error("Greška pri učitavanju mape:", error)}
              >
                <Marker position={initialCenter} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <Text>Učitavanje mape...</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Karta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1, 
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});