import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const Task26 = () => {
    const [ipAddress, setIpAddress] = useState('Click a button to get IP');
    const [isBlocking, setIsBlocking] = useState(false);

    // دالة تحديث النص بالـ IP المستلم
    function handleSuccess(ip) {
        setIpAddress(ip);
    }

    // دالة معالجة الأخطاء
    function handleError(error) {
        console.error("Request failed:", error.message);
        setIpAddress("Error: " + error.message);
    }

    // 1. طلب غير حاجب للواجهة (Non-Blocking Request) باستخدام Promises (.then)
    function fetchIpNonBlocking() {
        try {
            setIpAddress('Fetching (Non-Blocking)... يمكنك التفاعل مع التطبيق');
            
            fetch('https://api.ipify.org/')
                .then(function(response) {
                    if (!response.ok) throw new Error("Status: " + response.status);
                    return response.text();
                })
                .then(handleSuccess)
                .catch(handleError);
        } catch (error) {
            handleError(error);
        }
    }

    // 2. طلب حاجب للواجهة (Blocking Request) باستخدام async/await والـ Loading State
    async function fetchIpBlocking() {
        try {
            // حجب الواجهة وتشغيل مؤشر التحميل
            setIsBlocking(true);
            setIpAddress('Fetching (Blocking)... تم قفل الواجهة');

            const response = await fetch('https://api.ipify.org/');
            if (!response.ok) {
                throw new Error("Status: " + response.status);
            }
            const data = await response.text();
            handleSuccess(data);
        } catch (error) {
            handleError(error);
        } finally {
            // إلغاء حجب الواجهة بعد انتهاء الطلب
            setIsBlocking(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.ipText}>{ipAddress}</Text>

            <View style={styles.buttonContainer}>
                <Button 
                    title="Get IP (Non-Blocking)" 
                    onPress={fetchIpNonBlocking} 
                    disabled={isBlocking}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button 
                    title="Get IP (Blocking)" 
                    onPress={fetchIpBlocking} 
                    disabled={isBlocking}
                />
            </View>

            {/* مؤشر حجب الواجهة المشروط */}
            {isBlocking && (
                <View style={styles.blockingOverlay}>
                    <ActivityIndicator size="large" color="#ff0000" />
                    <Text style={styles.blockingText}>UI Locked... Please wait</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
    ipText: { fontSize: 20, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
    buttonContainer: { width: '80%', my: 10, marginVertical: 10 },
    blockingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
    blockingText: { color: '#fff', marginTop: 10, fontSize: 16, fontWeight: 'bold' }
});

export default Task26;