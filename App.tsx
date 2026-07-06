import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Task36 from './Tasks/Task36'; // استدعاء ملف الـ ScrollView والـ Refresh

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Task36 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
})