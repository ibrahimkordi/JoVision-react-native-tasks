import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Task16 from './Tasks/Task16'; // استدعاء التاسك من مجلد Tasks

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Task16 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});