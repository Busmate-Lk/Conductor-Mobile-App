import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SeatViewScreen() {
  const [activeTab, setActiveTab] = useState('seatView');
  
  // Seat status data
  // 0 = Available, 1 = Booked & Validated, 2 = Booked Not Validated, 3 = Blocked/Canceled
  const seatData: { [key: string]: number } = {
    'A1': 1, 'A2': 2, 'A3': 0, 'A4': 1, 'A5': 0,
    'B1': 1, 'B2': 1, 'B3': 2, 'B4': 0, 'B5': 1,
    'C1': 3, 'C2': 1, 'C3': 1, 'C4': 2, 'C5': 0,
    'D1': 1, 'D2': 0, 'D3': 1, 'D4': 1, 'D5': 2,
    'E1': 2, 'E2': 1, 'E3': 0, 'E4': 0, 'E5': 1,
    'F1': 1, 'F2': 1, 'F3': 2, 'F4': 1, 'F5': 0,
    'G1': 0, 'G2': 1, 'G3': 1, 'G4': 2, 'G5': 1,
    'H1': 1, 'H2': 0, 'H3': 0, 'H4': 1, 'H5': 1,
    'I1': 2, 'I2': 1, 'I3': 1, 'I4': 0, 'I5': 1,
    'J1': 1, 'J2': 1, 'J3': 2, 'J4': 1, 'J5': 0,
    'K1': 1, 'K2': 0, 'K3': 2, 'K4': 1, 'K5': 0,
  };
  
  // Trip data for passenger list
  const tripData = {
    id: 'BR-2024-001',
    route: {
      from: 'Colombo',
      to: 'Kandy'
    },
    totalPassengers: 32,
    validatedPassengers: 28,
    pendingPassengers: 4
  };
  
  // Passenger data
  type Passenger = {
    id: string;
    name: string;
    mobile: string;
    seat: string;
    isValidated: boolean;
  };

  const passengers: Passenger[] = [
    {
      id: '1',
      name: 'Kamal Perera',
      mobile: '+94 77 123 4567',
      seat: 'A12',
      isValidated: true
    },
    {
      id: '2',
      name: 'Nimal Silva',
      mobile: '+94 71 987 6543',
      seat: 'B05',
      isValidated: false
    },
    {
      id: '3',
      name: 'Saman Fernando',
      mobile: '+94 76 555 1234',
      seat: 'C08',
      isValidated: true
    },
    {
      id: '4',
      name: 'Ruwan Jayasinghe',
      mobile: '+94 78 999 8888',
      seat: 'D15',
      isValidated: false
    },
    {
      id: '5',
      name: 'Chamara Wickramasinghe',
      mobile: '+94 75 444 3333',
      seat: 'E22',
      isValidated: true
    },
    {
      id: '6',
      name: 'Priyanka Rathnayake',
      mobile: '+94 72 666 7777',
      seat: 'F01',
      isValidated: true
    }
  ];
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const cols = [1, 2, 3, 4, 5];
  
  // Function to get style for a seat based on its status
  const getSeatStyle = (status: number) => {
    switch(status) {
      case 1: // Booked & Validated
        return styles.seatBookedValidated;
      case 2: // Booked Not Validated
        return styles.seatBookedNotValidated;
      case 3: // Blocked/Canceled
        return styles.seatBlocked;
      default: // Available
        return styles.seatAvailable;
    }
  };
  
  // Function to handle seat press
  const handleSeatPress = (seatId: string) => {
    console.log(`Seat ${seatId} pressed`);
    // Additional logic for seat selection
  };
  
  // Function to render a seat
  const renderSeat = (row: string, col: number) => {
    const seatId = `${row}${col}`;
    const seatStatus = seatData[seatId] || 0;
    
    return (
      <TouchableOpacity
        key={seatId}
        style={[styles.seat, getSeatStyle(seatStatus)]}
        onPress={() => handleSeatPress(seatId)}
      >
        <Text style={styles.seatText}>{seatId}</Text>
      </TouchableOpacity>
    );
  };
  
  // Function to render a row of seats
  const renderRow = (row: string) => {
    return (
      <View key={row} style={styles.seatRow}>
        {cols.map(col => {
          // Create gap in the middle (aisle)
          if (col === 3) {
            return (
              <React.Fragment key={`gap-${row}-${col}`}>
                <View style={styles.aisle} />
                {renderSeat(row, col)}
              </React.Fragment>
            );
          }
          return renderSeat(row, col);
        })}
      </View>
    );
  };
  
  // Filter passengers based on search query
  const filteredPassengers = passengers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mobile.includes(searchQuery) ||
      p.seat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render a passenger item
  const renderPassengerItem = ({ item }: { item: Passenger }) => (
    <TouchableOpacity 
      style={styles.passengerCard}
      onPress={() => console.log(`View passenger ${item.name}`)}
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
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeTab === 'seatView' ? 'Seat View' : 'Passenger List'}
        </Text>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#333" />
        </TouchableOpacity>
      </View> */}
      
      {/* Tab Toggle */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'seatView' && styles.activeTab]}
          onPress={() => setActiveTab('seatView')}
        >
          <Ionicons name="car-outline" size={18} color={activeTab === 'seatView' ? "#fff" : "#333"} />
          <Text style={[styles.tabText, activeTab === 'seatView' && styles.activeTabText]}>
            Seat View
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'passengerList' && styles.activeTab]}
          onPress={() => setActiveTab('passengerList')}
        >
          <MaterialIcons 
            name="format-list-bulleted" 
            size={18} 
            color={activeTab === 'passengerList' ? "#fff" : "#333"} 
          />
          <Text style={[styles.tabText, activeTab === 'passengerList' && styles.activeTabText]}>
            Passenger List
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Seat View Tab */}
      {activeTab === 'seatView' && (
        <ScrollView style={styles.container}>
          {/* Bus Layout Title */}
            {/* Driver Seat */}
            <View style={{ alignItems: 'flex-end', marginBottom: 8, marginRight: 85 }}>
              <View style={{
              width: 50,
              height: 50,
              borderRadius: 6,
              backgroundColor: '#333',
              justifyContent: 'center',
              alignItems: 'center',
              }}>
              <Ionicons name="person" size={20} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12, marginTop: 2 }}>Driver</Text>
              </View>
            </View>
          
          {/* Seat Layout */}
          <View style={styles.busLayout}>
            {rows.map(row => renderRow(row))}
          </View>
          
          {/* Legend */}
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Legend</Text>
            
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, styles.seatBookedValidated]} />
                <Text style={styles.legendText}>Booked & Validated</Text>
              </View>
              
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, styles.seatBookedNotValidated]} />
                <Text style={styles.legendText}>Booked, Not Validated</Text>
              </View>
            </View>
            
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, styles.seatAvailable]} />
                <Text style={styles.legendText}>Available</Text>
              </View>
              
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, styles.seatBlocked]} />
                <Text style={styles.legendText}>Blocked/Canceled</Text>
              </View>
            </View>
          </View>
          
          {/* Bottom padding for scroll */}
          <View style={{height: 40}} />
        </ScrollView>
      )}
      
      {/* Passenger List Tab */}
      {activeTab === 'passengerList' && (
        <View style={styles.passengerListContainer}>
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
          <Text style={styles.tripIdText}>Trip #{tripData.id}</Text>
          <Text style={styles.passengerCountText}>{tripData.totalPassengers} passengers</Text>
              </View>
            </View>
            
            <View style={styles.tripSummaryRight}>
              <Text style={styles.validatedText}>{tripData.validatedPassengers} Validated</Text>
              <Text style={styles.pendingText}>{tripData.pendingPassengers} Pending</Text>
            </View>
          </View>
          
          {/* Passenger List */}
          <FlatList
            data={filteredPassengers}
            renderItem={({ item }) => (
              <TouchableOpacity 
          style={styles.passengerCard}
          onPress={() => router.push({ pathname: '/Journey/passengerCard', params: { id: item.id } })}
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
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#0066FF',
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  
  // Seat View Styles
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  layoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
  },
  helpButton: {
    position: 'absolute',
    right: 0,
    top: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  busLayout: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  aisle: {
    width: 16,
  },
  seat: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    margin: 4,
  },
  seatAvailable: {
    backgroundColor: '#F5F5F5',
  },
  seatBookedValidated: {
    backgroundColor: '#22C55E',
  },
  seatBookedNotValidated: {
    backgroundColor: '#F5C518',
  },
  seatBlocked: {
    backgroundColor: '#FF3B30',
  },
  seatText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#333',
  },
  legendContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  legendItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColorBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#333',
  },
  
  // Passenger List Styles
  passengerListContainer: {
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
  validatedBadge: {
    marginRight: 12,
  },
  pendingBadge: {
    marginRight: 12,
  },
});