import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';

export default function FAQScreen() {
  const faqs = [
    { id: '1', question: 'What is this app about?', answer: 'This app helps you manage tasks efficiently and stay organized.' },
    { id: '2', question: 'How can I reset my password?', answer: 'Go to the login page and click on "Forgot Password" to reset your password.' },
    { id: '3', question: 'Can I use this app offline?', answer: 'Some features are available offline, but full functionality requires an internet connection.' },
    { id: '4', question: 'How do I contact support?', answer: 'You can reach our support team via the "Contact Us" section in the app.' },
  ];

  const renderFAQItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Path to your background image in assets
      style={styles.container}
    >
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <FlatList
        data={faqs}
        keyExtractor={(item) => item.id}
        renderItem={renderFAQItem}
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  faqItem: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white for better contrast
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