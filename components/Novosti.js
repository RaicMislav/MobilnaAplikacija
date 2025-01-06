import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';

const NovostiScreen = () => {
  // Sample news data
  const newsData = [
    { id: '1', title: 'New Feature: Dark Mode Added!', description: 'We’ve added dark mode to improve your app experience.', date: '2025-01-01' },
    { id: '2', title: 'Upcoming Maintenance', description: 'The app will undergo maintenance on 5th January from 1AM to 3AM.', date: '2025-01-03' },
    { id: '3', title: 'Important Update on Courses', description: 'New courses have been added to the platform. Check them out now!', date: '2025-01-04' },
    { id: '4', title: 'App Now Available in Multiple Languages', description: 'You can now switch between English and Croatian in the app settings.', date: '2025-01-05' },
  ];

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
      source={require('../assets/background.jpg')} // Replace with your background image
      style={styles.container}
    >
      <Text style={styles.title}>Novosti i Ažuriranja</Text>

      <FlatList
        data={newsData}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
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