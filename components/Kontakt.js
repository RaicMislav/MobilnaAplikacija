import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../SettingsContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function KontaktScreen() {
  const navigation = useNavigation();
  const { translate, theme, getBackgroundImage } = useContext(SettingsContext);

  const contactItems = [
    { id: '1', label: 'Adresa', value: 'Matice hrvatske b.b., 88000 Mostar, Bosna i Hercegovina' },
    { id: '2', label: 'Telefon', value: '+387 (36) 337-002', action: 'phone' },
    { id: '3', label: 'Email', value: 'office@fsre.sum.ba', action: 'email' },
    { id: '4', label: 'Posjetite nas', value: 'Pogledaj na mapi', action: 'map' },
  ];

  const handleAction = (action, value) => {
    if (action === 'phone') {
      Linking.openURL(`tel:${value}`);
    } else if (action === 'email') {
      Linking.openURL(`mailto:${value}`);
    } else if (action === 'map') {
      navigation.navigate('Karta');
    }
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
      <TouchableOpacity onPress={() => handleAction(item.action, item.value)}>
        <Text style={styles.value}>{item.value}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Scrollable Section */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.title, { color: theme.text }]}>Kontaktirajte nas</Text>

          <FlatList
            data={contactItems}
            keyExtractor={(item) => item.id}
            renderItem={renderContactItem}
            contentContainerStyle={styles.contactList}
          />
        </ScrollView>

        {/* Fixed Social Media Section */}
        <View style={styles.socialMediaContainer}>
          <Text style={styles.socialMediaText}>Zapratite nas na:</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/fsre.mostar')}>
              <Icon name="facebook-square" size={40} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://fsre.sum.ba')}>
              <Icon name="globe" size={40} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/fsre.sum/?hl=en')}>
              <Icon name="instagram" size={40} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/@fsre-sum')}>
              <Icon name="youtube-play" size={40} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://ba.linkedin.com/school/fsre-sum/')}>
              <Icon name="linkedin-square" size={40} color="#0077b5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 2,
    paddingBottom: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  contactList: {
    flexGrow: 1,
  },
  socialMediaContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  socialMediaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    flexWrap: 'wrap', // Allows icons to wrap if needed
  },
});
