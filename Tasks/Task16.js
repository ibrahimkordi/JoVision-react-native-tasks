import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Task16 = () => {
    // State للتحكم بحالة ظهور الاسم (false تعني مخفي)
    const [isVisible, setIsVisible] = useState(false);

    // دالة منفصلة تماماً للتعامل مع حدث الضغط (Event Handler) حسب الشروط والـ Guidelines
    function handleToggleName() {
        try {
            setIsVisible(function (prevState) {
                return !prevState;
            });
        } catch (error) {
            console.error("An error occurred during toggle:", error.message);
        }
    }

    return (
        <View style={styles.container}>
            {/* زر ثابت العنوان وتمرير اسم الدالة المنفصلة مباشرة كـ argument */}
            <Button 
                title="Show" 
                onPress={handleToggleName} 
            />

            {/* الـ Conditional Rendering لعرض الاسم فقط عندما تكون الحالة true */}
            {isVisible && (
                <Text style={styles.nameText}>Ibrahim Al-Kordi</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#222',
    },
});

export default Task16;