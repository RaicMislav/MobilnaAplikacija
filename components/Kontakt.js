import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Linking } from 'react-native';

export default function KontaktScreen() {
  const contactItems = [
    { id: '1', label: 'Adresa', value: 'Matice hrvatske b.b., 88000 Mostar, Bosna i Hercegovina' },
    { id: '2', label: 'Telefon', value: '+387 (36) 337-001', action: 'phone' },
    { id: '3', label: 'Email', value: 'office@fsre.sum.ba', action: 'email' },
    { id: '4', label: 'Posjetite nas', value: 'Pogledaj na mapi', action: 'map' },
  ];

  const handleAction = (action, value) => {
    if (action === 'phone') {
      Linking.openURL(`tel:${value}`);
    } else if (action === 'email') {
      Linking.openURL(`mailto:${value}`);
    } else if (action === 'map') {
      Linking.openURL('https://goo.gl/maps/xyz'); // Replace with actual map link
    }
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.label}>{item.label}</Text>
      <TouchableOpacity onPress={() => handleAction(item.action, item.value)}>
        <Text style={styles.value}>{item.value}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Replace with your actual background image
      style={styles.container}
    >
      <Text style={styles.title}>Kontaktirajte nas</Text>

      <FlatList
        data={contactItems}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactList}
      />

      <View style={styles.socialMedia}>
        <Text style={styles.subtitle}>Pratite nas na društvenim mrežama</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/fsre.mostar')}>
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://fsre.sum.ba')}>
            <Text style={styles.socialText}>Službena Web Stranica</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/fsre.sum/?hl=en')}>
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  contactItem: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  contactList: {
    flexGrow: 1,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  socialMedia: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialText: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});