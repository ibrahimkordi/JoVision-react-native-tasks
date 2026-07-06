import React, { createContext, useState, useContext, Component } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

// 1. إنشاء الـ Context
const TextSharingContext = createContext();

// 2. Component One: Class Component يقرأ النص ويعرضه فقط
class ComponentOne extends Component {
    render() {
        return (
            <View style={styles.childBox}>
                <Text style={styles.sharedText}>
                    Shared Output: {this.props.sharedText || "Empty"}
                </Text>
            </View>
        );
    }
}

// 3. Component Two: Functional Component يحتوي على مدخل ويضم نسخة من المكون الأول
const ComponentTwo = () => {
    // استهلاك الـ Context في المكون الفانكشن
    const contextData = useContext(TextSharingContext);
    
    function handleInputChange(text) {
        try {
            contextData.setGlobalText(text);
        } catch (error) {
            console.error("Context update error:", error.message);
        }
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Component Two Instance</Text>
            <TextInput
                style={styles.input}
                placeholder="Type here to change all outputs..."
                value={contextData.globalText}
                onChangeText={handleInputChange}
            />
            {/* تمرير البيانات للمكون الكلاس الفرعي */}
            <ComponentOne sharedText={contextData.globalText} />
        </View>
    );
};

// 4. Main Component: يحتوي على الـ Provider و 4 نسخ من المكون الثاني
const Task38 = () => {
    const [globalText, setGlobalText] = useState('');

    return (
        <TextSharingContext.Provider value={{ globalText, setGlobalText }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.mainTitle}>Context Provider State Sharing</Text>
                <ComponentTwo />
                <ComponentTwo />
                <ComponentTwo />
                <ComponentTwo />
            </ScrollView>
        </TextSharingContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f4f6f9' },
    mainTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#2c3e50' },
    cardContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
    cardTitle: { fontSize: 14, fontWeight: '600', color: '#7f8c8d', marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 10, backgroundColor: '#fafafa' },
    childBox: { padding: 8, backgroundColor: '#e8f4f8', borderRadius: 4 },
    sharedText: { color: '#2980b9', fontWeight: 'bold' }
});

export default Task38;