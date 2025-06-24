import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function TicketLayout() {
  const router = useRouter();
  
  // Custom back button for returning to the previous screen
  const BackButton = () => (
    <TouchableOpacity 
      onPress={() => router.back()}
      style={{ marginLeft: 8, marginRight: 8 }}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0066FF', // Blue header to match your app's design
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "Tickets",
        }}
      />
      
      <Stack.Screen 
        name="ticketDetails" 
        options={{
          title: "Ticket Details",
          presentation: 'card',
        }}
      />
      
      <Stack.Screen 
        name="qrScanner" 
        options={{
          title: "Scan Ticket",
          headerShown: true, // Hide header for scanner
          presentation: 'fullScreenModal',
        }}
      />
      
      <Stack.Screen 
        name="scanHistory" 
        options={{
          title: "Scan History",
          presentation: 'card',
        }}
      />
      
      <Stack.Screen 
        name="validateTicket" 
        options={{
          title: "Validate Ticket",
          presentation: 'card',
        }}
      />
      
      <Stack.Screen 
        name="issueTicket" 
        options={{
          title: "Issue New Ticket",
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}