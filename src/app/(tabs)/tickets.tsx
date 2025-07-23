import { useTicket } from '@/contexts/TicketContext';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function TicketsScreen() {
  const { setTicketData } = useTicket();
  // Dummy stops data
  const stopsList = [
    { id: 1, name: 'Matara', km: 0 },
    { id: 2, name: 'Weligama', km: 15 },
    { id: 3, name: 'Mirissa', km: 25 },
    { id: 4, name: 'Galle', km: 45 },
    { id: 5, name: 'Hikkaduwa', km: 65 },
    { id: 6, name: 'Ambalangoda', km: 75 },
    { id: 7, name: 'Bentota', km: 90 },
    { id: 8, name: 'Kalutara', km: 110 },
    { id: 9, name: 'Panadura', km: 125 },
    { id: 10, name: 'Moratuwa', km: 140 },
    { id: 11, name: 'Dehiwala', km: 150 },
    { id: 12, name: 'Colombo', km: 160 }
  ];

  // Base fare per km
  const farePerKm = 2.5;

  const [fromLocation, setFromLocation] = useState('Matara');
  const [toLocation, setToLocation] = useState('Colombo');
  const [passengerCount, setPassengerCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('+94 77 123 4567');
  const [totalFare, setTotalFare] = useState(400.00); // Matara to Colombo fare
  const [farePerPassenger, setFarePerPassenger] = useState(400.00);

  // Dropdown states
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromSearchText, setFromSearchText] = useState('');
  const [toSearchText, setToSearchText] = useState('');

  // Filter stops based on search text
  const getFilteredStops = (searchText: string) => {
    if (searchText.trim() === '') return stopsList;
    return stopsList.filter(stop => 
      stop.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // Calculate fare based on distance and passenger count
  const calculateFare = (from: string, to: string, passengers: number) => {
    const fromStop = stopsList.find(stop => stop.name === from);
    const toStop = stopsList.find(stop => stop.name === to);
    
    if (!fromStop || !toStop) {
      return { totalFare: 0, farePerPassenger: 0 };
    }
    
    const distance = Math.abs(toStop.km - fromStop.km);
    const farePerPassenger = Math.max(distance * farePerKm, 10); // Minimum fare Rs. 10
    const totalFare = farePerPassenger * passengers;
    
    return { totalFare, farePerPassenger };
  };

  // Update fare whenever locations or passenger count changes
  const updateFare = (from: string, to: string, passengers: number) => {
    const { totalFare: newTotalFare, farePerPassenger: newFarePerPassenger } = calculateFare(from, to, passengers);
    setTotalFare(newTotalFare);
    setFarePerPassenger(newFarePerPassenger);
  };

  const selectFromLocation = (stopName: string) => {
    setFromLocation(stopName);
    setShowFromDropdown(false);
    setFromSearchText('');
    updateFare(stopName, toLocation, passengerCount);
  };

  const selectToLocation = (stopName: string) => {
    setToLocation(stopName);
    setShowToDropdown(false);
    setToSearchText('');
    updateFare(fromLocation, stopName, passengerCount);
  };

  const decrementPassengers = () => {
    if (passengerCount > 1) {
      const newCount = passengerCount - 1;
      setPassengerCount(newCount);
      updateFare(fromLocation, toLocation, newCount);
    }
  };

  const incrementPassengers = () => {
    const newCount = passengerCount + 1;
    setPassengerCount(newCount);
    updateFare(fromLocation, toLocation, newCount);
  };

  const issueTicket = () => {
    // Generate ticket ID
    const ticketId = `TK-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create ticket data object
    const ticketData = {
      id: ticketId,
      from: fromLocation,
      to: toLocation,
      platform: 'Platform 1', // You can make this dynamic based on your logic
      gate: 'Gate A', // You can make this dynamic based on your logic
      passengers: `${passengerCount} ${passengerCount === 1 ? 'Adult' : 'Adults'}`,
      fare: `Rs. ${totalFare.toFixed(2)}`,
      issuedOn: `${currentDate} - ${currentTime}`,
      phoneNumber: phoneNumber || '+94 77 123 4567'
    };

    // Store ticket data using context
    setTicketData(ticketData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="light-content" 
        translucent={false}
        backgroundColor="#0066FF" 
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => { router.push('/'); }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Virtual Ticketing Machine</Text>
        <TouchableOpacity style={styles.qrButton}
         onPress={() => { router.push('/Ticket/qrScanner'); }}
        >
          <MaterialIcons name="qr-code-scanner" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* From Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>From</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowFromDropdown(true)}
          >
            <Text style={styles.dropdownText}>{fromLocation}</Text>
            <Ionicons name="chevron-down" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* To Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>To</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowToDropdown(true)}
          >
            <Text style={styles.dropdownText}>{toLocation}</Text>
            <Ionicons name="chevron-down" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Passenger Count */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Passengers</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={decrementPassengers}
            >
              <Text style={styles.counterButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{passengerCount}</Text>
            <TouchableOpacity 
              style={[styles.counterButton, styles.incrementButton]} 
              onPress={incrementPassengers}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fare Display */}
        <View style={styles.fareContainer}>
          <Text style={styles.fareLabel}>Total Fare</Text>
          <Text style={styles.fareAmount}>Rs. {totalFare.toFixed(2)}</Text>
          <Text style={styles.farePerPassenger}>
            Fare per passenger: Rs. {farePerPassenger.toFixed(2)}
          </Text>
          <Text style={styles.journeyInfo}>
            {fromLocation} → {toLocation} • {passengerCount} passenger{passengerCount > 1 ? 's' : ''}
          </Text>
        </View>

        {/* Phone Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Passenger Phone Number (Optional)</Text>
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
            <Ionicons name="call-outline" size={24} color="#999" style={styles.phoneIcon} />
          </View>
        </View>

        {/* Issue Ticket Button */}
        <TouchableOpacity
          style={styles.issueButton}
          onPress={() => {
            issueTicket();
            router.push('/Ticket/ticketPrintingpage');
          }}
        >
          <FontAwesome5 name="ticket-alt" size={20} color="white" style={styles.ticketIcon} />
          <Text style={styles.issueButtonText}>Issue Ticket</Text>
        </TouchableOpacity>
      </View>

      {/* From Location Modal */}
      <Modal
        visible={showFromDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFromDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select From Location</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFromDropdown(false)}
              >
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search stops..."
                placeholderTextColor="#999"
                value={fromSearchText}
                onChangeText={setFromSearchText}
              />
            </View>
            
            <FlatList
              data={getFilteredStops(fromSearchText)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stopItem}
                  onPress={() => selectFromLocation(item.name)}
                >
                  <View style={styles.stopInfo}>
                    <Text style={styles.stopName}>{item.name}</Text>
                    <Text style={styles.stopDistance}>KM {item.km}</Text>
                  </View>
                  {/* <Ionicons name="chevron-forward" size={20} color="#999" /> */}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* To Location Modal */}
      <Modal
        visible={showToDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowToDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select To Location</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowToDropdown(false)}
              >
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search stops..."
                placeholderTextColor="#999"
                value={toSearchText}
                onChangeText={setToSearchText}
              />
            </View>
            
            <FlatList
              data={getFilteredStops(toSearchText)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stopItem}
                  onPress={() => selectToLocation(item.name)}
                >
                  <View style={styles.stopInfo}>
                    <Text style={styles.stopName}>{item.name}</Text>
                    <Text style={styles.stopDistance}>KM {item.km}</Text>
                  </View>
                  {/* <Ionicons name="chevron-forward" size={20} color="#999" /> */}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0066FF', 
    
    // Changed to match header color
  },
  header: {
    // REMOVED: marginTop: StatusBar.currentHeight, ← This was causing the gap
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
    marginTop: 20, // Added margin to separate from title
  },
  headerTitle: {
    marginTop: 20, // Adjusted to center vertically
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  qrButton: {
    padding: 4,
    marginTop: 20, // Added margin to separate from title
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Added background color for container
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#22C55E',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  dropdown: {
    backgroundColor: '#333333',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  counterContainer: {
    backgroundColor: '#333333',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(150, 150, 150, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: '#22C55E',
  },
  counterButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  counterValue: {
    fontSize: 28,
    color: 'white',
    fontWeight: '500',
  },
  fareContainer: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  fareLabel: {
    color: '#999',
    fontSize: 16,
    marginBottom: 8,
  },
  fareAmount: {
    color: '#0066FF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  farePerPassenger: {
    color: '#999',
    fontSize: 14,
  },
  journeyInfo: {
    color: '#22C55E',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
  phoneInputContainer: {
    backgroundColor: '#333333',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  phoneInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 16,
  },
  phoneIcon: {
    marginLeft: 8,
  },
  issueButton: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  ticketIcon: {
    marginRight: 8,
  },
  issueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#333333',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '67%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalTitle: {
    color: '#22C55E',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    margin: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 12,
  },
  stopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  stopDistance: {
    color: '#999',
    fontSize: 12,
  },
});