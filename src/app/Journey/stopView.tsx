import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useStopView } from '@/hooks/Journey/useStopView';
import { Stop } from '@/types/Journey/stop';

export default function StopViewScreen() {
  const { journeyId } = useLocalSearchParams<{ journeyId?: string }>();
  const {
    journeyData,
    loading,
    error,
    actionLoading,
    markStopArrived,
    markStopDeparted,
    refreshJourney,
    setError,
    getStopStatusStyle,
    getJourneyProgress,
  } = useStopView(journeyId);

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066FF" />
          <Text style={styles.loadingText}>Loading journey data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              refreshJourney();
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // No journey data
  if (!journeyData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="bus-outline" size={48} color="#999" />
          <Text style={styles.errorText}>No journey data found</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Handle stop action
  const handleStopAction = (stop: Stop, action: 'arrived' | 'departed') => {
    Alert.alert(
      `Mark ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      `Mark ${stop.name} as ${action}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            const result = action === 'arrived' 
              ? await markStopArrived(stop.id)
              : await markStopDeparted(stop.id);
              
            if (result?.success) {
              Alert.alert('Success', result.message);
            } else {
              Alert.alert('Error', result?.message || 'Failed to update stop');
            }
          }
        }
      ]
    );
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
        <View>
          <View style={styles.nextStopBadge}>
            <Text style={styles.nextStopText}>Current Stop</Text>
          </View>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleStopAction(stop, 'arrived')}
            disabled={actionLoading}
          >
            <Text style={styles.actionButtonText}>Mark Arrived</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (stop.status === 'completed' || (stop.completed && stop.delayMinutes !== undefined)) {
      const isLate = stop.delayMinutes && stop.delayMinutes > 0;
      return (
        <View>
          <View style={isLate ? styles.lateBadge : styles.onTimeBadge}>
            <Ionicons 
              name={isLate ? "time" : "checkmark"} 
              size={12} 
              color={isLate ? "#FF3B30" : "#22C55E"} 
            />
            <Text style={isLate ? styles.lateText : styles.onTimeText}>
              {isLate ? `Late ${stop.delayMinutes}min` : 'On Time'}
            </Text>
          </View>
          <Text style={isLate ? styles.actualTimeLate : styles.actualTimeOnTime}>
            Actual: {stop.actual}
          </Text>
          {stop.departureTime && (
            <Text style={styles.departureTime}>
              Departed: {stop.departureTime}
            </Text>
          )}
        </View>
      );
    }

    return null;
  };

  // Render time marker (circle) for a stop
  const renderTimeMarker = (stop: Stop) => {
    const statusStyle = getStopStatusStyle(stop);
    
    if (statusStyle === 'current') {
      return (
        <View style={styles.currentStopMarker}>
          <View style={styles.currentStopInner} />
        </View>
      );
    }

    if (statusStyle === 'completed') {
      return (
        <View style={styles.completedStopMarker}>
          <Ionicons name="checkmark" size={20} color="white" />
        </View>
      );
    }

    if (statusStyle === 'late') {
      return (
        <View style={styles.lateStopMarker}>
          <Ionicons name="time" size={20} color="white" />
        </View>
      );
    }

    return <View style={styles.upcomingStopMarker} />;
  };

  const progress = getJourneyProgress();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Route Info Banner */}
      <View style={styles.routeBanner}>
        <View style={styles.routeInfo}>
          <Text style={styles.routeNumber}>Route {journeyData.route.number}</Text>
          <Text style={styles.routeName}>{journeyData.route.name}</Text>
        </View>
        
        <View style={styles.journeyInfo}>
          <Text style={styles.journeyLabel}>Journey Started</Text>
          <Text style={styles.journeyTime}>{journeyData.route.startTime}</Text>
          <Text style={styles.progressText}>{progress.completed}/{progress.total} stops</Text>
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
            {journeyData.nextStop.distance && (
              <Text style={styles.nextStopDistance}>
                {journeyData.nextStop.distance} away
              </Text>
            )}
          </View>
        </View>
        
        {/* Journey Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressBarLabel}>Journey Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressBarFill,
                { width: `${progress.percentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressBarText}>{progress.percentage}% Complete</Text>
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
        
        {/* Additional Journey Stats */}
        {journeyData.summary.totalDistance && (
          <View style={styles.additionalStatsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Distance:</Text>
              <Text style={styles.statValue}>{journeyData.summary.totalDistance}</Text>
            </View>
            {journeyData.summary.averageSpeed && (
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Average Speed:</Text>
                <Text style={styles.statValue}>{journeyData.summary.averageSpeed}</Text>
              </View>
            )}
            {journeyData.summary.delayTotal && (
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Delay:</Text>
                <Text style={styles.statValueRed}>{journeyData.summary.delayTotal}</Text>
              </View>
            )}
          </View>
        )}
        
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
  // Removed passengerCount style
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
    marginBottom: 20,
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
    marginBottom: 20,
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