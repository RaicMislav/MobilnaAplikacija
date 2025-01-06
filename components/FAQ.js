import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';

export default function FAQScreen() {
  const [language, setLanguage] = useState('en'); 

  const translations = {
    en: {
      title: 'Frequently Asked Questions',
      faqs: [
        { id: '1', question: 'What is this app about?', answer: 'This app helps you manage tasks efficiently and stay organized.' },
        { id: '2', question: 'How can I reset my password?', answer: 'Go to the login page and click on "Forgot Password" to reset your password.' },
        { id: '3', question: 'Can I use this app offline?', answer: 'Some features are available offline, but full functionality requires an internet connection.' },
        { id: '4', question: 'How do I contact support?', answer: 'You can reach our support team via the "Contact Us" section in the app.' },
      ],
      switchTo: 'Switch to Croatian',
    },
    hrv: {
      title: 'Često postavljana pitanja',
      faqs: [
        { id: '1', question: 'Što je ova aplikacija?', answer: 'Ova aplikacija pomaže u efikasnom upravljanju zadacima i organizaciji.' },
        { id: '2', question: 'Kako mogu resetirati svoju lozinku?', answer: 'Idite na stranicu za prijavu i kliknite na "Zaboravljena lozinka" da biste resetirali svoju lozinku.' },
        { id: '3', question: 'Mogu li koristiti ovu aplikaciju offline?', answer: 'Neke funkcionalnosti su dostupne offline, ali za puni radnu verziju potrebna je internetska veza.' },
        { id: '4', question: 'Kako mogu kontaktirati podršku?', answer: 'Možete kontaktirati naš tim za podršku putem sekcije "Kontaktirajte nas" u aplikaciji.' },
      ],
      switchTo: 'Prebaci na Engleski',
    },
  };

  const t = translations[language]; 

  const renderFAQItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} 
      style={styles.container}
    >
      
      <Text style={styles.title}>{t.title}</Text>
      
      <FlatList
        data={t.faqs}
        keyExtractor={(item) => item.id}
        renderItem={renderFAQItem}
      />

      <TouchableOpacity
        onPress={() => setLanguage(language === 'en' ? 'hrv' : 'en')}
        style={styles.languageButton}
      >
        <Text style={styles.languageText}>{t.switchTo}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    textAlign: 'left', 
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10, 
  },
  faqItem: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    color: '#555',
  },
  languageButton: {
    position: 'absolute',
    top: 10, 
    right: 20, 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  languageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});