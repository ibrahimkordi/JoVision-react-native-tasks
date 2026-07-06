import React, { useState } from 'react';
import { Button, StyleSheet, Image, View, Alert, Text } from 'react-native';

const Task27 = () => {
    // تحديد الصورة الافتراضية الأولى عند التشغيل
    const [selectedImage, setSelectedImage] = useState(1);

    // دالة لتحديث الـ State برقم الصورة المختار
    function changeImage(imageNumber) {
        setSelectedImage(imageNumber);
    }

    // الـ Event Handler المنفصل لعرض الـ Alert وبداخله الخيارات
    function handlePickImagePress() {
        try {
            Alert.alert(
                "Pick an Image",
                "Choose the number of the image to display:",
                [
                    { text: "Image 1", onPress: function() { changeImage(1); } },
                    { text: "Image 2", onPress: function() { changeImage(2); } },
                    { text: "Image 3", onPress: function() { changeImage(3); } }
                ],
                { cancelable: true }
            );
        } catch (error) {
            console.error("Alert error:", error.message);
        }
    }

    // دالة اختيار رابط الصورة بناءً على الـ State المحددة باستخدام Require
    function renderSelectedImage() {
        if (selectedImage === 2) {
            return require('../Resources/img2.png');
        }
        if (selectedImage === 3) {
            return require('../Resources/img3.png');
        }
        return require('../Resources/img1.png');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Displaying Image #{selectedImage}</Text>
            
            <Image 
                source={renderSelectedImage()} 
                style={styles.imageStyle} 
                resizeMode="cover"
            />

            <View style={styles.buttonWrapper}>
                <Button title="Choose Image" onPress={handlePickImagePress} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    imageStyle: { width: 300, height: 300, borderRadius: 10, marginBottom: 30 },
    buttonWrapper: { width: '60%' }
});

export default Task27;