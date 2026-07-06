import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Video from 'react-native-video';

const Task32 = () => {
    // إدارة حالة التشغيل/الإيقاف المؤقت (Task 33)
    const [isPaused, setIsPaused] = useState(true);
    const videoRef = useRef(null);

    // الـ Event Handler المنفصل لتبديل حالة تشغيل الفيديو برمجياً عند الضغط (Task 33)
    function handleVideoPress() {
        try {
            setIsPaused(function(prevStatus) {
                return !prevStatus;
            });
        } catch (error) {
            console.error("Video control error:", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Custom Video Player (Task 32 & 33)</Text>

            {/* استخدام Pressable في منتصف الشاشة لالتقاط حدث الضغط وتبديل التشغيل */}
            <Pressable style={styles.videoWrapper} onPress={handleVideoPress}>
                <Video
                    ref={videoRef}
                    // رابط فيديو تجريبي مفتوح المصدر
                    source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                    style={styles.videoStyle}
                    paused={isPaused}
                    resizeMode="cover"
                    controls={false} // إغلاق الـ Native Controls تماماً (Task 33)
                    // إضافة بوستر للفيديو يظهر قبل التشغيل (Task 32)
                    poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                    posterResizeMode="cover"
                />

                {/* طبقة توضيحية تظهر حالة الفيديو الحالية للمستخدم في المنتصف */}
                {isPaused && (
                    <View style={styles.overlayContainer}>
                        <Text style={styles.playIcon}>▶</Text>
                        <Text style={styles.overlayText}>Tap Center to Play</Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', paddingVertical: 20 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
    videoWrapper: { width: '90%', height: 250, borderRadius: 10, overflow: 'hidden', backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
    videoStyle: { width: '100%', height: '100%' },
    overlayContainer: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.6)', padding: 15, borderRadius: 8, alignItems: 'center' },
    playIcon: { color: '#fff', fontSize: 36, marginBottom: 5 },
    overlayText: { color: '#fff', fontSize: 14, fontWeight: '500' }
});

export default Task32;