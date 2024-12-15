// Karta.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Karta = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dobrodosli u Karta</Text>
      {/* You can add more content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Karta;