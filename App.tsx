import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Task28 from './Tasks/Task28'; // استدعاء المكون النهائي المدمج لقائمة الصور

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Task28 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});