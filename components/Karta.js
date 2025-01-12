import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Karta = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapStyles = {
    width: '100%',
    height: '80%', // Povećana visina mape
  };

  // Lokacija Sveučilišta u Mostaru
  const initialCenter = {
    lat: 43.3445, // Latitude
    lng: 17.7980, // Longitude
  };

  useEffect(() => {
    setMapLoaded(true); // Kada se komponenta učita, postaviti mapu kao učitanu
  }, []);

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Zamijenite vašom pozadinskom slikom
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Dobrodošli u Google Karte</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Podesi poravnanje sadržaja prema vrhu
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50, // Povećaj razmak između naslova i mape
  },
  mapContainer: {
    width: '100%',
    height: '100%', // Povećana visina mape
    borderRadius: 10,
    overflow: 'hidden',
  },
});
