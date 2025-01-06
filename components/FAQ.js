import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';

export default function FAQScreen() {
  const [language, setLanguage] = useState('en'); 

 
  const faqs = {
    en: [
      { id: '1', question: 'What is this app about?', answer: 'This app helps you manage tasks efficiently and stay organized.' },
      { id: '2', question: 'How can I reset my password?', answer: 'Go to the login page and click on "Forgot Password" to reset your password.' },
      { id: '3', question: 'Can I use this app offline?', answer: 'Some features are available offline, but full functionality requires an internet connection.' },
      { id: '4', question: 'How do I contact support?', answer: 'You can reach our support team via the "Contact Us" section in the app.' },
    ],
    hr: [
      { id: '1', question: 'Što je ova aplikacija?', answer: 'Ova aplikacija vam pomaže u učinkovitom upravljanju zadacima i održavanju organizacije.' },
      { id: '2', question: 'Kako mogu resetirati svoju lozinku?', answer: 'Idite na stranicu za prijavu i kliknite na "Zaboravljena lozinka" za resetiranje lozinke.' },
      { id: '3', question: 'Mogu li koristiti ovu aplikaciju offline?', answer: 'Neke značajke su dostupne offline, ali puna funkcionalnost zahtijeva internetsku vezu.' },
      { id: '4', question: 'Kako kontaktirati podršku?', answer: 'Možete kontaktirati našu podršku putem odjeljka "Kontaktirajte nas" u aplikaciji.' },
    ],
  };


  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hr' : 'en');
  };


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
      <View style={styles.header}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
          <Text style={styles.languageText}>{language === 'en' ? 'EN' : 'HR'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={faqs[language]} 
        keyExtractor={(item) => item.id}
        renderItem={renderFAQItem}
        contentContainerStyle={styles.newsList}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
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
});