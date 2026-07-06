import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Task21 from './Tasks/Task21'; // استدعاء الملف المدمج الشامل

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Task21 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});