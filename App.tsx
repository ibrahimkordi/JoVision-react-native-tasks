import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import CameraScreen from './Project1/CameraScreen';
import SensorsScreen from './Project1/SensorsScreen';
import GalleryScreen from './Project1/GalleryScreen';
import MediaViewerScreen from './Project1/MediaViewerScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2980b9',
          headerTitleAlign: 'center',
        }}
      >
        <Tab.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera API' }} />
        <Tab.Screen name="Sensors" component={SensorsScreen} options={{ title: 'Sensors API' }} />
        <Tab.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Gallery' }} />
        
        {/* إخفاء شاشة العرض المتقدمة برمجياً من شريط التنقل السفلي */}
        <Tab.Screen 
          name="MediaViewer" 
          component={MediaViewerScreen} 
          options={{
            tabBarButton: function() { return null; }, // إخفاء الزر كلياً
            title: 'Media Viewer'
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}