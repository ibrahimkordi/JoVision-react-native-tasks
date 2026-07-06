import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, Button, Modal, TextInput, Alert } from 'react-native';

const Task28 = () => {
    // 1. مصفوفة الـ State التي تحتوي على 10 صور كحد أدنى (Task 28)
    const [imagesList, setImagesList] = useState([
        { id: '0', url: 'https://picsum.photos/id/10/200/300' },
        { id: '1', url: 'https://picsum.photos/id/11/200/300' },
        { id: '2', url: 'https://picsum.photos/id/12/200/300' },
        { id: '3', url: 'https://picsum.photos/id/13/200/300' },
        { id: '4', url: 'https://picsum.photos/id/14/200/300' },
        { id: '5', url: 'https://picsum.photos/id/15/200/300' },
        { id: '6', url: 'https://picsum.photos/id/16/200/300' },
        { id: '7', url: 'https://picsum.photos/id/17/200/300' },
        { id: '8', url: 'https://picsum.photos/id/18/200/300' },
        { id: '9', url: 'https://picsum.photos/id/19/200/300' },
    ]);

    // حالات التحكم بالـ Modal والمدخلات (Task 29)
    const [modalVisible, setModalVisible] = useState(false);
    const [inputIndex, setInputIndex] = useState('');

    // الـ Ref الخاص بالـ FlatList لتفعيل الانتقال (Task 29)
    const flatListRef = useRef(null);

    // دالة عرض الـ Alert عند الضغط على الصورة (Task 28)
    function handleImagePress(index) {
        Alert.alert("Selection", "You have selected image : " + index);
    }

    // دالة حذف الصورة من المصفوفة (Task 30)
    function deleteImageItem(id) {
        try {
            setImagesList(function(prevList) {
                return prevList.filter(function(item) {
                    return item.id !== id;
                });
            });
        } catch (error) {
            console.error("Delete error:", error.message);
        }
    }

    // دالة تأكيد السكرول من الـ Modal (Task 29)
    function handleModalSubmit() {
        try {
            const targetIndex = parseInt(inputIndex, 10);
            
            if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= imagesList.length) {
                Alert.alert("Invalid Index", "Please enter a correct index between 0 and " + (imagesList.length - 1));
                return;
            }

            // إغلاق الـ Modal وعمل سكرول للموقع المختار
            setModalVisible(false);
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: targetIndex, animated: true });
            }
            setInputIndex('');
        } catch (error) {
            console.error("Scroll error:", error.message);
        }
    }

    // دوال تحكم منفصلة بفتح وإغلاق المودال
    function openModal() { setModalVisible(true); }
    function closeModal() { setModalVisible(false); setInputIndex(''); }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Horizontal Image Gallery</Text>

            {/* القائمة الأفقية لعرض الصور (Task 28) */}
            <FlatList
                ref={flatListRef}
                data={imagesList}
                horizontal={true}
                keyExtractor={function(item) { return item.id; }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                renderItem={function({ item, index }) {
                    return (
                        <View style={styles.imageCard}>
                            {/* الكومبوننت التفاعلي بالضغط (Task 28) */}
                            <Pressable onPress={function() { handleImagePress(index); }}>
                                <Image source={{ uri: item.url }} style={styles.imageStyle} />
                            </Pressable>

                            {/* زر الحذف الموجود في زاوية كل صورة (Task 30) */}
                            <Pressable 
                                style={styles.deleteBadge} 
                                onPress={function() { deleteImageItem(item.id); }}
                            >
                                <Text style={styles.deleteText}>X</Text>
                            </Pressable>

                            <Text style={styles.indexLabel}>Index: {index}</Text>
                        </View>
                    );
                }}
            />

            {/* زر فتح الـ Modal (Task 29) */}
            <View style={styles.actionButtonContainer}>
                <Button title="Go to specific Index" onPress={openModal} color="#2980b9" />
            </View>

            {/* الـ Modal المخصص لإدخال الـ Index والانتقال (Task 29) */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Image Index</Text>
                        <TextInput
                            style={styles.modalInput}
                            keyboardType="numeric"
                            placeholder={"0 to " + (imagesList.length - 1)}
                            value={inputIndex}
                            onChangeText={setInputIndex}
                        />
                        <View style={styles.modalButtonsRow}>
                            <Button title="Cancel" onPress={closeModal} color="#7f8c8d" />
                            <Button title="Submit" onPress={handleModalSubmit} color="#27ae60" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', backgroundColor: '#f5f5f5', paddingVertical: 40 },
    mainTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#2c3e50' },
    listContainer: { paddingHorizontal: 15, alignItems: 'center' },
    imageCard: { width: 160, height: 260, marginRight: 20, position: 'relative', backgroundColor: '#fff', borderRadius: 10, padding: 8, elevation: 3, alignItems: 'center' },
    imageStyle: { width: 144, height: 200, borderRadius: 8 },
    indexLabel: { marginTop: 8, fontSize: 14, fontWeight: '600', color: '#555' },
    deleteBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(231, 76, 60, 0.9)', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
    deleteText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    actionButtonContainer: { paddingHorizontal: 40, marginTop: 40 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 25, elevation: 5 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    modalInput: { borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 6, padding: 10, marginBottom: 20, textAlign: 'center', fontSize: 16 },
    modalButtonsRow: { flexDirection: 'row', justifyContent: 'space-around' }
});

export default Task28;