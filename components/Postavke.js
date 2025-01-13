import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, TouchableOpacity } from 'react-native';
import CountryFlag from "react-native-country-flag"; // Import the flag component
import { SettingsContext } from '../SettingsContext';

const Postavke = () => {
  const { isDarkMode, language, toggleDarkMode, changeLanguage, getBackgroundImage, translate, theme } = useContext(SettingsContext);

  return (
    <ImageBackground source={getBackgroundImage()} style={[styles.container, isDarkMode && styles.darkBackground]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{translate("Postavke")}</Text>

        <View style={styles.setting}>
          <Text style={[styles.settingText, { color: theme.text }]}>{translate("Tamni način rada")}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>

        <View style={styles.setting}>
          <Text style={[styles.settingText, { color: theme.text }]}>{translate("Jezik")}</Text>
          <TouchableOpacity onPress={() => changeLanguage(language === 'en' ? 'hr' : 'en')} style={styles.languageButton}>
            <View style={styles.flagContainer}>
              <CountryFlag isoCode={language === 'en' ? "gb" : "hr"} size={18} style={styles.flag} />
              <Text style={styles.languageText}>{language === 'en' ? 'EN' : 'HR'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  darkBackground: {
    backgroundColor: "#333",
  },
  content: {
    flex: 0, // This prevents the content from taking up unnecessary space
    marginTop: 30, // Moves the content up
    paddingHorizontal: 20, // Keeps space on the sides
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30, // Space between title and settings
    textAlign: "center",
    color: "#fff",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10, // Horizontal padding for settings items
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
    marginRight: 10, // Adds space between flag and text
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Postavke;