import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Task34 from './Tasks/Task34'; // استدعاء ملف الـ Custom Hook الأخير

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Task34 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});