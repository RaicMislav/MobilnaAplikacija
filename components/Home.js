import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import background from '../assets/background.jpg';
import { SettingsContext } from '../SettingsContext';

const Home = () => {
  const navigation = useNavigation();
    const { translate, theme } = useContext(SettingsContext)

  return (
    <ImageBackground source={background} style={styles.container} resizeMode="cover">
      <Text style={[styles.title, { color: theme.text }]}>{translate("Dobrodošli na našu FSRE Aplikaciju")}</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>{translate("Platforma za olakšanu navigaciju kroz studij.")}</Text>

      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        onPress={() => navigation.navigate('Novosti')} 
      >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>{translate("Početak")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.buttonOutline, { backgroundColor: theme.buttonBackground }]}
          onPress={() => navigation.navigate('FAQ')}
        >
          <Text style={[styles.buttonOutlineText, { color: theme.buttonText }]}>{translate("Saznaj više")}</Text>
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
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
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