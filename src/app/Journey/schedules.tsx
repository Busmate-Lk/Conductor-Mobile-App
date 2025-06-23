

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  FlatList
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SchedulesScreen() {
  const [activeTab, setActiveTab] = useState('today');
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  
  // Define the type for a schedule item
  type Schedule = {
    id: string;
    from: string;
    to: string;
    busNumber: string;
    startTime: string;
    endTime: string;
    date: string;
    seatsOccupied: number;
    totalSeats: number;
    status: 'ongoing' | 'upcoming' | 'completed';
  };

  // Sample data for schedules
  const schedules: Schedule[] = [
    {
      id: '1',
      from: 'Kandy',
      to: 'Colombo',
      busNumber: 'KD-4578',
      startTime: '06:30 AM',
      endTime: '09:45 AM',
      date: 'Today, Dec 15, 2024',
      seatsOccupied: 48,
      totalSeats: 55,
      status: 'ongoing'
    },
    {
      id: '2',
      from: 'Colombo',
      to: 'Galle',
      busNumber: 'CG-2341',
      startTime: '02:15 PM',
      endTime: '04:30 PM',
      date: 'Today, Dec 15, 2024',
      seatsOccupied: 32,
      totalSeats: 50,
      status: 'upcoming'
    },
    {
      id: '3',
      from: 'Negombo',
      to: 'Kandy',
      busNumber: 'NK-7892',
      startTime: '10:00 AM',
      endTime: '01:15 PM',
      date: 'Yesterday, Dec 14, 2024',
      seatsOccupied: 45,
      totalSeats: 45,
      status: 'completed'
    },
    // Add more sample data for different tabs
    {
      id: '4',
      from: 'Galle',
      to: 'Matara',
      busNumber: 'GM-1234',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      date: 'Tomorrow, Dec 16, 2024',
      seatsOccupied: 15,
      totalSeats: 50,
      status: 'upcoming'
    },
    {
      id: '5',
      from: 'Colombo',
      to: 'Jaffna',
      busNumber: 'CJ-9876',
      startTime: '08:00 AM',
      endTime: '02:30 PM',
      date: 'Dec 17, 2024',
      seatsOccupied: 28,
      totalSeats: 55,
      status: 'upcoming'
    },
    {
      id: '6',
      from: 'Kandy',
      to: 'Batticaloa',
      busNumber: 'KB-5432',
      startTime: '07:45 AM',
      endTime: '12:15 PM',
      date: 'Dec 13, 2024',
      seatsOccupied: 42,
      totalSeats: 45,
      status: 'completed'
    }
  ];

  // Filter schedules based on active tab
  useEffect(() => {
    filterSchedules();
  }, [activeTab]);

  const filterSchedules = () => {
    // Get current date (for comparison)
    const today = new Date().toDateString();
    
    switch(activeTab) {
      case 'today':
        // Show today's schedules (ongoing + upcoming)
        setFilteredSchedules(schedules.filter(item => 
          item.date.includes('Today') || 
          (item.status === 'ongoing' && item.date.includes('Today'))
        ));
        break;
      case 'upcoming':
        // Show upcoming schedules (future dates)
        setFilteredSchedules(schedules.filter(item => 
          item.status === 'upcoming' || 
          item.date.includes('Tomorrow') || 
          (!item.date.includes('Today') && !item.date.includes('Yesterday'))
        ));
        break;
      case 'past':
        // Show completed schedules
        setFilteredSchedules(schedules.filter(item => 
          item.status === 'completed' || 
          item.date.includes('Yesterday')
        ));
        break;
      default:
        setFilteredSchedules(schedules);
    }
  };

  // Handle tab press with animation
  const handleTabPress = (tab: string) => {
    // Add a simple animation here if desired
    setActiveTab(tab);
  };

  // Rest of your component remains the same
  // Render schedule card based on status
  const renderScheduleCard = (item: Schedule) => {
    return (
      <View style={styles.scheduleCard}>
        {/* Card content remains the same */}
        {/* Route and Status */}
        <View style={styles.cardHeader}>
          <Text style={styles.routeText}>{item.from} – {item.to}</Text>
          <View style={[
            styles.statusBadge, 
            item.status === 'ongoing' ? styles.ongoingBadge : 
            item.status === 'upcoming' ? styles.upcomingBadge : styles.completedBadge
          ]}>
            <Text style={styles.statusText}>
              {item.status === 'ongoing' ? 'Ongoing' : 
               item.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            </Text>
          </View>
        </View>

        {/* Bus Number */}
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="bus" size={18} color="#0066FF" />
          <Text style={styles.infoText}>Bus #{item.busNumber}</Text>
        </View>

        {/* Time */}
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#777" />
          <Text style={styles.infoText}>{item.startTime} – {item.endTime}</Text>
        </View>

        {/* Date */}
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color="#777" />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>

        {/* Seats */}
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={18} color="#777" />
          <Text style={styles.infoText}>
            {item.seatsOccupied}/{item.totalSeats} seats filled
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {item.status === 'ongoing' && (
            <>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>View Seats</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Trip Details</Text>
              </TouchableOpacity>
            </>
          )}

          {item.status === 'upcoming' && (
            <>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Start Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>View Details</Text>
              </TouchableOpacity>
            </>
          )}

          {item.status === 'completed' && (
            <>
              <TouchableOpacity style={styles.secondaryButton}
               onPress={() => { router.push('/journeyReport'); }}
              >
                <Text style={styles.secondaryButtonText}>View Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}
              onPress={() => { router.push('/tripOverview'); }}
              >
                <Text style={styles.secondaryButtonText}>Trip Summary</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      
      
      {/* Tabs with Animated Indicator */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'today' && styles.activeTab]} 
          onPress={() => handleTabPress('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>Today</Text>
          {activeTab === 'today' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]} 
          onPress={() => handleTabPress('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
          {activeTab === 'upcoming' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]} 
          onPress={() => handleTabPress('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past</Text>
          {activeTab === 'past' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
      
      {/* Schedule List - Now uses filtered schedules */}
      {filteredSchedules.length > 0 ? (
        <FlatList
          data={filteredSchedules}
          renderItem={({item}) => renderScheduleCard(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={60} color="#CCCCCC" />
          <Text style={styles.emptyText}>No schedules found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// Add this to your existing styles
const additionalStyles = {
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 12,
  }
};

// Merge your existing styles with the new ones
const styles = StyleSheet.create({
  // ... your existing styles
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  notificationButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066FF',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0066FF',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#0066FF',
  },
  listContainer: {
    padding: 16,
  },
  scheduleCard: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  ongoingBadge: {
    backgroundColor: '#22C55E',
  },
  upcomingBadge: {
    backgroundColor: '#0066FF',
  },
  completedBadge: {
    backgroundColor: '#999',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 12,
  }
});