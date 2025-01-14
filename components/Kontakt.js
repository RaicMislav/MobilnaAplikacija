import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Linking, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../SettingsContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function KontaktScreen() {
  const navigation = useNavigation();
  const { translate, theme, getBackgroundImage } = useContext(SettingsContext);

  const { height, width } = Dimensions.get('window'); // Get screen dimensions

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
    <ImageBackground source={getBackgroundImage()} style={styles.container}>
      {/* Contact List */}
      <FlatList
        data={contactItems}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactList}
        showsVerticalScrollIndicator={false} // Remove scroll indicator
        scrollEnabled={false} // Disable scrolling
        ListHeaderComponent={() => (
          <Text style={[styles.title, { color: theme.text }]}>Kontaktirajte nas</Text>
        )}
      />

      {/* Fixed Social Media Box */}
      <View
        style={[
          styles.socialMediaContainer,
          { bottom: Platform.OS === 'ios' || width < 480 ? 40 : 20 }, // Adjust position for mobile
        ]}
      >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contactList: {
    paddingHorizontal: 20,
    paddingBottom: 160, // Ensures proper spacing above the social media box
  },
  contactItem: {
    padding: 15,
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  socialMediaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#2E2E2E',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 20, // Adds horizontal spacing
  },
  socialMediaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
