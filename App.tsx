import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Task20 from './Tasks/Task20'; // استدعاء المكون النهائي

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Task20 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});