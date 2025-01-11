import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, TouchableOpacity } from 'react-native';
import CountryFlag from "react-native-country-flag"; // Import the flag component
import { SettingsContext } from '../SettingsContext';

const Postavke = () => {
  const { isDarkMode, language, toggleDarkMode, changeLanguage } = useContext(SettingsContext);
  const { theme } = useContext(SettingsContext);

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={[styles.container, isDarkMode && styles.darkBackground]}>
      <Text style={[styles.title, { color: theme.text }]}>Postavke</Text>
      <View style={styles.setting}>
        <Text style={[styles.settingText, { color: theme.text }]}>Tamni način rada</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <View style={styles.setting}>
        {language === 'hr' ?<Text style={[styles.settingText, { color: theme.text }]}>Jezik</Text>:<Text style={[styles.settingText, { color: theme.text }]}>Language</Text>}
        <TouchableOpacity onPress={() => changeLanguage(language === 'en' ? 'hr' : 'en')} style={[styles.languageButton, { backgroundColor: theme.buttonBackground }]}>
          <View style={styles.flagContainer}>
            {/* Show the flag based on the language */}
            <CountryFlag isoCode={language === 'en' ? "gb" : "hr"} size={18} style={styles.flag} />
            <Text style={[styles.languageText, { color: theme.buttonText }]}>{language === 'en' ? 'EN' : 'HR'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  darkBackground: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  settingText: {
    fontSize: 18,
    color: "#fff",
  },
  languageButton: {
    backgroundColor: 'navy',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    marginRight: 10, // Add space between the flag and text
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Postavke;
