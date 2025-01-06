import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Profile = () => {

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.text}>Ovo je stranica profila</Text>
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Profile;
