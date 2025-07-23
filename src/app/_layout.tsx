import { AuthProvider } from '@/contexts/AuthContext';
import { TicketProvider } from '@/contexts/TicketContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Authentication" />
          <Stack.Screen name="Journey" />
          <Stack.Screen name="Passenger_Notifications" />
          <Stack.Screen name="Notification" />
          <Stack.Screen name="Insights" />
          <Stack.Screen name="profile" />
        </Stack>
      </TicketProvider>
    </AuthProvider>
  );
}