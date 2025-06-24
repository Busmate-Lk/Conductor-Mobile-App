import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BusLayout from '../../components/Journey/BusLayout';
import PassengerList from '../../components/Journey/PassengerList';

// Trip data model
interface TripData {
  id: string;
  route: string;
  busNumber: string;
  status: string;
  departure: string;
  arrival: string;
  date: string;
  passengers: number;
  totalAmount: number;
  cashAmount: number;
  bookingAmount: number;
  qrCodeAmount: number;
}

export default function TripDetailsScreen() {
  const [activeTab, setActiveTab] = useState<'seats' | 'passengers'>('seats');
  
  // Sample trip data
  const tripData: TripData = {
    id: 'J12345',
    route: 'Colombo - Kandy',
    busNumber: 'NC-1234',
    status: 'Ongoing',
    departure: '06:30 AM',
    arrival: '09:45 AM',
    date: 'Dec 15, 2024',
    passengers: 48,
    totalAmount: 12350,
    cashAmount: 8200,
    bookingAmount: 2850,
    qrCodeAmount: 1300
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with back button and menu */}
      {/* <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Details</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View> */}

      {/* Tab Toggle */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'seats' && styles.activeTab]}
          onPress={() => setActiveTab('seats')}
        >
          <Ionicons name="car-outline" size={18} color={activeTab === 'seats' ? "#fff" : "#333"} />
          <Text style={[styles.tabText, activeTab === 'seats' && styles.activeTabText]}>
            Seat View
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'passengers' && styles.activeTab]}
          onPress={() => setActiveTab('passengers')}
        >
          <Ionicons 
            name="list" 
            size={18} 
            color={activeTab === 'passengers' ? "#fff" : "#333"} 
          />
          <Text style={[styles.tabText, activeTab === 'passengers' && styles.activeTabText]}>
            Passenger List
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Content Container - Always full height to properly display tabs */}
      <View style={styles.contentContainer}>
        {activeTab === 'seats' ? (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Trip Info Card */}
            <View style={styles.tripCard}>
              <View style={styles.routeContainer}>
                <Text style={styles.routeName}>{tripData.route}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{tripData.status}</Text>
                </View>
              </View>
              
              <Text style={styles.busNumber}>Bus No: {tripData.busNumber}</Text>
              
              <View style={styles.timeContainer}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeLabel}>Departure</Text>
                  <Text style={styles.timeValue}>{tripData.departure}</Text>
                </View>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeLabel}>Arrival</Text>
                  <Text style={styles.timeValue}>{tripData.arrival}</Text>
                </View>
              </View>
              
              <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>Date</Text>
                <Text style={styles.dateValue}>{tripData.date}</Text>
              </View>
            </View>
            
            {/* Stats Card */}
            <View style={styles.statsCard}>
              <View style={styles.statRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Passengers</Text>
                  <View style={styles.statValueWrapper}>
                    <Text style={[styles.statValue, styles.passengerValue]}>
                      {tripData.passengers}
                    </Text>
                    <Ionicons name="people" size={24} color="#0066FF" style={styles.statIcon} />
                  </View>
                </View>
                
                <View style={[styles.statItem, styles.borderLeft]}>
                  <Text style={styles.statLabel}>Amount</Text>
                  <View style={styles.statValueWrapper}>
                    <Text style={[styles.statValue, styles.amountValue]}>
                      Rs. {tripData.totalAmount.toLocaleString()}
                    </Text>
                    <Ionicons name="document-text" size={24} color="#0066FF" style={styles.statIcon} />
                  </View>
                </View>
              </View>
            </View>
            
            {/* Payment Breakdown Card */}
            <View style={styles.paymentCard}>
              <View style={styles.paymentRow}>
                {/* Cash payment */}
                <View style={styles.paymentItem}>
                  <Ionicons name="cash-outline" size={24} color="#22C55E" style={styles.paymentIcon} />
                  <Text style={styles.paymentLabel}>Cash</Text>
                  <Text style={styles.paymentValue}>Rs. {tripData.cashAmount.toLocaleString()}</Text>
                </View>
                
                {/* Booking payment */}
                <View style={styles.paymentItem}>
                  <Ionicons name="calendar" size={24} color="#0066FF" style={styles.paymentIcon} />
                  <Text style={styles.paymentLabel}>Booking</Text>
                  <Text style={styles.paymentValue}>Rs. {tripData.bookingAmount.toLocaleString()}</Text>
                </View>
                
                {/* QR Code payment */}
                <View style={styles.paymentItem}>
                  <Ionicons name="qr-code" size={24} color="#F59E0B" style={styles.paymentIcon} />
                  <Text style={styles.paymentLabel}>QR Code</Text>
                  <Text style={styles.paymentValue}>Rs. {tripData.qrCodeAmount.toLocaleString()}</Text>
                </View>
              </View>
            </View>
            
            {/* Content Header */}
            <View style={styles.contentHeader}>
              <Text style={styles.contentTitle}>Bus Layout</Text>
              
              {/* Help Button */}
              <TouchableOpacity style={styles.helpButton}>
                <Ionicons name="help-circle" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {/* Bus Layout Component - Safe to include in ScrollView since it's static */}
            <BusLayout />
            
            {/* Extra padding at the bottom */}
            <View style={{height: 30}} />
          </ScrollView>
        ) : (
          /* PassengerList Component - Has its own FlatList, so no ScrollView */
          <PassengerList tripId={tripData.id} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  menuButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  contentContainer: {
    flex: 1, // This ensures the content takes all available space
  },
  scrollContent: {
    paddingBottom: 20, // Add padding at the bottom for better scrolling
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  statusBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  busNumber: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeColumn: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  dateContainer: {
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    color: '#333333',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    padding: 16,
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: '#EEEEEE',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  statValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
  },
  passengerValue: {
    color: '#22C55E',
  },
  amountValue: {
    color: '#22C55E',
  },
  statIcon: {
    marginLeft: 8,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentItem: {
    flex: 1,
    alignItems: 'center',
  },
  paymentIcon: {
    marginBottom: 4,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});