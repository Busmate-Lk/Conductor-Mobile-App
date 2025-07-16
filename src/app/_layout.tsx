import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Authentication" />
        <Stack.Screen name="Journey" />
        <Stack.Screen name="Passenger_Notifications" />
        <Stack.Screen name="Notification" />
        <Stack.Screen name="Insights" />
        <Stack.Screen name="profile" />
      </Stack>
    </AuthProvider>
  );
}