import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, SafeAreaView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SettingsContext } from '../SettingsContext';
import { isAdmin } from '../AdminPanel'; // Importing isAdmin from AdminPanel
import { supabase } from '../supabaseConfig'; // Import your supabase instance

// Import your background image
import backgroundImage from '../assets/background.jpg'; // Adjust the path to your image

const NovostiScreen = () => {
  const { language, theme, translate } = useContext(SettingsContext);
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
      {/* Use ImageBackground with the imported local image */}
      <ImageBackground
        source={backgroundImage} // The background image from assets
        style={styles.imageBackground} // Style for ImageBackground to cover the whole screen
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              {translate("Novosti i Ažuriranja")}
            </Text>
          </View>

          {/* Conditional rendering of admin status indicator */}
          {adminStatus && (
            <View style={styles.adminIndicator}>
              <Text style={styles.adminText}>Admin Način rada</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.addButtonText}>Add News</Text>
              </TouchableOpacity>
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
            {/* Use ImageBackground in modal */}
            <ImageBackground
              source={backgroundImage} // The background image from assets
              style={styles.modalBackground} // Style for ImageBackground in modal
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
                <TouchableOpacity style={styles.submitButton} onPress={addNews}>
                  <Text style={styles.submitButtonText}>Submit News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
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
    borderRadius: 8,
  },
  adminText: {
    fontSize: 16,
    color: '#FF6800',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FF6800',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
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
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  newsDescription: {
    fontSize: 14,
    color: '#bbb',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#FF6800',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NovostiScreen;