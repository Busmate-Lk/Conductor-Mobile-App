import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  FlatList
} from 'react-native';
import ScheduleCard, { Schedule } from '@/components/Journey/ScheduleCard';
import { Ionicons } from '@expo/vector-icons';

export default function SchedulesScreen() {
  const [activeTab, setActiveTab] = useState('today');
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  
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
    setActiveTab(tab);
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
      
      {/* Schedule List - Now uses the ScheduleCard component */}
      {filteredSchedules.length > 0 ? (
        <FlatList
          data={filteredSchedules}
          renderItem={({item}) => <ScheduleCard item={item} />}
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

// Simplified styles - only what's needed for the main layout
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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