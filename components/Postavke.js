import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, TouchableOpacity } from 'react-native';
import { SettingsContext } from '../SettingsContext';

const Postavke = () => {
  const { isDarkMode, language, toggleDarkMode, changeLanguage } = useContext(SettingsContext);

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={[styles.container, isDarkMode && styles.darkBackground]}>
      <Text style={styles.title}>Postavke</Text>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Tamni način rada</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Jezik</Text>
        <TouchableOpacity onPress={() => changeLanguage(language === 'en' ? 'hr' : 'en')} style={styles.languageButton}>
          <Text style={styles.languageText}>{language === 'en' ? 'EN' : 'HR'}</Text>
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
  languageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Postavke;
