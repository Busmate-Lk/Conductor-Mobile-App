import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Define passenger interface
interface Passenger {
  id: string;
  name: string;
  seat: string;
  mobile: string;
  isValidated: boolean;
}

// Component props
interface PassengerListProps {
  tripId: string;
}

export default function PassengerList({ tripId }: PassengerListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample passenger data (in a real app, you would fetch this based on tripId)
  const passengers: Passenger[] = [
    {
      id: '1',
      name: 'Kamal Perera',
      mobile: '+94 77 123 4567',
      seat: 'A1',
      isValidated: true
    },
    {
      id: '2',
      name: 'Nimal Silva',
      mobile: '+94 71 987 6543',
      seat: 'B3',
      isValidated: false
    },
    {
      id: '3',
      name: 'Saman Fernando',
      mobile: '+94 76 555 1234',
      seat: 'C2',
      isValidated: true
    },
    {
      id: '4',
      name: 'Ruwan Jayasinghe',
      mobile: '+94 78 999 8888',
      seat: 'D5',
      isValidated: false
    },
    {
      id: '5',
      name: 'Chamara Wickramasinghe',
      mobile: '+94 75 444 3333',
      seat: 'E2',
      isValidated: true
    },
    {
      id: '6',
      name: 'Priyanka Rathnayake',
      mobile: '+94 72 666 7777',
      seat: 'F1',
      isValidated: true
    },
     {
      id: '7',
      name: 'Malith Rathnayake',
      mobile: '+94 72 666 1111',
      seat: 'F2',
      isValidated: true
    }
  ];

  // Filter passengers based on search query
  const filteredPassengers = passengers.filter(passenger => {
    const query = searchQuery.toLowerCase();
    return (
      passenger.name.toLowerCase().includes(query) ||
      passenger.seat.toLowerCase().includes(query) ||
      passenger.mobile.includes(query)
    );
  });

  // Trip summary data
  const tripSummary = {
    id: tripId,
    totalPassengers: passengers.length,
    validatedPassengers: passengers.filter(p => p.isValidated).length,
    pendingPassengers: passengers.filter(p => !p.isValidated).length
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search passengers..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {/* Trip Summary */}
      <View style={styles.tripSummaryCard}>
        <View style={styles.tripSummaryLeft}>
          <View style={styles.busIconContainer}>
            <Ionicons name="bus" size={24} color="#0066FF" />
          </View>
          <View>
            <Text style={styles.tripIdText}>Trip #{tripSummary.id}</Text>
            <Text style={styles.passengerCountText}>{tripSummary.totalPassengers} passengers</Text>
          </View>
        </View>
        
        <View style={styles.tripSummaryRight}>
          <Text style={styles.validatedText}>{tripSummary.validatedPassengers} Validated</Text>
          <Text style={styles.pendingText}>{tripSummary.pendingPassengers} Pending</Text>
        </View>
      </View>
      
      {/* Passenger List */}
      <FlatList
        data={filteredPassengers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.passengerCard}
            onPress={() => {
              try {
                router.push({
                  pathname: '/Journey/passengerCard', 
                  params: { id: item.id, tripId }
                });
              } catch (error) {
                console.error("Navigation error:", error);
                // Fallback navigation if passengerCard doesn't exist
                router.push('/Journey/seatView');
              }
            }}
          >
            <View style={styles.passengerInfo}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#666" />
              </View>
              
              <View style={styles.passengerDetails}>
                <Text style={styles.passengerName}>{item.name}</Text>
                <Text style={styles.passengerMobile}>Mobile: {item.mobile}</Text>
              </View>
            </View>
            
            <View style={styles.passengerActions}>
              <View style={styles.seatBadge}>
                <Text style={styles.seatText}>{item.seat}</Text>
              </View>
              
              {item.isValidated ? (
                <View style={styles.validatedBadge}>
                  <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                </View>
              ) : (
                <View style={styles.pendingBadge}>
                  <Ionicons name="close-circle" size={24} color="#FF3B30" />
                </View>
              )}
              
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No passengers found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 24,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  tripSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tripSummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tripIdText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  passengerCountText: {
    fontSize: 14,
    color: '#666',
  },
  tripSummaryRight: {
    alignItems: 'flex-end',
  },
  validatedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
    marginBottom: 2,
  },
  pendingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  passengerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  passengerDetails: {
    flex: 1,
    
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  passengerMobile: {
    fontSize: 14,
    color: '#666',
  },
  passengerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatBadge: {
    backgroundColor: '#0066FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  seatText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
  validatedBadge: {
    marginRight: 12,
  },
  pendingBadge: {
    marginRight: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});