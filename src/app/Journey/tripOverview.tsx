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
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TripOverviewScreen() {
  // This would typically come from API or route params
  const tripData = {
    status: 'completed',
    route: {
      number: '138',
      busId: 'LK-4782',
      from: 'Colombo Fort',
      to: 'Kandy',
      departureTime: '06:30 AM',
      arrivalTime: '10:15 AM',
      duration: '3h 45m',
    },
    passengers: 47,
    tickets: 52,
    revenue: {
      cash: 8450,
      digital: 3280,
      total: 11730,
    },
    qrValidations: {
      successful: 23,
      failed: 2,
      successRate: 92,
    },
    completion: {
      date: 'March 15, 2024',
      duration: '3h 45m',
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Trip Overview</Text>
          <Text style={styles.headerSubtitle}>Completed Journey</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#333" />
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Route Card */}
        <View style={styles.card}>
          <View style={styles.routeHeaderRow}>
            <View style={styles.routeIconNameContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="bus" size={24} color="#0066FF" />
              </View>
              <View>
                <Text style={styles.routeNumber}>Route {tripData.route.number}</Text>
                <Text style={styles.busId}>Bus #{tripData.route.busId}</Text>
              </View>
            </View>
            
            <View style={styles.statusBadge}>
              <Ionicons name="checkmark" size={14} color="#22C55E" />
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>

          <View style={styles.routeProgressContainer}>
            <View style={styles.locationTimeContainer}>
              <Text style={styles.locationText}>{tripData.route.from}</Text>
              <Text style={styles.timeText}>{tripData.route.departureTime}</Text>
            </View>

            <View style={styles.progressLineContainer}>
              <View style={styles.progressLine}>
                <View style={styles.progressDot1} />
                <View style={styles.progressDot2} />
              </View>
              <Text style={styles.durationText}>{tripData.route.duration}</Text>
            </View>

            <View style={styles.locationTimeContainer}>
              <Text style={styles.locationText}>{tripData.route.to}</Text>
              <Text style={styles.timeText}>{tripData.route.arrivalTime}</Text>
            </View>
          </View>
        </View>

        {/* Passenger and Tickets Row */}
        <View style={styles.statsRow}>
          <View style={styles.statsCard}>
            <View style={styles.statsIconCircle}>
              <Ionicons name="people" size={20} color="#0066FF" />
            </View>
            <Text style={styles.statsNumber}>{tripData.passengers}</Text>
            <Text style={styles.statsLabel}>Passengers</Text>
          </View>

          <View style={styles.statsCard}>
            <View style={[styles.statsIconCircle, { backgroundColor: '#F0E6FF' }]}>
              <MaterialIcons name="confirmation-number" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.statsNumber}>{tripData.tickets}</Text>
            <Text style={styles.statsLabel}>Tickets</Text>
          </View>
        </View>

        {/* Revenue Card */}
        <View style={styles.card}>
          <View style={styles.revenueHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#E6F9EC' }]}>
              <MaterialIcons name="attach-money" size={20} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.revenueTitle}>Revenue Collected</Text>
              <Text style={styles.revenueSubtitle}>Total earnings for this trip</Text>
            </View>
          </View>

          <View style={styles.revenueRow}>
            <View style={styles.revenueTypeContainer}>
              <MaterialIcons name="money" size={18} color="#22C55E" />
              <Text style={styles.revenueTypeText}>Cash</Text>
            </View>
            <Text style={styles.revenueAmount}>Rs {tripData.revenue.cash.toLocaleString()}</Text>
          </View>

          <View style={[styles.revenueRow, styles.revenueRowBorder]}>
            <View style={styles.revenueTypeContainer}>
              <Ionicons name="grid" size={18} color="#0066FF" />
              <Text style={styles.revenueTypeText}>Digital</Text>
            </View>
            <Text style={styles.revenueAmount}>Rs {tripData.revenue.digital.toLocaleString()}</Text>
          </View>

          <View style={styles.revenueTotalRow}>
            <Text style={styles.revenueTotalText}>Total Revenue</Text>
            <Text style={styles.revenueTotalAmount}>Rs {tripData.revenue.total.toLocaleString()}</Text>
          </View>
        </View>

        {/* QR Validations Card */}
        <View style={styles.card}>
          <View style={styles.qrHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#EEF3FF' }]}>
              <MaterialIcons name="qr-code-scanner" size={20} color="#0066FF" />
            </View>
            <View>
              <Text style={styles.qrTitle}>QR Validations</Text>
              <Text style={styles.qrSubtitle}>Digital payment processing</Text>
            </View>
          </View>

          <View style={styles.validationStatsRow}>
            <View style={styles.successValidationCard}>
              <Text style={styles.validationNumber}>{tripData.qrValidations.successful}</Text>
              <Text style={styles.validationLabel}>Successful</Text>
            </View>

            <View style={styles.failedValidationCard}>
              <Text style={styles.failedNumber}>{tripData.qrValidations.failed}</Text>
              <Text style={styles.failedLabel}>Failed</Text>
            </View>
          </View>

          <View style={styles.successRateContainer}>
            <View style={styles.successRateHeader}>
              <Text style={styles.successRateLabel}>Success Rate</Text>
              <Text style={styles.successRateValue}>{tripData.qrValidations.successRate}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBarFill, 
                  {width: `${tripData.qrValidations.successRate}%`}
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Trip Completion Card */}
        <View style={styles.completionCard}>
          <Text style={styles.completionHeader}>Trip completed on</Text>
          <Text style={styles.completionDate}>{tripData.completion.date}</Text>
          <Text style={styles.completionDuration}>
            Journey Duration: {tripData.completion.duration}
          </Text>
        </View>
        
        {/* Bottom padding for scroll */}
        <View style={{ height: 20 }} />
      </ScrollView>
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
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  moreButton: {
    padding: 4,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  routeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeIconNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeNumber: {
    fontSize: 17,
    fontWeight: '600',
  },
  busId: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '500',
    marginLeft: 4,
  },
  routeProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationTimeContainer: {
    alignItems: 'center',
    width: 80,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  progressLineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#E0E0E0',
    width: '100%',
    position: 'relative',
  },
  progressDot1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066FF',
    position: 'absolute',
    left: 0,
    top: -3,
  },
  progressDot2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    position: 'absolute',
    right: 0,
    top: -3,
  },
  durationText: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statsIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
  },
  revenueHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  revenueTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  revenueSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  revenueRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  revenueTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenueTypeText: {
    fontSize: 15,
    marginLeft: 8,
  },
  revenueAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  revenueTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  revenueTotalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  revenueTotalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C55E',
  },
  qrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  qrSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  validationStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  successValidationCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  validationNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 4,
  },
  validationLabel: {
    fontSize: 14,
    color: '#22C55E',
  },
  failedValidationCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    marginLeft: 8,
  },
  failedNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF3B30',
    marginBottom: 4,
  },
  failedLabel: {
    fontSize: 14,
    color: '#FF3B30',
  },
  successRateContainer: {
    marginTop: 8,
  },
  successRateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  successRateLabel: {
    fontSize: 15,
  },
  successRateValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  completionCard: {
    backgroundColor: '#EEF3FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  completionHeader: {
    fontSize: 14,
    color: '#0066FF',
    marginBottom: 6,
  },
  completionDate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066FF',
    marginBottom: 6,
  },
  completionDuration: {
    fontSize: 14,
    color: '#0066FF',
  },
});