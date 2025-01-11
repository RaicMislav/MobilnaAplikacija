import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SettingsContext } from '../SettingsContext';

const Profile = () => {
  const { theme, translate } = useContext(SettingsContext)
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

  
  const customSearchFunction = (text) => {
    const searchText = text.toLowerCase();
    return countries.filter((item) =>
      item.label.toLowerCase().startsWith(searchText) 
    );
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{translate("Unesite svoje podatke")}</Text>

            
            <View style={styles.rowContainer}>
              <View style={styles.inputContainerSmall}>
                <Text style={styles.label}>Ime:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Unesite ime"
                  placeholderTextColor="#EAEAEA" 
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainerSmall}>
                <Text style={styles.label}>Prezime:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Unesite prezime"
                  placeholderTextColor="#EAEAEA"
                  value={surname}
                  onChangeText={setSurname}
                />
              </View>
            </View>

            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite email"
                placeholderTextColor="#EAEAEA" 
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            
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
                  placeholderTextColor: '#EAEAEA', 
                }}
                searchFunction={customSearchFunction} 
                style={[styles.dropdown, country && styles.dropdownSelected]} 
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText} 
                placeholderStyle={styles.dropdownPlaceholder} 
              />
            </View>

            
            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={styles.label}>Mobitel:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite broj mobitela"
                placeholderTextColor="#EAEAEA" 
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            
            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={styles.label}>Adresa:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite adresu"
                placeholderTextColor="#EAEAEA" 
                value={address}
                onChangeText={setAddress}
              />
            </View>

            
            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={styles.label}>Grad:</Text>
              <TextInput
                style={styles.input}
                placeholder="Unesite grad"
                placeholderTextColor="#EAEAEA" 
                value={city}
                onChangeText={setCity}
              />
            </View>

            
            <TouchableOpacity  style={[styles.customButton, { backgroundColor: theme.buttonBackground }]} onPress={handleSave}>
              <Text  style={[styles.buttonText, { color: theme.buttonText }]}>Save Changes</Text>
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
    width: "100%",
    height: "100%",
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
    color: '#EAEAEA', 
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
    color: '#EAEAEA', 
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#EAEAEA', 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    color: '#EAEAEA', 
    fontSize: 14,
  },
  dropdown: {
    borderColor: '#EAEAEA', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownPlaceholder: {
    color: '#EAEAEA', 
  },
  dropdownText: {
    color: '#EAEAEA', 
  },
  dropdownContainer: {
    borderColor: '#EAEAEA',
    backgroundColor: '#1A1A1A', 
  },
  customButton: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#1A1A1A', 
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Profile;
