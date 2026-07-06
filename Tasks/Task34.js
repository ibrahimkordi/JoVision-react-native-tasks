import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// ==========================================
// 1. الـ Custom Hook المستقل (useCurrentTime)
// ==========================================
function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(function () {
        // دالة التحديث المنفصلة داخل الـ Effect
        function updateTime() {
            setCurrentTime(new Date());
        }

        // إنشاء الـ Interval لتحديث الوقت كل ثانية (1000ms)
        const intervalId = setInterval(updateTime, 1000);

        // دالة التنظيف (Cleanup Function) لإلغاء الـ Interval ومنع تسريب الذاكرة (Task 34)
        return function () {
            clearInterval(intervalId);
            console.log("Interval cleared successfully. Memory leak prevented!");
        };
    }, []);

    return currentTime;
}

// ==========================================
// 2. الكومبوننت الفرعي للوقت (الذي يتم تركيبه وإلغاؤه تكراراً)
// ==========================================
const ClockDisplay = () => {
    const timeData = useCurrentTime();

    return (
        <View style={styles.clockBox}>
            <Text style={styles.timeLabel}>Current Time:</Text>
            <Text style={styles.timeValue}>{timeData.toLocaleTimeString()}</Text>
            <Text style={styles.dateValue}>{timeData.toLocaleDateString()}</Text>
        </View>
    );
};

// ==========================================
// 3. المكون الأساسي للتاسك لإدارة الـ Toggle
// ==========================================
const Task34 = () => {
    const [isEnabled, setIsEnabled] = useState(true);

    // دالة التبديل المنفصلة (Event Handler) لتشغيل وإطفاء مكون الوقت وملاحظة الـ Cleanup
    function handleToggleClock() {
        try {
            setIsEnabled(function(prevState) {
                return !prevState;
            });
        } catch (error) {
            console.error("Toggle clock error:", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Custom Hook Clock (Task 34)</Text>
            
            <View style={styles.displayArea}>
                {isEnabled ? <ClockDisplay /> : <Text style={styles.disabledText}>Clock Component Component is Unmounted</Text>}
            </View>

            <View style={styles.buttonWrapper}>
                <Button 
                    title={isEnabled ? "Toggle OFF (Unmount)" : "Toggle ON (Mount)"} 
                    onPress={handleToggleClock} 
                    color={isEnabled ? "#c0392b" : "#27ae60"}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
    mainTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 30, color: '#2c3e50' },
    displayArea: { height: 160, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
    clockBox: { padding: 20, backgroundColor: '#f8f9fa', borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', width: 250 },
    timeLabel: { fontSize: 14, color: '#718096', marginBottom: 5, fontWeight: '600' },
    timeValue: { fontSize: 28, fontWeight: 'bold', color: '#1a202c' },
    dateValue: { fontSize: 14, color: '#4a5568', marginTop: 5 },
    disabledText: { fontSize: 15, color: '#e74c3c', fontStyle: 'italic' },
    buttonWrapper: { width: '70%' }
});

export default Task34;