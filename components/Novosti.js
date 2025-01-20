import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, SafeAreaView } from 'react-native';
import { SettingsContext } from '../SettingsContext';
import { isAdmin } from '../AdminPanel'; // Importing isAdmin from AdminPanel

const NovostiScreen = () => {
  const { language, getBackgroundImage, theme, translate } = useContext(SettingsContext);
  const [adminStatus, setAdminStatus] = useState(false); // State to track admin status

  // Fetch admin status on component mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      const status = await isAdmin(); // Get the current user admin status
      setAdminStatus(status); // Update state based on result
    };

    checkAdminStatus();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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

  const renderNewsItem = ({ item }) => (
    <View style={[styles.newsItem, { backgroundColor: theme.card }]}>
      <Text style={[styles.newsTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.newsDate, { color: theme.text }]}>{item.date}</Text>
      <Text style={[styles.newsDescription, { color: theme.text }]}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={getBackgroundImage()}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {translate("Novosti i Ažuriranja")}
          </Text>
        </View>

        {/* Conditional rendering of admin status indicator */}
        {adminStatus && (
          <View style={styles.adminIndicator}>
            <Text style={styles.adminText}>Admin Privileges Active</Text>
          </View>
        )}

        <FlatList
          data={newsData[language]} 
          keyExtractor={(item) => item.id}
          renderItem={renderNewsItem}
          contentContainerStyle={styles.newsList}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

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
    marginTop: 20, // Added top margin to space from the top
    marginBottom: 30,
    paddingHorizontal: 20, // Padding to match the FAQ header
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  adminIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slight transparent background for the admin indicator
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  adminText: {
    fontSize: 16,
    color: '#FFD700', // Gold color to stand out
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newsList: {
    flexGrow: 1,
  },
  newsItem: {
    backgroundColor: '#2E2E2E', // Dark gray background
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 20, // Adjust margin for the news items
  },
  newsTitle: {
    fontSize: 16, // Similar to FAQ item title
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
    fontSize: 14, // Matching font size with FAQ answer
    color: '#555',
  },
});

export default NovostiScreen;