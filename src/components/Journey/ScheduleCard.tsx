import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Type definition for Schedule
export type Schedule = {
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

type Props = {
  item: Schedule;
};

export default function ScheduleCard({ item }: Props) {
  return (
    <View style={styles.scheduleCard}>
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
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => { router.push('/Journey/journeyReport'); }}
            >
              <Text style={styles.secondaryButtonText}>View Report</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => { router.push('/Journey/tripOverview'); }}
            >
              <Text style={styles.secondaryButtonText}>Trip Summary</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});