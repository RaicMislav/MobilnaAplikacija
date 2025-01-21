import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { SettingsContext } from '../SettingsContext';

const Karta = () => {
  const [location, setLocation] = useState(null);
  const { translate, theme, getBackgroundImage } = useContext(SettingsContext);

  const initialRegion = {
    latitude: 43.34592,
    longitude: 17.79660,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Location Permission Denied',
            'You need to enable location permissions in settings to use this feature.'
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  }

  function handleLocationError(error) {
    if (error.code === 1) {
      Alert.alert(
        'Location Access Denied',
        'Please enable location access in your device settings to use this feature.',
        [{ text: 'OK' }]
      );
    } else {
      console.log('Error getting location:', error.message);
    }
  }

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Current Position:', position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      handleLocationError,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Mapa</Text>
        <View style={styles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={initialRegion}
            showsUserLocation={true}
            onMapReady={() => console.log('Map is ready')}
            onError={(error) => console.error('Error loading map:', error)}
          >
            <Marker coordinate={initialRegion} />
            {location && <Marker coordinate={location} />}
          </MapView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
