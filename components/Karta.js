import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, PermissionsAndroid, Platform } from 'react-native';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geolocation from 'react-native-geolocation-service';
import { SettingsContext } from '../SettingsContext';

const Karta = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [location, setLocation] = useState(null);
  const { translate, theme, getBackgroundImage } = useContext(SettingsContext);

  const mapStyles = {
    width: '100%',
    height: '100%', 
  };

  const initialCenter = {
    lat: 43.34592, 
    lng: 17.79660, 
  };

  useEffect(() => {
    setMapLoaded(true);
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location."
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  }

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("Current Position:", position);
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Error getting location:", error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Mapa</Text>
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
                {location && <Marker position={location} />}
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