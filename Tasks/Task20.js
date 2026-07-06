import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// 1. الكلاس كومبوننت الفرعي المطلوبة (MyClassPage) مع الـ Lifecycle
class MyClassPage extends Component {
    
    // عند تحميل المكون في الـ DOM (Task 20)
    componentDidMount() {
        console.log("MyClassPage loaded");
    }

    // عند حذف أو إخفاء المكون من الـ DOM (Task 20)
    componentWillUnmount() {
        console.log("MyClassPage unloaded");
    }

    render() {
        return (
            <View style={styles.classBox}>
                <Text style={styles.classText}>Welcome to MyClassPage Component!</Text>
                <Text style={styles.nameText}>Ibrahim Al-Kordi</Text>
            </View>
        );
    }
}

// 2. المكون الأساسي للتاسك
const Task20 = () => {
    const [showClassPage, setShowClassPage] = useState(false);

    function toggleClassPage() {
        try {
            setShowClassPage(function (prev) { return !prev; });
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Show" onPress={toggleClassPage} />
            
            {/* رندرة الكلاس كومبوننت بناءً على الـ State */}
            {showClassPage && <MyClassPage />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 },
    classBox: { marginTop: 30, padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10, alignItems: 'center' },
    classText: { fontSize: 16, fontStyle: 'italic', marginBottom: 10 },
    nameText: { fontSize: 22, fontWeight: 'bold', color: '#333' }
});

export default Task20;