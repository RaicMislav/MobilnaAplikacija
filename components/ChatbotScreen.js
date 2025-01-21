import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { sendMessageToBot } from './ChatService'; // Import the function to interact with OpenAI

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);

    // Call API to get bot response
    const botResponse = await sendMessageToBot(input);

    // Add bot response after a delay (simulate bot thinking)
    setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);

    // Clear input and dismiss keyboard
    setInput('');
    Keyboard.dismiss();
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Messages list */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={item.sender === 'user' ? styles.userText : styles.botText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }} // To make room for input field
        ref={(ref) => { this.flatListRef = ref; }}
        onContentSizeChange={() => this.flatListRef?.scrollToEnd({ animated: true })}
      />

      {/* Input container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message"
          placeholderTextColor="#888"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0A1F44', // Dark blue background
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#002E6D', // Darker blue for the back button
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    maxWidth: '75%',
  },
  userBubble: {
    backgroundColor: '#00509E', // Darker blue for user messages
    alignSelf: 'flex-end',
    color: '#ffffff',
  },
  botBubble: {
    backgroundColor: '#1B3A63', // Dark blue for bot messages
    alignSelf: 'flex-start',
    color: '#ffffff',
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#002E6D', // Blue border for the input field
    borderRadius: 25,
    padding: 12,
    width: '85%',
    backgroundColor: '#0A1F44', // Match input background with the app's theme
    color: '#ffffff', // White text for input field
  },
  sendButton: {
    backgroundColor: '#002E6D', // Darker blue for the send button
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#ffffff', // White text for the send button
    fontSize: 16,
  },
});

export default ChatbotScreen;