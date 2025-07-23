import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Use the same stops data from journey screen
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

export default function StopViewScreen() {
  // Journey state - matching the journey screen
  const currentStopIndex = 3; // Currently at Galle (index 3)
  const passedStops = [0, 1, 2]; // Matara, Weligama, Mirissa passed
  const journeyStartTime = new Date('2024-12-16T06:30:00');
  
  // Get dynamic route information
  const startStop = stopsList[0]; // Matara
  const endStop = stopsList[stopsList.length - 1]; // Colombo
  const currentStop = stopsList[currentStopIndex];
  const nextStop = currentStopIndex < stopsList.length - 1 ? stopsList[currentStopIndex + 1] : null;
  const latestPassedStop = passedStops.length > 0 ? stopsList[passedStops[passedStops.length - 1]] : null;
  
  // Calculate estimated times based on average speed (40 km/h)
  const averageSpeed = 40;
  const getEstimatedTime = (kmFromStart: number) => {
    const travelTimeHours = kmFromStart / averageSpeed;
    const estimatedTime = new Date(journeyStartTime.getTime() + (travelTimeHours * 60 * 60 * 1000));
    return estimatedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  // Calculate actual arrival times (with some randomness for realism)
  const getActualTime = (stopIndex: number) => {
    const baseTime = stopsList[stopIndex].km / averageSpeed;
    const variation = (stopIndex * 0.1 - 0.2); // Progressive delay simulation
    const actualTimeHours = baseTime + variation;
    const actualTime = new Date(journeyStartTime.getTime() + (actualTimeHours * 60 * 60 * 1000));
    return actualTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  // Get time difference text and status
  const getTimeDifference = (stopIndex: number) => {
    const expectedKm = stopsList[stopIndex].km;
    const expectedTimeHours = expectedKm / averageSpeed;
    const variation = (stopIndex * 0.1 - 0.2);
    const actualTimeHours = expectedTimeHours + variation;
    const diffMinutes = Math.round((actualTimeHours - expectedTimeHours) * 60);
    
    if (diffMinutes > 5) {
      return { text: `${diffMinutes} min late`, color: '#FF3B30', status: 'late' };
    } else if (diffMinutes > 0) {
      return { text: `${diffMinutes} min late`, color: '#FF9500', status: 'slightly_late' };
    } else if (diffMinutes < -2) {
      return { text: `${Math.abs(diffMinutes)} min early`, color: '#33CC33', status: 'early' };
    } else {
      return { text: 'On time', color: '#33CC33', status: 'on_time' };
    }
  };
  
  // Get stop status
  const getStopStatus = (stopIndex: number) => {
    if (passedStops.includes(stopIndex)) {
      return 'completed';
    } else if (stopIndex === currentStopIndex) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };

  
  // Handle stop action
  const handleStopAction = (stopIndex: number, action: 'arrived' | 'departed') => {
    const stop = stopsList[stopIndex];
    Alert.alert(
      `Mark ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      `Mark ${stop.name} as ${action}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', `${stop.name} marked as ${action}`);
          }
        }
      ]
    );
  };

  // Render status indicator for a stop
  const renderStatusIndicator = (stopIndex: number) => {
    const status = getStopStatus(stopIndex);
    const stop = stopsList[stopIndex];
    
    if (status === 'upcoming') {
      return <Text style={styles.notVisitedText}>—</Text>;
    }

    if (status === 'current') {
      return (
        <View>
          <View style={styles.nextStopBadge}>
            <Text style={styles.nextStopText}>Current Stop</Text>
          </View>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleStopAction(stopIndex, 'arrived')}
          >
            <Text style={styles.actionButtonText}>Mark Arrived</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (status === 'completed') {
      const timeDiff = getTimeDifference(stopIndex);
      const isLate = timeDiff.status === 'late' || timeDiff.status === 'slightly_late';
      return (
        <View>
          <View style={isLate ? styles.lateBadge : styles.onTimeBadge}>
            <Ionicons 
              name={isLate ? "time" : "checkmark"} 
              size={12} 
              color={isLate ? "#FF3B30" : "#22C55E"} 
            />
            <Text style={isLate ? styles.lateText : styles.onTimeText}>
              {timeDiff.text}
            </Text>
          </View>
          <Text style={isLate ? styles.actualTimeLate : styles.actualTimeOnTime}>
            Actual: {getActualTime(stopIndex)}
          </Text>
        </View>
      );
    }

    return null;
  };

  // Render time marker (circle) for a stop
  const renderTimeMarker = (stopIndex: number) => {
    const status = getStopStatus(stopIndex);
    
    if (status === 'current') {
      return (
        <View style={styles.currentStopMarker}>
          <View style={styles.currentStopInner} />
        </View>
      );
    }

    if (status === 'completed') {
      const timeDiff = getTimeDifference(stopIndex);
      const isLate = timeDiff.status === 'late';
      
      if (isLate) {
        return (
          <View style={styles.lateStopMarker}>
            <Ionicons name="time" size={20} color="white" />
          </View>
        );
      }
      
      return (
        <View style={styles.completedStopMarker}>
          <Ionicons name="checkmark" size={20} color="white" />
        </View>
      );
    }

    return <View style={styles.upcomingStopMarker} />;
  };

  // Calculate progress
  const completedStops = passedStops.length;
  const totalStops = stopsList.length;
  const progressPercentage = Math.round((completedStops / totalStops) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" translucent={false} />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stop View</Text>
        <View style={{ width: 24 }} />
      </View> */}
      
      {/* Route Info Banner */}
      <View style={styles.routeBanner}>
        <View style={styles.routeInfo}>
          <Text style={styles.routeNumber}>Route NC-1234</Text>
          <Text style={styles.routeName}>{startStop.name} → {endStop.name}</Text>
        </View>
        
        <View style={styles.journeyInfo}>
          <Text style={styles.journeyLabel}>Journey Started</Text>
          <Text style={styles.journeyTime}>{getEstimatedTime(0)}</Text>
          <Text style={styles.progressText}>{completedStops}/{totalStops} stops</Text>
        </View>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Latest Passed Stop Card */}
        {latestPassedStop && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Latest Passed Stop</Text>
            <View style={styles.passedStopCard}>
              <View style={styles.passedStopIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
              </View>
              <View style={styles.passedStopInfo}>
                <Text style={styles.passedStopName}>{latestPassedStop.name}</Text>
                <Text style={styles.passedStopTime}>
                  Completed at {getActualTime(passedStops[passedStops.length - 1])}
                </Text>
                <Text style={styles.passedStopStatus}>
                  {getTimeDifference(passedStops[passedStops.length - 1]).text}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Next Stop Card */}
        {nextStop && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Stop</Text>
            <View style={styles.nextStopCard}>
              <Ionicons name="location" size={24} color="#0066FF" />
              <View style={styles.nextStopInfo}>
                <Text style={styles.nextStopLabel}>Next Stop</Text>
                <Text style={styles.nextStopName}>
                  {nextStop.name} - ETA {getEstimatedTime(nextStop.km)}
                </Text>
                <Text style={styles.nextStopDistance}>
                  {nextStop.km - currentStop.km} km away
                </Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Journey Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressBarLabel}>Journey Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressBarFill,
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressBarText}>{progressPercentage}% Complete</Text>
        </View>
        
        {/* All Stops Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.sectionTitle}>All Stops</Text>
          {stopsList.map((stop, index) => {
            const isLast = index === stopsList.length - 1;
            
            return (
              <View key={stop.id} style={styles.timelineItem}>
                {/* Time Marker and Connecting Line */}
                <View style={styles.timelineMarkerContainer}>
                  {renderTimeMarker(index)}
                  {!isLast && <View style={styles.timelineConnector} />}
                </View>
                
                {/* Stop Information */}
                <View 
                  style={[
                    styles.stopInfoCard,
                    getStopStatus(index) === 'current' && styles.currentStopCard
                  ]}
                >
                  <View style={styles.stopMainInfo}>
                    <Text style={styles.stopName}>
                      {index + 1}. {stop.name}
                    </Text>
                    <Text style={styles.expectedTime}>
                      Expected: {getEstimatedTime(stop.km)}
                    </Text>
                    <Text style={styles.kmInfo}>
                      {stop.km} km from start
                    </Text>
                  </View>
                  
                  <View style={styles.stopStatusContainer}>
                    {renderStatusIndicator(index)}
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
            <Text style={styles.summaryValueGreen}>{completedStops}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>On Time</Text>
            <Text style={styles.summaryValue}>
              {passedStops.filter(stopIndex => 
                getTimeDifference(stopIndex).status === 'on_time' || 
                getTimeDifference(stopIndex).status === 'early'
              ).length}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>ETA Final</Text>
            <Text style={styles.summaryValue}>{getEstimatedTime(endStop.km)}</Text>
          </View>
        </View>
        
        {/* Additional Journey Stats */}
        <View style={styles.additionalStatsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Distance:</Text>
            <Text style={styles.statValue}>{endStop.km} km</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average Speed:</Text>
            <Text style={styles.statValue}>{averageSpeed} km/h</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Current Progress:</Text>
            <Text style={styles.statValue}>{currentStop.km} km</Text>
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
    backgroundColor: '#0066FF',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // Section
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  
  // Passed Stop Card
  passedStopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  passedStopIcon: {
    marginRight: 12,
  },
  passedStopInfo: {
    flex: 1,
  },
  passedStopName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  passedStopTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  passedStopStatus: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '500',
  },
  
  // KM Info
  kmInfo: {
    fontSize: 12,
    color: '#999',
  },
  
  // Loading & Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: '#0066FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Route Banner
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
  progressText: {
    fontSize: 12,
    color: '#0066FF',
    marginTop: 2,
  },
  
  // Content
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    padding: 16,
  },
  
  // Next Stop Card
  nextStopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF3FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  nextStopInfo: {
    marginLeft: 12,
    flex: 1,
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
    marginBottom: 2,
  },
  nextStopDistance: {
    fontSize: 14,
    color: '#666',
  },
  
  // Progress Bar
  progressBarContainer: {
    marginBottom: 24,
  },
  progressBarLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0066FF',
    borderRadius: 4,
  },
  progressBarText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
  
  // Timeline
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
  lateStopMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingStopMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
  },
  
  // Stop Info Cards
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
    marginBottom: 2,
  },
  stopStatusContainer: {
    alignItems: 'flex-end',
  },
  
  // Status Badges
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
    marginBottom: 8,
  },
  nextStopText: {
    fontSize: 12,
    color: '#0066FF',
    fontWeight: '500',
  },
  
  // Action Button
  actionButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Time Display
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
  departureTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
  
  // Summary
  summarySeparator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 0,
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
  
  // Additional Stats
  additionalStatsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 40,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  statValueRed: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF3B30',
  },
});