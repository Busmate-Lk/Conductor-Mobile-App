import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Back button to return to the profile tab
  const BackButton = () => (
    <TouchableOpacity 
      onPress={() => router.push('/(tabs)/profile')}
      style={{ marginLeft: 8 }}
    >
      <Ionicons 
        name="arrow-back" 
        size={24} 
        color="white" 
      />
    </TouchableOpacity>
  );
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0066FF', // Blue header that matches your app's theme
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        headerLeft: () => <BackButton />,
      }}
    >
      {/* Edit Profile Screen */}
      <Stack.Screen 
        name="edit_profile" 
        options={{
          title: "Edit Profile",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      />
      
      {/* Change Password Screen */}
      <Stack.Screen 
        name="change_password" 
        options={{
          title: "Change Password",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      />
      
      {/* Settings Screen */}
      <Stack.Screen 
        name="settings" 
        options={{
          title: "Settings",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      />
      
      {/* Preferences Screen */}
      <Stack.Screen 
        name="preferences" 
        options={{
          title: "Preferences",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      />
      
      {/* Support Screen */}
      <Stack.Screen 
        name="support" 
        options={{
          title: "Help & Support",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      />
    </Stack>
  );
}