import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

// Ensure the path is correct to the background image
import background from '../assets/background.jpg';

const Home = () => {
  return (
    <ImageBackground source={background} style={styles.container} resizeMode="cover">
      <Text style={styles.title}>Dobrodošli na našu FSRE Aplikaciju</Text>
      <Text style={styles.subtitle}>Platforma za olakšanu navigaciju kroz studij.</Text>

      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Početak</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Saznaj više</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',  // Ensure title is white for visibility
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',  // Make subtitle white as well for contrast
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  logo: {
    width: 150, // Adjust to match your logo size
    height: 150, // Adjust to match your logo size
    marginBottom: 30,
    resizeMode: 'contain', // Keeps the aspect ratio of your logo
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'navy',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderColor: 'navy',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
  },
  buttonOutlineText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;