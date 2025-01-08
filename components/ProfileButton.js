import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../AuthContext'; 
import { useNavigation } from '@react-navigation/native';

const ProfileButton = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [emoji, setEmoji] = useState('👋');
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const emojis = [''];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[randomIndex]);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const dropdownOptions = [
    { label: 'Profile', action: () => navigation.navigate('Profil') },
    { label: 'Settings', action: () => navigation.navigate('Postavke') },
    { label: 'Logout', action: logout }, //Poziv loggout funkcije
  ];

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.profilePicture} onPress={toggleDropdown}>
        <Text style={styles.profileText}>MR</Text>
      </TouchableOpacity>

      
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={dropdownOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  item.action(); 
                  setDropdownVisible(false); 
                }}
              >
                <Text style={styles.dropdownText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  container: {
    position: 'relative', 
  },
  profilePicture: {
    width: 50,
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
});
