import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, FlatList, TextInput, Button } from 'react-native';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from "../firebaseConfig";

export default function FAQScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqsCollection = collection(firestore, "faqs");
        const faqsSnapshot = await getDocs(faqsCollection);
        const faqsList = faqsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFaqs(faqsList);
      } catch (error) {
        console.error("Error loading FAQs: ", error);
      }
    };
    fetchFAQs();
  }, []);

  const handleAddFAQ = async () => {
    if (question !== "" && answer !== "") {
      const newFAQ = { question, answer };
      const docRef = await addDoc(collection(firestore, "faqs"), newFAQ);
      setFaqs([...faqs, { id: docRef.id, ...newFAQ }]);
      setQuestion("");
      setAnswer("");
      setModalVisible(false);
      Alert.alert("FAQ added successfully!");
    } else {
      Alert.alert("Please fill in both fields.");
    }
  };

  const renderFAQItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add FAQ</Text>
      </TouchableOpacity>

      <FlatList
        data={faqs}
        keyExtractor={(item) => item.id}
        renderItem={renderFAQItem}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add FAQ</Text>
            <TextInput
              placeholder="Question"
              style={styles.input}
              value={question}
              onChangeText={setQuestion}
            />
            <TextInput
              placeholder="Answer"
              style={styles.input}
              value={answer}
              onChangeText={setAnswer}
              multiline
            />
            <Button title="Add" onPress={handleAddFAQ} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  addButton: { backgroundColor: 'navy', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: 'white', fontSize: 16 },
  faqItem: { padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5, marginBottom: 10 },
  question: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  answer: { fontSize: 14, color: '#555' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});