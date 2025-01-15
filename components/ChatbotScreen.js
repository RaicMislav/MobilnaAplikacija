import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();

  const handleSend = () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    
    // Add bot response after a delay (simulate bot thinking)
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'm here to help!", sender: 'bot' }]);
    }, 1000); // Adjust the delay as necessary

    // Clear input and dismiss keyboard
    setInput('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Messages list */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }} // To make room for input field
        ref={(ref) => { this.flatListRef = ref; }}
        onContentSizeChange={() => this.flatListRef?.scrollToEnd({ animated: true })}
      />

      {/* Input field */}
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
        onSubmitEditing={handleSend}
      />

      {/* Send button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#d1e7ff',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatbotScreen;
