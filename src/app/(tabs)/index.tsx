import QuickActions from '@/components/Home/QuickActions';
import SummaryCard from '@/components/Home/SummaryCard';
import React,{useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { user,fetchEmployeeDetails } = useAuth();

   useEffect(() => {
    if (user && user.id && !user.employeeId) {
      fetchEmployeeDetails();
    }
  }, [user?.id]);
  
  const today = new Date().toLocaleDateString('en-LK', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const [markTime, setMarkTime] = React.useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  
  const insets = useSafeAreaInsets();
  
  // Helper functions
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };
  
  const getFirstName = () => {
    return user?.name.split(' ')[0] || 'Conductor';
  };
  
  const quickActions = [
    {
      label: 'View Schedules',
      icon: 'calendar',
      onPress: () => router.push('/Journey/schedules'),
    },
    {
      label: 'Notify Passengers',
      icon: 'notifications',
      onPress: () => router.push('/Passenger_Notifications/notify_passengers'),
    },
    {
      label: 'Tickets',
      icon: 'receipt-outline',
      onPress: () => router.push('/(tabs)/tickets'),
    },
    {
      label: 'Analytics',
      icon: 'bar-chart-outline',
      onPress: () => router.push('/Insights/insights'),
    },
  ];

  const summarycard = [
    {
      icon: <Ionicons name="people" size={24} color="#0066FF" />,
      value: '48',
      label: 'Passengers',
      backgroundColor: '#e6efff',
    },
    {
      icon: <FontAwesome5 name="money-bill-wave" size={20} color="#00CC66" />,
      value: '12,500',
      label: 'Collected',
      backgroundColor: '#e6fff2',
    },
    {
      icon: <MaterialCommunityIcons name="ticket-outline" size={24} color="#FFCC00" />,
      value: '48',
      label: 'Tickets',
      backgroundColor: '#fff8e6',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f8f9fa" />
      
      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="bus" size={16} color="white" />
          </View>
          <Text style={styles.logoText}>Busmate LK</Text>
          <View style={styles.roleIndicator}>
            <Text style={styles.roleText}>Conductor</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => { router.push('/Notification/conductor_notification'); }}
          >
            <Ionicons name="notifications-outline" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { router.push('/(tabs)/profile'); }}
          >
            <Image 
              source={require('@/assets/images/profile-pic.jpg')} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>
            {`Good ${getGreeting()}, ${getFirstName()} `}<Text>👋</Text>
          </Text>
          <Text style={styles.dateText}>{today}</Text>
        </View>

        {/* Today's Shift Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Shift</Text>
          <Text style={styles.nameText}>Conductor: {user?.name}</Text>
          <Text style={styles.infoText}>ID: {user?.employeeId || user?.id}</Text>
          <Text style={styles.infoText}>
            Date: {new Date().toLocaleDateString('en-LK', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
          
          <TouchableOpacity 
            style={styles.shiftButton}
            onPress={() => {
              // Handle shift start
              // router.push('/active-shift');
            }}
          >
            <Ionicons name="time-outline" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Start Shift @ {markTime}</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quick Actions Section */}
        <QuickActions actions={quickActions} />
        
        {/* Today's Assignment */}
        <Text style={styles.sectionTitle}>Today's Assignment</Text>
        <View style={styles.assignmentCard}>
          <Text style={styles.routeText}>Route: {user?.route || 'Colombo - Kandy'}</Text>
          <Text style={styles.busIdText}>Bus ID: {user?.busId || 'NB-2845'}</Text>
          <Text style={styles.departureText}>Departure: 9:30 AM</Text>
          
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => { router.push('/(tabs)/journey'); }}
          >
            <Text style={styles.viewDetailsText}>Tap to View Trip Details</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        {/* Today's Summary */}
        <View style={styles.summaryContainer}>
          {summarycard.map((item, idx) => (
            <SummaryCard
              key={idx}
              icon={item.icon}
              value={item.value}
              label={item.label}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </View>       
        
        {/* Add padding at the bottom for better scrolling experience */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#0066FF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scrollContent: {
    flex: 1,
    marginTop: 70,
  },
  scrollContentContainer: {
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    backgroundColor: '#0066FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  roleIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  roleText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 16,
    color: 'white',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
  },
  greetingSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  assignmentCard: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  routeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  busIdText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 4,
  },
  departureText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 16,
  },
  viewDetailsButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#0066FF',
    fontWeight: '500',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  shiftButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  buttonIcon: {
    marginRight: 8,
  },
});