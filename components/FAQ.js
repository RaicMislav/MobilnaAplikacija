import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, SafeAreaView } from 'react-native';
import { SettingsContext } from '../SettingsContext';

export default function FAQScreen() {
  const { language, getBackgroundImage, theme } = useContext(SettingsContext);

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

  const renderFAQItem = ({ item }) => (
    <View style={[styles.faqItem, { backgroundColor: theme.card }]}>
    <Text style={[styles.question, { color: theme.text }]}>{item.question}</Text>
    <Text style={[styles.answer, { color: theme.text }]}>{item.answer}</Text>
  </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={getBackgroundImage()}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>FAQ</Text>
        </View>

        <FlatList
          data={faqs[language]} 
          keyExtractor={(item) => item.id}
          renderItem={renderFAQItem}
          contentContainerStyle={styles.newsList}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,  // Add some padding to the header
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  faqItem: {
    padding: 15,
    backgroundColor: '#2E2E2E',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    marginHorizontal: 20, // Adjust margin for the FAQ items
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