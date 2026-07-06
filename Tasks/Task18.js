import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Task18 = () => {
    const [isLoading, setIsLoading] = useState(true);

    // دالة منفصلة يتم استدعاؤها لتغيير الحالة بعد انتهاء التايمر
    function stopLoading() {
        setIsLoading(false);
    }

    useEffect(function () {
        try {
            // تايمر لمدة 5000 ميلي ثانية (5 ثوانٍ)
            const timer = setTimeout(stopLoading, 5000);
            return function () { clearTimeout(timer); };
        } catch (error) {
            console.error("Timer error:", error.message);
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
                <Text style={styles.nameText}>Ibrahim Al-Kordi</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingBox: { alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 18 },
    nameText: { fontSize: 24, fontWeight: 'bold', color: 'green' }
});

export default Task18;