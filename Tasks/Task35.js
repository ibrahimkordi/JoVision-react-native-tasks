import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task35 = () => {
    // حالات Inputs النموذج
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    // دالة منفصلة لقراءة البيانات المخزنة عند فتح التطبيق (useEffect Callback)
    async function loadInitialData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@user_form_data');
            if (jsonValue !== null) {
                // عمل فك وتفكيك للكائن المسترجع (Object Deconstruction)
                const { name: savedName, age: savedAge, country: savedCountry, timestamp } = JSON.parse(jsonValue);
                
                const savedDate = new Date(timestamp);
                const currentDate = new Date();
                
                // حساب الفارق الزمني بالملي ثانية ومقارنته (أقل من دقيقة = 60000ms)
                const timeDifference = currentDate.getTime() - savedDate.getTime();

                if (timeDifference < 60000) {
                    setName(savedName);
                    setAge(savedAge);
                    setCountry(savedCountry);
                    setStatusMessage('تم استرجاع البيانات: عمرها أقل من دقيقة.');
                } else {
                    setStatusMessage('البيانات المخزنة قديمة (أكبر من دقيقة)، تم إهمالها.');
                }
            } else {
                setStatusMessage('لا توجد بيانات مخزنة مسبقاً.');
            }
        } catch (error) {
            console.error("Error loading data:", error.message);
            setStatusMessage('حدث خطأ أثناء قراءة البيانات محلياً.');
        }
    }

    // استدعاء دالة التحقق عند إقلاع المكون
    useEffect(function () {
        loadInitialData();
    }, []);

    // دالة حفظ البيانات عند الضغط على زر Submit (Event Handler)
    async function handleSubmit() {
        try {
            if (!name || !age || !country) {
                Alert.alert("تنبيه", "الرجاء تعبئة جميع الحقول أولاً.");
                return;
            }

            // بناء كائن البيانات مع الـ Timestamp الحالي
            const formData = {
                name: name,
                age: age,
                country: country,
                timestamp: new Date().toISOString()
            };

            // تخزين الكائن بعد تحويله لنص JSON
            await AsyncStorage.setItem('@user_form_data', JSON.stringify(formData));
            setStatusMessage('تم حفظ البيانات بنجاح في التخزين المحلي!');
            Alert.alert("نجاح", "تم حفظ البيانات محلياً.");
        } catch (error) {
            console.error("Error saving data:", error.message);
            setStatusMessage('حدث خطأ أثناء محاولة حفظ البيانات.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>User Info Form (AsyncStorage)</Text>
            
            <TextInput 
                style={styles.input} 
                placeholder="Enter Name" 
                value={name} 
                onChangeText={setName} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Enter Age" 
                value={age} 
                keyboardType="numeric"
                onChangeText={setAge} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Enter Country" 
                value={country} 
                onChangeText={country} 
            />

            <View style={styles.buttonWrapper}>
                <Button title="Submit" onPress={handleSubmit} color="#2ecc71" />
            </View>

            {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
    mainTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 25, color: '#2c3e50' },
    input: { borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 6, padding: 12, marginBottom: 15, fontSize: 16 },
    buttonWrapper: { marginTop: 10 },
    statusText: { marginTop: 25, textAlign: 'center', fontSize: 14, color: '#7f8c8d', fontStyle: 'italic' }
});

export default Task35;