import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Profile = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([
    { label: 'Croatia', value: 'Croatia' },
    { label: 'Canada', value: 'Canada' },
    { label: 'China', value: 'China' },
    { label: 'Colombia', value: 'Colombia' },
    { label: 'Czech Republic', value: 'Czech Republic' },
    { label: 'United States', value: 'United States' },
    { label: 'Germany', value: 'Germany' },
    { label: 'France', value: 'France' },
    { label: 'Italy', value: 'Italy' },
    { label: 'India', value: 'India' },
  ]);

  const handleSave = () => {
    Alert.alert(
      'Podaci spremljeni',
      `Ime: ${name}\nPrezime: ${surname}\nEmail: ${email}\nDržava: ${country}\nMobitel: ${mobile}\nAdresa: ${address}\nGrad: ${city}`
    );
  };

  // Custom Search Function for DropDownPicker
  const customSearchFunction = (text) => {
    const searchText = text.toLowerCase();
    return countries.filter((item) =>
      item.label.toLowerCase().startsWith(searchText) // Only matches the first letter
    );
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Unesite svoje podatke</Text>

            {/* Name and Surname Row */}
            <View style={styles.rowContainer}>
              <View style={styles.inputContainerSmall}>
                <Text style={styles.label}>Ime:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Unesite ime"
                  placeholderTextColor="#EAEAEA" // Light gray placeholder text
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainerSmall}>
                <Text style={styles.label}>Prezime:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Unesite prezime"
                  placeholderTextColor="#EAEAEA" // Light gray placeholder text
                  value={surname}
                  onChangeText={setSurname}
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite email"
                placeholderTextColor="#EAEAEA" // Light gray placeholder text
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Country Dropdown */}
            <View style={[styles.inputContainer, open && { zIndex: 999 }]}>
              <Text style={styles.label}>Država:</Text>
              <DropDownPicker
                open={open}
                value={country}
                items={countries}
                setOpen={setOpen}
                setValue={setCountry}
                setItems={setCountries}
                placeholder="Unesite ili odaberite državu"
                searchable={true}
                searchPlaceholder="Pretraži državu..."
                searchTextInputProps={{
                  autoCorrect: false,
                  spellCheck: false,
                  autoCapitalize: 'none',
                  placeholderTextColor: '#EAEAEA', // Light gray placeholder in the search bar
                }}
                searchFunction={customSearchFunction} // Custom search function
                style={[styles.dropdown, country && styles.dropdownSelected]} // Change style if a country is selected
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText} // Light gray dropdown text
                placeholderStyle={styles.dropdownPlaceholder} // Style for placeholder
              />
            </View>

            {/* Mobile Field */}
            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={styles.label}>Mobitel:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite broj mobitela"
                placeholderTextColor="#EAEAEA" // Light gray placeholder text
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            {/* Address Field */}
            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={styles.label}>Adresa:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite adresu"
                placeholderTextColor="#EAEAEA" // Light gray placeholder text
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* City Field */}
            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={styles.label}>Grad:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite grad"
                placeholderTextColor="#EAEAEA" // Light gray placeholder text
                value={city}
                onChangeText={setCity}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.customButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 30,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EAEAEA', // Light gray title text
    textAlign: 'center',
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  inputContainerSmall: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EAEAEA', // Light gray label text
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#EAEAEA', // Light gray border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle white background
    color: '#EAEAEA', // Light gray text
    fontSize: 14,
  },
  dropdown: {
    borderColor: '#EAEAEA', // Light gray dropdown border
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownPlaceholder: {
    color: '#EAEAEA', // Light gray placeholder for the dropdown
  },
  dropdownText: {
    color: '#EAEAEA', // Light gray text in dropdown
  },
  dropdownContainer: {
    borderColor: '#EAEAEA',
    backgroundColor: '#1A1A1A', // Darker background for dropdown container
  },
  customButton: {
    backgroundColor: '#4CAF50', // Light gray button
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#1A1A1A', // Dark gray text for contrast on button
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Profile;
