import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DrawerInfo = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Placeholder for student's image */}
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}></View>
      </View>

      <View style={styles.infoContainer}>
        {/* Placeholder for student's name */}
        <Text style={[styles.name, { color: theme.text }]}>Student Name</Text>
        
        {/* Placeholder for student's age */}
        <Text style={[styles.info, { color: theme.text }]}>Age: 20</Text>
        
        {/* Placeholder for student's major */}
        <Text style={[styles.info, { color: theme.text }]}>Major: Computer Science</Text>
        
        {/* Placeholder for student's bio */}
        <Text style={[styles.bio, { color: theme.text }]}>This is a placeholder for the student's bio.</Text>
      </View>
    </ScrollView>
  );
};

export default DrawerInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    backgroundColor: '#dcdcdc',
    borderRadius: 60,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
    color: 'gray',
  },
});