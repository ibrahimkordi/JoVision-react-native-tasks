import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// ==========================================
// مكون قالب الشاشات العام لتبسيط إدارة التنقل (Task 41 & 42)
// ==========================================
const BaseScreen = ({ screenNumber, navigation }) => {
    // مصفوفة الصفحات المتاحة للتنقل إليها
    const pages = [1, 2, 3, 4];

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenText}>Screen {screenNumber}</Text>
            <Text style={styles.subText}>Navigate to other pages:</Text>
            
            <View style={styles.buttonGroup}>
                {pages.map(function(page) {
                    // عدم رسم زر يأخذ الشاشة إلى نفسها
                    if (page === screenNumber) return null;
                    
                    // دالة التنقل المنفصلة التبادلية
                    function handleNavigation() {
                        try {
                            navigation.navigate('Screen_' + page);
                        } catch (error) {
                            console.error("Navigation error:", error.message);
                        }
                    }

                    return (
                        <View key={page} style={styles.buttonSpacing}>
                            <Button 
                                title={"Go to Page " + page} 
                                onPress={handleNavigation}
                                color="#34495e"
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

// الشاشات الأربعة المستقلة المطلوبة (Task 41)
const ScreenOne = ({ navigation }) => <BaseScreen screenNumber={1} navigation={navigation} />;
const ScreenTwo = ({ navigation }) => <BaseScreen screenNumber={2} navigation={navigation} />;
const ScreenThree = ({ navigation }) => <BaseScreen screenNumber={3} navigation={navigation} />;
const ScreenFour = ({ navigation }) => <BaseScreen screenNumber={4} navigation={navigation} />;

// ==========================================
// الهيكل العام للـ Bottom Tab Stack
// ==========================================
const Task41 = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#2980b9',
                    tabBarInactiveTintColor: '#7f8c8d',
                    tabBarStyle: { paddingBottom: 5, height: 60 },
                    headerTitleAlign: 'center'
                }}
            >
                <Tab.Screen name="Screen_1" component={ScreenOne} options={{ title: 'Page 1' }} />
                <Tab.Screen name="Screen_2" component={ScreenTwo} options={{ title: 'Page 2' }} />
                <Tab.Screen name="Screen_3" component={ScreenThree} options={{ title: 'Page 3' }} />
                <Tab.Screen name="Screen_4" component={ScreenFour} options={{ title: 'Page 4' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    screenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
    screenText: { fontSize: 36, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
    subText: { fontSize: 15, color: '#95a5a6', marginBottom: 20 },
    buttonGroup: { width: '80%' },
    buttonSpacing: { marginVertical: 6 }
});

export default Task41;