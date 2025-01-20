import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, SafeAreaView, TextInput, Button, Modal } from 'react-native';
import { SettingsContext } from '../SettingsContext';
import { isAdmin } from '../AdminPanel'; // Importing isAdmin from AdminPanel
import { supabase } from '../supabaseConfig'; // Import your supabase instance

const NovostiScreen = () => {
  const { language, getBackgroundImage, theme, translate } = useContext(SettingsContext);
  const [adminStatus, setAdminStatus] = useState(false); // State to track admin status
  const [newsData, setNewsData] = useState([]);
  const [newNews, setNewNews] = useState({ title: '', description: '', date: '' });
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch admin status on component mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      const status = await isAdmin(); // Get the current user admin status
      setAdminStatus(status); // Update state based on result
    };

    checkAdminStatus();
    fetchNews(); // Fetch news when the component mounts
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch news data from Supabase
  const fetchNews = async () => {
    const { data, error } = await supabase.from('news').select('*');
    if (error) {
      console.error('Error fetching news:', error);
    } else {
      setNewsData(data);
    }
  };

  // Handle adding new news
  const addNews = async () => {
    const { title, description, date } = newNews;
    const { data, error } = await supabase.from('news').insert([
      { title, description, date }
    ]);

    if (error) {
      console.error('Error adding news:', error);
    } else {
      fetchNews(); // Refresh the news list after adding a new item
      setModalVisible(false); // Close the modal after submission
      setNewNews({ title: '', description: '', date: '' }); // Clear input fields
    }
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
            <Button title="Add News" onPress={() => setModalVisible(true)} />
          </View>
        )}

        <FlatList
          data={newsData} 
          keyExtractor={(item) => item.id}
          renderItem={renderNewsItem}
          contentContainerStyle={styles.newsList}
        />

        {/* Modal for adding new news (Admin Only) */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newNews.title}
              onChangeText={(text) => setNewNews({ ...newNews, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newNews.description}
              onChangeText={(text) => setNewNews({ ...newNews, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={newNews.date}
              onChangeText={(text) => setNewNews({ ...newNews, date: text })}
            />
            <Button title="Submit News" onPress={addNews} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
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
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  adminIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  adminText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newsList: {
    flexGrow: 1,
  },
  newsItem: {
    backgroundColor: '#2E2E2E',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 20,
  },
  newsTitle: {
    fontSize: 16,
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
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default NovostiScreen;