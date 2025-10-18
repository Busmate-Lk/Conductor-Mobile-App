import { formatDate, formatTime } from '@/hooks/employee/useNextTrip';
import { useOngoingTrip } from '@/hooks/employee/useOngoingTrip';
import { useSeatView } from '@/hooks/Journey/useSeatView';
import { EmployeeSchedule } from '@/types/employee';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

// Component for ongoing trip view
function OngoingTripView({ trip }: { trip: EmployeeSchedule }) {
  const { endTrip, endingTrip } = useOngoingTrip();
  const { stats, tripData } = useSeatView();
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  // Handle end trip
  const handleEndTrip = async () => {
    setShowEndModal(false);
    const success = await endTrip(trip.id);
    
    if (success) {
      Alert.alert('Success', 'Trip ended successfully!', [
        {
          text: 'OK',
          onPress: () => {
            
          }
        }
      ]);
    } else {
      Alert.alert('Error', 'Failed to end trip. Please try again.');
    }
  };

 
  const showEndTripConfirmation = () => {
    setShowEndModal(true);
  };
  
  return (
    <>
      {/* Journey Card */}
      <View style={styles.journeyCard}>
        {/* Route Information - using real trip data */}
        <View style={styles.routeContainer}>
          <Text style={styles.routeText}>
            {trip.fromLocation && trip.toLocation 
              ? `${trip.fromLocation} → ${trip.toLocation}` 
              : trip.route || 'Route Information'}
          </Text>
          
          <View style={styles.busNumberContainer}>
            <Text style={styles.busNumberText}>{trip.busPlateNumber || 'Data not found'}</Text>
          </View>
        </View>
        
        {/* Time Information - using real trip data */}
        <View style={styles.timeContainer}>
          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>Departure</Text>
            <Text style={styles.timeValue}>{formatTime(trip.startTime)}</Text>
            <Text style={styles.expectedTime}>
              {trip.fromLocation || trip.route?.split(' - ')[0] || 'Start'}
            </Text>
          </View>
          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>Arrival</Text>
            <Text style={styles.timeValue}>{formatTime(trip.endTime)}</Text>
            <Text style={styles.expectedTime}>
              {trip.toLocation || trip.route?.split(' - ')[1] || 'End'}
            </Text>
          </View>
        </View>
        
        {/* Date and Status - using real trip data */}
        <View style={styles.dateStatusContainer}>
          <Text style={styles.dateText}>
            {formatDate(trip.date)}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Ongoing</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.startButton, { opacity: 0.5 }]} disabled>
            <Text style={styles.startButtonText}>Trip Started</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.endButton}
            onPress={showEndTripConfirmation}
            disabled={endingTrip}
          >
            {endingTrip ? (
              <>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={[styles.endButtonText, { marginLeft: 8 }]}>Ending...</Text>
              </>
            ) : (
              <Text style={styles.endButtonText}>End Trip</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionItem}
           onPress={() => { router.push('/Journey/seatView'); }}
          >
            <View style={styles.actionIconContainer}>
              <FontAwesome5 name="ticket-alt" size={18} color="#0066FF" />
            </View>
            <Text style={styles.actionLabel}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}
           onPress={() => { router.push('/Journey/stopView'); }}
          >
            <View style={styles.actionIconContainer}>
              <Ionicons name="location" size={18} color="#0066FF" />
            </View>
            <Text style={styles.actionLabel}>Stop View</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Trip Summary - using real data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Summary So far.....</Text>
        
        <View style={styles.summaryGrid}>
          {/* Passenger Count */}
          <View style={[styles.summaryItem, {backgroundColor: '#F0F6FF'}]}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="people" size={20} color="#0066FF" />
            </View>
            <Text style={styles.summaryValue}>{stats?.bookedValidated + stats?.bookedNotValidated || 0}</Text>
            <Text style={styles.summaryLabel}>Total Passengers</Text>
          </View>
          
          {/* Validated Tickets */}
          <View style={[styles.summaryItem, {backgroundColor: '#F0FFF6'}]}>
            <View style={[styles.summaryIconContainer, {backgroundColor: '#E6FFF2'}]}>
              <Ionicons name="receipt-outline" size={20} color="#00CC66" />
            </View>
            <Text style={styles.summaryValue}>{stats?.bookedValidated || 0}</Text>
            <Text style={styles.summaryLabel}>Validated Tickets</Text>
          </View>
          
          {/* Pending Tickets */}
          <View style={[styles.summaryItem, {backgroundColor: '#FFFBF0'}]}>
            <View style={[styles.summaryIconContainer, {backgroundColor: '#FFF8E6'}]}>
              <MaterialIcons name="pending" size={20} color="#FF9500" />
            </View>
            <Text style={styles.summaryValue}>{stats?.bookedNotValidated || 0}</Text>
            <Text style={styles.summaryLabel}>Pending Tickets</Text>
          </View>
          
          {/* Total Revenue */}
          <View style={[styles.summaryItem, {backgroundColor: '#F9F0FF'}]}>
            <View style={[styles.summaryIconContainer, {backgroundColor: '#F6E6FF'}]}>
              <FontAwesome5 name="money-bill-wave" size={16} color="#BF5AF2" />
            </View>
            <Text style={styles.summaryValue}>Rs. {trip.revenue || 0}</Text>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
          </View>
        </View>
        
        {/* Trip Duration */}
        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Trip Duration</Text>
          <Text style={styles.durationValue}>
            {(() => {
            // Calculate duration from trip start and end times
            const parseTime = (timeStr: string) => {
              const [hours, minutes] = timeStr.split(':').map(Number);
              return hours * 60 + minutes;
            };
            const startMins = parseTime(trip.startTime);
            const endMins = parseTime(trip.endTime);
            let diff = endMins - startMins;
            if (diff < 0) diff += 24 * 60; // handle overnight trips
            const h = Math.floor(diff / 60);
            const m = diff % 60;
            return `${h}h ${m}m`;
            })()}
          </Text>
        </View>
      </View>
      
      {/* Add bottom padding for scrolling */}
      <View style={{height: 24}} />

      {/* End Trip Confirmation Modal */}
      <Modal
        visible={showEndModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEndModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>End Trip</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to end this trip?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEndModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleEndTrip}
                disabled={endingTrip}
              >
                {endingTrip ? (
                  <>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={[styles.confirmButtonText, { marginLeft: 8 }]}>Ending...</Text>
                  </>
                ) : (
                  <Text style={styles.confirmButtonText}>End Trip</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Component for no ongoing trip view
function NoOngoingTripView({ 
  startableTrip, 
  onViewSchedules 
}: { 
  startableTrip: EmployeeSchedule | null;
  onViewSchedules: () => void;
}) {
  return (
    <View style={styles.noTripContainer}>
      <View style={styles.noTripContent}>
        <Ionicons name="bus-outline" size={80} color="#CCCCCC" />
        <Text style={styles.noTripTitle}>No Ongoing Journey</Text>
        <Text style={styles.noTripMessage}>
          There is no ongoing trip at the moment.{'\n'}
          {startableTrip 
            ? 'Check your schedules to start your next trip.' 
            : 'Please wait for your scheduled trip time.'}
        </Text>
        
        {startableTrip && (
          <View style={styles.startTripSection}>
            <Text style={styles.upcomingTripText}>Next Scheduled Trip:</Text>
            <View style={styles.upcomingTripCard}>
              <Text style={styles.upcomingTripRoute}>
                {startableTrip.fromLocation && startableTrip.toLocation 
                  ? `${startableTrip.fromLocation} → ${startableTrip.toLocation}` 
                  : startableTrip.route || 'Route Information'}
              </Text>
              <Text style={styles.upcomingTripTime}>
                Departure: {formatTime(startableTrip.startTime)}
              </Text>
              <Text style={styles.upcomingTripDate}>
                {formatDate(startableTrip.date)}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.startTripButton}
              onPress={onViewSchedules}
            >
              <Text style={styles.startTripButtonText}>
                See Your Schedules
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default function JourneyScreen() {
  const colorScheme = useColorScheme();
  const { ongoingTrip, startableTrip, refreshTrips } = useOngoingTrip();
  const [refreshing, setRefreshing] = useState(false);
  
  // Pull to refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshTrips(); // Refresh trip data
    } catch (error) {
      console.error('Error refreshing trips:', error);
    } finally {
      setRefreshing(false);
    }
  };
  
  // Navigate to schedules page
  const navigateToSchedules = () => {
    router.push('/Journey/schedules');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}
           onPress={() => { router.push('/'); }}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {ongoingTrip ? 'Ongoing Journey' : 'Journey'}
          </Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#22C55E']}
            tintColor="#22C55E"
          />
        }
      >
        {ongoingTrip ? (
          // Show ongoing trip details
          <OngoingTripView trip={ongoingTrip} />
        ) : (
          // Show no trip message with schedules button
          <NoOngoingTripView 
            startableTrip={startableTrip}
            onViewSchedules={navigateToSchedules}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0066FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginTop: 20, // Added margin to match other headers
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20, // Added margin to match other headers
  },
  journeyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  busNumberContainer: {
    backgroundColor: '#0066FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 12,
  },
  busNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  timeColumn: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: '#33CC33',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  startButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  endButton: {
    flex: 1,
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  endButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  expectedTime: {
    fontSize: 12,
    color: '#666',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 14,
    color: '#333',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  durationContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  durationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  // No trip view styles
  noTripContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noTripContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  noTripTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noTripMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  startTripSection: {
    width: '100%',
    alignItems: 'center',
  },
  upcomingTripText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  upcomingTripCard: {
    backgroundColor: '#F0F6FF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#0066FF',
  },
  upcomingTripRoute: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  upcomingTripTime: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  upcomingTripDate: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  startTripButton: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
  },
  startTripButtonDisabled: {
    opacity: 0.6,
  },
  startTripButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F7',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#0066FF',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});