import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, StyleSheet, Text, View } from 'react-native';

// دالة توليد كلمة عشوائية المذكورة في التلميحات
function generateRandomWord(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const Task36 = () => {
    const [wordsList, setWordsList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // دالة منفصلة لتوليد مصفوفة تحتوي على 100 كلمة عشوائية
    function generateOneHundredWords() {
        try {
            const temporaryArray = [];
            for (let i = 1; i <= 100; i++) {
                // توليد كلمة عشوائية بطول 7 أحرف متبوعة برقمها
                const word = generateRandomWord(7);
                temporaryArray.push({ id: i, text: i + ". " + word });
            }
            setWordsList(temporaryArray);
        } catch (error) {
            console.error("Error generating words:", error.message);
        }
    }

    // دالة معالجة السحب للتحديث (Pull-to-Refresh Event Handler - Task 37)
    function handleRefresh() {
        try {
            setRefreshing(true);
            // إعادة توليد الكلمات العشوائية لمحاكاة جلب بيانات جديدة
            generateOneHundredWords();
            
            // إنهاء مؤشر التحميل بعد ثانية واحدة تلقائياً
            setTimeout(function() {
                setRefreshing(false);
            }, 1000);
        } catch (error) {
            console.error("Refresh error:", error.message);
            setRefreshing(false);
        }
    }

    // توليد القائمة لأول مرة عند تشغيل الكومبوننت
    useEffect(function () {
        generateOneHundredWords();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>100 Random Words (Pull to Refresh)</Text>
            
            {/* ScrollView مدمج معه خاصية التحديث وسحب الشاشة (Task 36 & 37) */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={handleRefresh} 
                        colors={['#3498db']}
                    />
                }
            >
                {wordsList.map(function (item) {
                    return (
                        <View key={item.id} style={styles.wordCard}>
                            <Text style={styles.wordText}>{item.text}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f6fa', paddingTop: 20 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#2c3e50' },
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
    wordCard: { backgroundColor: '#fff', padding: 12, borderRadius: 6, marginVertical: 5, elevation: 1, borderWidth: 1, borderColor: '#dcdde1' },
    wordText: { fontSize: 16, color: '#2f3640', fontFamily: 'monospace' }
});

export default Task36;