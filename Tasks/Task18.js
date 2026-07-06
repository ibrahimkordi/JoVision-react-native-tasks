import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Task18 = () => {
    const [isLoading, setIsLoading] = useState(true);

    // دالة منفصلة لتحديث الحالة (Event Handler / Callback)
    function stopLoading() {
        setIsLoading(false);
    }

    useEffect(function () {
        try {
            // تايمر ينتهي بعد 5000 ميلي ثانية (5 ثوانٍ)
            const timer = setTimeout(stopLoading, 5000);
            return function () { 
                clearTimeout(timer); 
            };
        } catch (error) {
            console.error("Timer error in Task 18:", error.message);
        }
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingBox}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <Text style={styles.nameText}>Ibrahim Ahmed Al-Kordi</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    loadingBox: { alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 18, color: '#555' },
    nameText: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50' }
});

export default Task18;