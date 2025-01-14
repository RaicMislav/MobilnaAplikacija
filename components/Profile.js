import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SettingsContext } from '../SettingsContext';

const Profile = () => {
  const { theme, translate, getBackgroundImage, getLogo } = useContext(SettingsContext);
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
    <ImageBackground source={getBackgroundImage()} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
        <View style={styles.profileContainer}>
          <Image source={getLogo()} style={styles.logo} />
          <View style={styles.infoContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{translate("Unesite svoje podatke")}</Text>

            <View style={styles.rowContainer}>
              <View style={styles.inputContainerSmall}>
                <Text style={[styles.label, { color: theme.text }]}>
                  {translate("Ime:")}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={translate("Unesite ime")}
                  placeholderTextColor="#EAEAEA" 
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainerSmall}>
                <Text style={[styles.label, { color: theme.text }]}>
                  {translate("Prezime:")}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={translate("Unesite prezime")}
                  placeholderTextColor="#EAEAEA"
                  value={surname}
                  onChangeText={setSurname}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder={translate("Unesite email")}
                placeholderTextColor="#EAEAEA" 
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={[styles.inputContainer, open && { zIndex: 999 }]}>
              <Text style={[styles.label, { color: theme.text }]}>
                {translate("Država:")}
              </Text>
              <DropDownPicker
                open={open}
                value={country}
                items={countries}
                setOpen={setOpen}
                setValue={setCountry}
                setItems={setCountries}
                placeholder={translate("Unesite ili odaberite državu")}
                searchable={true}
                searchPlaceholder={translate("Pretraži državu...")}
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
              <Text style={[styles.label, { color: theme.text }]}>
                {translate("Mobitel:")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={translate("Unesite broj mobitela")}
                placeholderTextColor="#EAEAEA" 
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={[styles.label, { color: theme.text }]}>
                {translate("Adresa:")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={translate("Unesite adresu")}
                placeholderTextColor="#EAEAEA" 
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: open ? -1 : 1 }]}>
              <Text style={[styles.label, { color: theme.text }]}>
                {translate("Grad:")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={translate("Unesite grad")}
                placeholderTextColor="#EAEAEA" 
                value={city}
                onChangeText={setCity}
              />
            </View>

            <TouchableOpacity style={styles.customButton} onPress={handleSave}>
              <Text style={styles.buttonText}>{translate("Spasi izmjene")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Green plus button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => { /* Handle the action */ }}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: '5%',
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
    marginTop: 20,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: '5%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EAEAEA',
    textAlign: 'center',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 12,
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
    marginTop: 20,
  },
  buttonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  
  // New styles for the green button with plus sign
  addButtonContainer: {
    position: 'absolute',
    bottom: 30, 
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;