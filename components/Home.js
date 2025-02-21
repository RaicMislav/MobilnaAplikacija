import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../SettingsContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const navigation = useNavigation();
  const { translate, theme, getBackgroundImage, getLogo } = useContext(SettingsContext);

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.container} resizeMode="cover">
      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>
          {translate("Dobrodošli na našu FSRE Aplikaciju")}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {translate("Platforma za olakšanu navigaciju kroz studij.")}
        </Text>
      </View>

      {/* Logo */}
      <Image source={getLogo()} style={styles.logo} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Novosti')}
        >
          <Text style={styles.buttonText}>{translate("Početak")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate('FAQ')}
        >
          <Text style={[styles.buttonOutlineText, { color: theme.buttonText }]}>
            {translate("Saznaj više")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatbotButton}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Icon name="comments" size={30} color="navy" />
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
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
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
  chatbotButton: {
    position: 'absolute',
    bottom: 130,  
    right: 10,
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 10,
    elevation: 2,
    radius: 10,
  },
});

export default Home;