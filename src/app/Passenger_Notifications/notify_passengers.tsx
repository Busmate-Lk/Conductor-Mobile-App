
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Alert, 
  TextInput
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NotifyPassengersScreen() {
  const [tripInfo, setTripInfo] = useState({
    from: "Kandy",
    to: "Colombo",
    time: "8:30 AM"
  });
  
  const [recentAlerts, setRecentAlerts] = useState([
    { message: "Trip has started. Please be at your pickup point.", time: "2 min ago" },
    { message: "Bus will reach your stop in 10 minutes. Be ready.", time: "15 min ago" }
  ]);

  // State for custom message input
  const [customMessage, setCustomMessage] = useState('');

  // Template messages
  const notificationTemplates = [
    {
      id: 'trip-started',
      title: 'Trip Started',
      message: 'Trip has started. Please be at your pickup point.',
      icon: 'bus',
      iconType: 'ionicons',
      bgColor: '#EEF3FF',
      iconColor: '#0066FF'
    },
    {
      id: 'break-time',
      title: 'Break Time',
      message: 'Bus is taking a break. Nearby rest stop available.',
      icon: 'fast-food-outline',
      iconType: 'ionicons',
      bgColor: '#FFEDE6',
      iconColor: '#FF6A33'
    },
    {
      id: '10-min-away',
      title: '10 Minutes Away',
      message: 'Bus will reach your stop in 10 minutes. Be ready.',
      icon: 'time',
      iconType: 'ionicons',
      bgColor: '#FFFBE6',
      iconColor: '#F5C518'
    },
    {
      id: 'arriving-soon',
      title: 'Arriving Soon',
      message: 'Bus arriving shortly. Please come to the pickup point.',
      icon: 'location',
      iconType: 'ionicons',
      bgColor: '#E6FFF0',
      iconColor: '#00CC66'
    },
    {
      id: 'trip-completed',
      title: 'Trip Completed',
      message: 'Trip completed. Thank you for riding with Busmate LK!',
      icon: 'checkmark',
      iconType: 'ionicons',
      bgColor: '#E6FFF0',
      iconColor: '#00CC66'
    },
    {
      id: 'delayed',
      title: 'Delayed',
      message: 'Bus delayed due to traffic. We appreciate your patience.',
      icon: 'warning',
      iconType: 'ionicons',
      bgColor: '#FFE6E6',
      iconColor: '#FF3B30'
    },
    {
      id: 'route-changed',
      title: 'Route Changed',
      message: 'Route has changed slightly due to roadworks.',
      icon: 'map',
      iconType: 'material',
      bgColor: '#F5E6FF',
      iconColor: '#8E44AD'
    }
  ];

  type NotificationTemplate = {
    id: string;
    title: string;
    message: string;
    icon: string;
    iconType: string;
    bgColor: string;
    iconColor: string;
  };

  const handleSendNotification = (template: NotificationTemplate) => {
    // In a real app, this would send the notification to passengers
    console.log(`Sending notification: ${template.title}`);
    
    // Add to recent alerts
    const newAlert = {
      message: template.message,
      time: "Just now"
    };
    
    setRecentAlerts([newAlert, ...recentAlerts]);
    
    // Show confirmation
    Alert.alert(
      "Notification Sent",
      `Your "${template.title}" message has been sent to all passengers.`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />
      
      {/* Header */}
      {/* <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>Notify Pre-Booked Passengers</Text>
        <Text style={styles.headerSubtitle}>
        Send quick updates to passengers who booked online
        </Text>
      </View>
      </View> */}
      
      {/* Trip Info Banner */}
      <View style={styles.tripBanner}>
      <Text style={styles.tripText}>
        Trip: {tripInfo.from} to {tripInfo.to} - {tripInfo.time}
      </Text>
      </View>
      
      <ScrollView style={styles.container}>
      {/* Notification Templates */}
      {notificationTemplates.map((template) => (
        <View key={template.id} style={styles.messageCard}>
        <View style={styles.cardLeft}>
          <View style={[styles.iconContainer, { backgroundColor: template.bgColor }]}>
          {template.iconType === 'ionicons' ? (
            <Ionicons name={template.icon as any} size={24} color={template.iconColor} />
          ) : template.iconType === 'material' ? (
            <MaterialIcons name={template.icon as any} size={24} color={template.iconColor} />
          ) : (
            <FontAwesome5 name={template.icon} size={20} color={template.iconColor} />
          )}
          </View>
          <View style={styles.messageContent}>
          <Text style={styles.messageTitle}>{template.title}</Text>
          <Text style={styles.messageText}>{template.message}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={() => handleSendNotification(template)}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        </View>
      ))}
      
      {/* Recent Alerts Section */}
      <Text style={styles.sectionTitle}>Recent Alerts Sent</Text>
      
      {recentAlerts.map((alert, index) => (
        <View key={index} style={styles.alertItem}>
        <Text style={styles.alertMessage}>{alert.message}</Text>
        <Text style={styles.alertTime}>{alert.time}</Text>
        </View>
      ))}
      
      {/* Add bottom padding for scrolling */}
      <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Custom Message Text Field and Button */}
      <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Send Custom Message</Text>
      <View style={{ backgroundColor: '#F5F7FA', borderRadius: 8, marginBottom: 8 }}>
        <TextInput
        style={{
          minHeight: 60,
          maxHeight: 120,
          padding: 12,
          fontSize: 15,
          backgroundColor: '#F5F7FA',
          borderRadius: 8,
          textAlignVertical: 'top',
        }}
        placeholder="Type your message here..."
        multiline
        value={customMessage}
        onChangeText={setCustomMessage}
        />
      </View>
      <TouchableOpacity
        style={[
        styles.customMessageButton,
        { backgroundColor: customMessage.trim() ? '#22C55E' : '#A7F3D0' }
        ]}
        disabled={!customMessage.trim()}
        onPress={() => {
        if (customMessage.trim()) {
          handleSendNotification({
          id: 'custom',
          title: 'Custom Message',
          message: customMessage,
          icon: 'chatbubble-ellipses-outline',
          iconType: 'ionicons',
          bgColor: '#E6F7FF',
          iconColor: '#22C55E'
          });
          setCustomMessage('');
        }
        }}
      >
        <Text style={styles.customMessageButtonText}>Send Custom Message</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  tripBanner: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0052CC',
  },
  tripText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  messageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#666666',
  },
  sendButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 16,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 16,
  },
  alertItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  alertMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  customMessageButton: {
    position: 'relative',
    bottom: 16,
    // left: 16,
    // right: 16,
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  customMessageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});