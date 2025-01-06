import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';

const NovostiScreen = () => {
  const [language, setLanguage] = useState('en'); 

  const newsData = {
    en: [
      { id: '1', title: 'New Feature: Dark Mode Added!', description: 'We’ve added dark mode to improve your app experience.', date: '2025-01-01' },
      { id: '2', title: 'Upcoming Maintenance', description: 'The app will undergo maintenance on 5th January from 1AM to 3AM.', date: '2025-01-03' },
      { id: '3', title: 'Important Update on Courses', description: 'New courses have been added to the platform. Check them out now!', date: '2025-01-04' },
      { id: '4', title: 'App Now Available in Multiple Languages', description: 'You can now switch between English and Croatian in the app.', date: '2025-01-05' },
    ],
    hr: [
      { id: '1', title: 'Nova funkcija: Dodan tamni način!', description: 'Dodali smo tamni način za poboljšanje vašeg iskustva s aplikacijom.', date: '2025-01-01' },
      { id: '2', title: 'Nadogradnja koja dolazi', description: 'Aplikacija će biti u održavanju 5. siječnja od 1 ujutro do 3 ujutro.', date: '2025-01-03' },
      { id: '3', title: 'Važna nadogradnja na tečajevima', description: 'Novi tečajevi su dodani na platformu. Pogledajte ih sada!', date: '2025-01-04' },
      { id: '4', title: 'Aplikacija sada dostupna na više jezika', description: 'Sada možete prebaciti između engleskog i hrvatskog jezika u aplikaciji.', date: '2025-01-05' },
    ]
  };

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hr' : 'en');
  };

  // Render news items
  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDate}>{item.date}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} 
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Novosti i Ažuriranja</Text>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
          <Text style={styles.languageText}>{language === 'en' ? 'EN' : 'HR'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={newsData[language]} 
        keyExtractor={(item) => item.id}
        renderItem={renderNewsItem}
        contentContainerStyle={styles.newsList}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
  newsList: {
    flexGrow: 1,
  },
  newsItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  newsDescription: {
    fontSize: 16,
    color: '#555',
  },
});

export default NovostiScreen;