import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Task41 from './Tasks/Task41'; // استدعاء المنظومة الملاحية الشاملة

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Task41 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});