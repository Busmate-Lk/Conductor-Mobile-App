import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TicketsScreen() {
  const [fromLocation, setFromLocation] = useState('Colombo');
  const [toLocation, setToLocation] = useState('Kandy');
  const [passengerCount, setPassengerCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('+94 77 123 4567');
  const [totalFare, setTotalFare] = useState(12.50);
  const [farePerPassenger, setFarePerPassenger] = useState(0.00);

  const decrementPassengers = () => {
    if (passengerCount > 1) {
      setPassengerCount(passengerCount - 1);
    }
  };

  const incrementPassengers = () => {
    setPassengerCount(passengerCount + 1);
  };

  const issueTicket = () => {
    // Implement ticket issuing functionality
    console.log('Issuing ticket for', passengerCount, 'passengers from', fromLocation, 'to', toLocation);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
        onPress={() => { router.push('/(tabs)/home'); }}
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
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{fromLocation}</Text>
            <Ionicons name="chevron-down" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* To Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>To</Text>
          <TouchableOpacity style={styles.dropdown}>
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
          <Text style={styles.farePerPassenger}>Fare per passenger: Rs. {farePerPassenger.toFixed(2)}</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     backgroundColor: '#22C55E',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  qrButton: {
    padding: 4,
  },
  container: {
    flex: 1,
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
    backgroundColor: '#22C55E',
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
});