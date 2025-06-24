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

// Define the Stop type
interface Stop {
  id: number;
  number: number;
  name: string;
  expected: string;
  actual?: string;
  status?: 'ontime' | 'late' | 'current';
  completed: boolean;
  isFinal?: boolean;
}

export default function StopViewScreen() {
  // Journey data - this would typically come from API or route params
  const journeyData = {
    route: {
      number: '138',
      name: 'Colombo - Negombo',
      startTime: '8:30 AM',
    },
    nextStop: {
      name: 'Kadawatha',
      eta: '9:15 AM',
    },
    stops: [
      {
        id: 1,
        number: 1,
        name: 'Pettah',
        expected: '8:30 AM',
        actual: '8:30 AM',
        status: 'ontime' as const,
        completed: true,
      },
      {
        id: 2,
        number: 2,
        name: 'Maradana',
        expected: '8:45 AM',
        actual: '8:52 AM',
        status: 'late' as const,
        completed: true,
      },
      {
        id: 3,
        number: 3,
        name: 'Kelaniya',
        expected: '9:00 AM',
        actual: '9:01 AM',
        status: 'ontime' as const,
        completed: true,
      },
      {
        id: 4,
        number: 4,
        name: 'Kadawatha',
        expected: '9:15 AM',
        actual: 'Arriving...',
        status: 'current' as const,
        completed: false,
      },
      {
        id: 5,
        number: 5,
        name: 'Kiribathgoda',
        expected: '9:30 AM',
        completed: false,
      },
      {
        id: 6,
        number: 6,
        name: 'Wattala',
        expected: '9:45 AM',
        completed: false,
      },
      {
        id: 7,
        number: 7,
        name: 'Negombo',
        expected: '10:00 AM',
        completed: false,
        isFinal: true,
      },
    ],
    summary: {
      completedStops: '3/7 Stops',
      onTime: '2/3',
      etaFinal: '10:05 AM',
    },
  };

  // Render status indicator for a stop
  const renderStatusIndicator = (stop: Stop) => {
    if (!stop.completed && !stop.status) {
      return <Text style={styles.notVisitedText}>—</Text>;
    }

    if (stop.isFinal && !stop.completed) {
      return <Text style={styles.finalStopText}>Final Stop</Text>;
    }

    if (stop.status === 'current') {
      return (
        <View style={styles.nextStopBadge}>
          <Text style={styles.nextStopText}>Next Stop</Text>
        </View>
      );
    }

    if (stop.status === 'ontime') {
      return (
        <View>
          <View style={styles.onTimeBadge}>
            <Ionicons name="checkmark" size={12} color="#22C55E" />
            <Text style={styles.onTimeText}>On Time</Text>
          </View>
          <Text style={styles.actualTimeOnTime}>Actual: {stop.actual}</Text>
        </View>
      );
    }

    if (stop.status === 'late') {
      return (
        <View>
          <View style={styles.lateBadge}>
            <MaterialCommunityIcons name="clock-alert-outline" size={12} color="#FF3B30" />
            <Text style={styles.lateText}>Late</Text>
          </View>
          <Text style={styles.actualTimeLate}>Actual: {stop.actual}</Text>
        </View>
      );
    }

    return null;
  };

  // Render time marker (circle) for a stop
  const renderTimeMarker = (stop: Stop) => {
    if (stop.status === 'current') {
      return (
        <View style={styles.currentStopMarker}>
          <View style={styles.currentStopInner} />
        </View>
      );
    }

    if (stop.completed) {
      return (
        <View style={styles.completedStopMarker}>
          <Ionicons name="arrow-down" size={20} color="white" />
        </View>
      );
    }

    return <View style={styles.upcomingStopMarker} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Ionicons name="bus" size={22} color="#0066FF" style={styles.titleIcon} />
          <Text style={styles.headerTitle}>Stop Overview</Text>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#333" />
        </TouchableOpacity>
      </View> */}
      
      {/* Route Info Banner */}
      <View style={styles.routeBanner}>
        <View style={styles.routeInfo}>
          <Text style={styles.routeNumber}>Route {journeyData.route.number}</Text>
          <Text style={styles.routeName}>{journeyData.route.name}</Text>
        </View>
        
        <View style={styles.journeyInfo}>
          <Text style={styles.journeyLabel}>Journey Started</Text>
          <Text style={styles.journeyTime}>{journeyData.route.startTime}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Next Stop Card */}
        <View style={styles.nextStopCard}>
          <Ionicons name="location" size={24} color="#0066FF" />
          <View style={styles.nextStopInfo}>
            <Text style={styles.nextStopLabel}>Next Stop</Text>
            <Text style={styles.nextStopName}>
              {journeyData.nextStop.name} - ETA {journeyData.nextStop.eta}
            </Text>
          </View>
        </View>
        
        {/* Stops Timeline */}
        <View style={styles.timelineContainer}>
          {journeyData.stops.map((stop, index) => {
            const isLast = index === journeyData.stops.length - 1;
            
            return (
              <View key={stop.id} style={styles.timelineItem}>
                {/* Time Marker and Connecting Line */}
                <View style={styles.timelineMarkerContainer}>
                  {renderTimeMarker(stop)}
                  {!isLast && <View style={styles.timelineConnector} />}
                </View>
                
                {/* Stop Information */}
                <View 
                  style={[
                    styles.stopInfoCard,
                    stop.status === 'current' && styles.currentStopCard
                  ]}
                >
                  <View style={styles.stopMainInfo}>
                    <Text style={styles.stopName}>
                      {stop.number}. {stop.name}
                    </Text>
                    <Text style={styles.expectedTime}>
                      Expected: {stop.expected}
                    </Text>
                  </View>
                  
                  <View style={styles.stopStatusContainer}>
                    {renderStatusIndicator(stop)}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        
        {/* Journey Summary */}
        <View style={styles.summarySeparator} />
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Completed</Text>
            <Text style={styles.summaryValueGreen}>{journeyData.summary.completedStops}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>On Time</Text>
            <Text style={styles.summaryValue}>{journeyData.summary.onTime}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>ETA Final</Text>
            <Text style={styles.summaryValue}>{journeyData.summary.etaFinal}</Text>
          </View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  routeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  routeInfo: {
    flex: 1,
  },
  routeNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 2,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
  },
  journeyInfo: {
    alignItems: 'flex-end',
  },
  journeyLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  journeyTime: {
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  nextStopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF3FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  nextStopInfo: {
    marginLeft: 12,
  },
  nextStopLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066FF',
    marginBottom: 4,
  },
  nextStopName: {
    fontSize: 18,
    fontWeight: '500',
  },
  timelineContainer: {
    marginBottom: 24,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineMarkerContainer: {
    alignItems: 'center',
    width: 40,
  },
  timelineConnector: {
    width: 2,
    height: 80,
    backgroundColor: '#E0E0E0',
  },
  completedStopMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStopMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStopInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  upcomingStopMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
  },
  stopInfoCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginLeft: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  currentStopCard: {
    borderWidth: 2,
    borderColor: '#0066FF',
    backgroundColor: '#FFFFFF',
  },
  stopMainInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  expectedTime: {
    fontSize: 14,
    color: '#666',
  },
  stopStatusContainer: {
    alignItems: 'flex-end',
  },
  onTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onTimeText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '500',
    marginLeft: 3,
  },
  lateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lateText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
    marginLeft: 3,
  },
  nextStopBadge: {
    backgroundColor: '#EEF3FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  nextStopText: {
    fontSize: 12,
    color: '#0066FF',
    fontWeight: '500',
  },
  actualTimeOnTime: {
    fontSize: 14,
    color: '#22C55E',
    marginTop: 4,
    textAlign: 'right',
  },
  actualTimeLate: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 4,
    textAlign: 'right',
  },
  notVisitedText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  finalStopText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summarySeparator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryValueGreen: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
  },
});