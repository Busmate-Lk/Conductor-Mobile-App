import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PassengerDetailsScreen() {
  // This could come from route params in a real app
  const passengerData = {
    name: 'Kamal Perera',
    isValidated: true,
    ticket: {
      seatNumber: 'A-12',
      ticketId: '#TK2024001234',
      paymentType: 'QR Payment',
      passengerCount: 1,
      fare: 450.00,
    },
    contact: {
      phone: '+94 77 123 4567',
    },
    booking: {
      bookingTime: '2024-01-15 08:30 AM',
      arrivalTime: '2024-01-15 09:15 AM',
    },
    validation: {
      status: 'Ticket has been validated',
      timestamp: '2024-01-15 09:16 AM',
    }
  };

  const handleRevalidate = () => {
    console.log('Revalidating ticket...');
    // Implementation for revalidation
  };

  const handleShare = () => {
    console.log('Sharing passenger details...');
    // Implementation for sharing
  };

  const handleMessage = () => {
    console.log('Sending message to passenger...');
    // Implementation for messaging
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Passenger Details</Text>
        <View style={styles.placeholder} />
      </View> */}

      <ScrollView style={styles.container}>
        {/* Passenger Basic Info Card */}
        <View style={styles.passengerInfoCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color="white" />
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.passengerName}>{passengerData.name}</Text>
            {passengerData.isValidated && (
              <View style={styles.validatedBadge}>
                <Ionicons name="checkmark" size={14} color="white" />
                <Text style={styles.validatedText}>Validated</Text>
              </View>
            )}
          </View>
        </View>

        {/* Ticket Information Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="confirmation-number" size={22} color="#0066FF" />
            <Text style={styles.sectionTitle}>Ticket Information</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <MaterialIcons name="event-seat" size={20} color="#666" />
              <Text style={styles.labelText}>Seat Number</Text>
            </View>
            <Text style={styles.infoValue}>{passengerData.ticket.seatNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <MaterialIcons name="credit-card" size={20} color="#666" />
              <Text style={styles.labelText}>Ticket ID</Text>
            </View>
            <Text style={styles.infoValue}>{passengerData.ticket.ticketId}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <MaterialIcons name="payment" size={20} color="#666" />
              <Text style={styles.labelText}>Payment Type</Text>
            </View>
            <View style={styles.paymentTypeBadge}>
              <Text style={styles.paymentTypeText}>{passengerData.ticket.paymentType}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <Ionicons name="people" size={20} color="#666" />
              <Text style={styles.labelText}>Passengers</Text>
            </View>
            <Text style={styles.infoValue}>{passengerData.ticket.passengerCount}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <MaterialIcons name="attach-money" size={20} color="#666" />
              <Text style={styles.labelText}>Fare Paid</Text>
            </View>
            <Text style={styles.infoValue}>Rs. {passengerData.ticket.fare.toFixed(2)}</Text>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="contact-phone" size={22} color="#0066FF" />
            <Text style={styles.sectionTitle}>Contact Information</Text>
          </View>

          <View style={styles.contactRow}>
            <View style={styles.infoLabel}>
              <MaterialIcons name="phone" size={20} color="#666" />
              <Text style={styles.labelText}>Phone Number</Text>
            </View>
            <View style={styles.phoneContainer}>
              <Text style={styles.infoValue}>{passengerData.contact.phone}</Text>
              <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
                <MaterialIcons name="chat" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="schedule" size={22} color="#0066FF" />
            <Text style={styles.sectionTitle}>Booking Details</Text>
          </View>

          <View style={styles.bookingRow}>
            <Text style={styles.bookingLabel}>Booking Time</Text>
            <Text style={styles.bookingValue}>{passengerData.booking.bookingTime}</Text>
          </View>

          <View style={styles.bookingRow}>
            <Text style={styles.bookingLabel}>Arrival Time</Text>
            <Text style={styles.bookingValue}>{passengerData.booking.arrivalTime}</Text>
          </View>
        </View>

        {/* Validation Status */}
        <View style={styles.sectionCard}>
          <View style={styles.validationHeader}>
            <Text style={styles.validationTitle}>Validation Status</Text>
            <View style={styles.validationStatusIcon}>
              <Ionicons name="checkmark" size={24} color="white" />
            </View>
          </View>
          <Text style={styles.validationStatusText}>{passengerData.validation.status}</Text>
          <Text style={styles.validationTime}>Validated on: {passengerData.validation.timestamp}</Text>
        </View>

        {/* Extra space at the bottom for scrolling */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.revalidateButton} onPress={handleRevalidate}>
          <Ionicons name="checkmark-circle-outline" size={20} color="white" />
          <Text style={styles.revalidateText}>Re-validate Ticket</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
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
  placeholder: {
    width: 28, // To keep header centered
  },
  container: {
    flex: 1,
    padding: 16,
  },
  passengerInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  nameContainer: {
    flex: 1,
  },
  passengerName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  validatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  validatedText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 3,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066FF',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  paymentTypeBadge: {
    backgroundColor: '#EEF3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  paymentTypeText: {
    fontSize: 14,
    color: '#0066FF',
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  bookingLabel: {
    fontSize: 15,
    color: '#666',
  },
  bookingValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  validationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  validationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  validationStatusIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validationStatusText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },
  validationTime: {
    fontSize: 14,
    color: '#666',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginBottom: 35,
  },
  revalidateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  revalidateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});