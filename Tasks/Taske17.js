import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Task17 = () => {
    const [isVisible, setIsVisible] = useState(false);

    // دالة منفصلة لتغيير حالة الـ State (Event Handler)
    function handleToggle() {
        try {
            setIsVisible(function (prevState) {
                return !prevState;
            });
        } catch (error) {
            console.error("Error in Task 17:", error.message);
        }
    }

    return (
        <View style={styles.container}>
            {/* النص يتغير ديناميكياً بناءً على الـ state */}
            <Button 
                title={isVisible ? "Hide" : "Show"} 
                onPress={handleToggle} 
            />
            {isVisible && <Text style={styles.text}>Ibrahim Al-Kordi</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 22, marginTop: 20, fontWeight: 'bold' }
});

export default Task17;