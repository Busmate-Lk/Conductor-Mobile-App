import React, { use } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar,useColorScheme } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function JourneyScreen() {

  const colorScheme =useColorScheme();
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Adjust status bar based on color scheme */}
      <StatusBar 
        barStyle={colorScheme === 'dark' ? "light-content" : "dark-content"} 
        backgroundColor={colorScheme === 'dark' ? "black" : "white"}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}
           onPress={() => { router.push('/'); }}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ongoing Journey</Text>
        </View>
        
      </View>
      
      <ScrollView style={styles.container}>
        {/* Journey Card */}
        <View style={styles.journeyCard}>
          {/* Route Information */}
          <View style={styles.routeContainer}>
            <Text style={styles.routeText}>Colombo → Kandy</Text>
            
            <View style={styles.busNumberContainer}>
              <Text style={styles.busNumberText}>NC-1234</Text>
            </View>
          </View>
          
          {/* Time Information */}
          <View style={styles.timeContainer}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Departure</Text>
              <Text style={styles.timeValue}>06:30 AM</Text>
            </View>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.timeValue}>09:45 AM</Text>
            </View>
          </View>
          
          {/* Date and Status */}
          <View style={styles.dateStatusContainer}>
            <Text style={styles.dateText}>Today, Dec 16, 2024</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Ongoing</Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.endButton}>
              <Text style={styles.endButtonText}>End Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Passed Stops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passed Stops</Text>
          
          {/* Colombo Fort Stop */}
          <View style={styles.stopItem}>
            <View style={styles.stopLeftContainer}>
              <View style={[styles.stopIndicator, styles.onTimeIndicator]} />
              <View style={styles.stopDetails}>
                <Text style={styles.stopName}>Colombo Fort</Text>
                <Text style={styles.expectedTime}>Expected: 06:30 AM</Text>
              </View>
            </View>
            <View style={styles.stopRightContainer}>
              <Text style={[styles.actualTime, styles.onTimeText]}>06:28 AM</Text>
              <Text style={styles.timeDifference}>2 min early</Text>
            </View>
          </View>
          
          {/* Kelaniya Stop */}
          <View style={styles.stopItem}>
            <View style={styles.stopLeftContainer}>
              <View style={[styles.stopIndicator, styles.slightlyLateIndicator]} />
              <View style={styles.stopDetails}>
                <Text style={styles.stopName}>Kelaniya</Text>
                <Text style={styles.expectedTime}>Expected: 06:50 AM</Text>
              </View>
            </View>
            <View style={styles.stopRightContainer}>
              <Text style={[styles.actualTime, styles.slightlyLateText]}>06:52 AM</Text>
              <Text style={styles.timeDifference}>2 min late</Text>
            </View>
          </View>
          
          {/* Gampaha Stop */}
          <View style={styles.stopItem}>
            <View style={styles.stopLeftContainer}>
              <View style={[styles.stopIndicator, styles.lateIndicator]} />
              <View style={styles.stopDetails}>
                <Text style={styles.stopName}>Gampaha</Text>
                <Text style={styles.expectedTime}>Expected: 07:15 AM</Text>
              </View>
            </View>
            <View style={styles.stopRightContainer}>
              <Text style={[styles.actualTime, styles.lateText]}>07:22 AM</Text>
              <Text style={styles.timeDifference}>7 min late</Text>
            </View>
          </View>
        </View>
        
        {/* Next Stop */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Stop</Text>
          <View style={styles.nextStopContainer}>
            <View style={styles.nextStopLeft}>
              <View style={styles.nextStopIconContainer}>
                <Ionicons name="location" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.nextStopDetails}>
                <Text style={styles.nextStopName}>Veyangoda</Text>
                <Text style={styles.expectedTime}>Expected: 07:45 AM</Text>
              </View>
            </View>
            <View style={styles.nextStopRight}>
              <Text style={styles.remainingTime}>12 min</Text>
              <Text style={styles.remainingLabel}>remaining</Text>
            </View>
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
        
        {/* Trip Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Summary So far.....</Text>
          
          <View style={styles.summaryGrid}>
            {/* Passenger Count */}
            <View style={[styles.summaryItem, {backgroundColor: '#F0F6FF'}]}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="people" size={20} color="#0066FF" />
              </View>
              <Text style={styles.summaryValue}>42</Text>
              <Text style={styles.summaryLabel}>Total Passengers</Text>
            </View>
            
            {/* Tickets Issued */}
            <View style={[styles.summaryItem, {backgroundColor: '#F0FFF6'}]}>
              <View style={[styles.summaryIconContainer, {backgroundColor: '#E6FFF2'}]}>
                <Ionicons name="receipt-outline" size={20} color="#00CC66" />
              </View>
              <Text style={styles.summaryValue}>45</Text>
              <Text style={styles.summaryLabel}>Tickets Issued</Text>
            </View>
            
            {/* QR Revenue */}
            <View style={[styles.summaryItem, {backgroundColor: '#FFFBF0'}]}>
              <View style={[styles.summaryIconContainer, {backgroundColor: '#FFF8E6'}]}>
                <MaterialIcons name="qr-code" size={20} color="#FF9500" />
              </View>
              <Text style={styles.summaryValue}>Rs. 3,240</Text>
              <Text style={styles.summaryLabel}>QR Revenue</Text>
            </View>
            
            {/* Cash Revenue */}
            <View style={[styles.summaryItem, {backgroundColor: '#F9F0FF'}]}>
              <View style={[styles.summaryIconContainer, {backgroundColor: '#F6E6FF'}]}>
                <FontAwesome5 name="money-bill-wave" size={16} color="#BF5AF2" />
              </View>
              <Text style={styles.summaryValue}>Rs. 1,580</Text>
              <Text style={styles.summaryLabel}>Cash Revenue</Text>
            </View>
          </View>
          
          {/* Trip Duration */}
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Trip Duration</Text>
            <Text style={styles.durationValue}>4h 30m</Text>
          </View>
        </View>
        
        {/* Add bottom padding for scrolling */}
        <View style={{height: 24}} />
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
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0066FF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    
    
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
  stopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  stopLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stopIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
  },
  onTimeIndicator: {
    backgroundColor: '#33CC33',
  },
  slightlyLateIndicator: {
    backgroundColor: '#FF9500',
  },
  lateIndicator: {
    backgroundColor: '#FF3B30',
  },
  stopDetails: {
    flex: 1,
  },
  stopName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  expectedTime: {
    fontSize: 12,
    color: '#666',
  },
  stopRightContainer: {
    alignItems: 'flex-end',
  },
  actualTime: {
    fontSize: 14,
    fontWeight: '500',
  },
  onTimeText: {
    color: '#33CC33',
  },
  slightlyLateText: {
    color: '#FF9500',
  },
  lateText: {
    color: '#FF3B30',
  },
  timeDifference: {
    fontSize: 11,
    color: '#999',
  },
  nextStopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    borderWidth: 1,
    borderColor: '#0066FF',
    borderRadius: 12,
    padding: 16,
  },
  nextStopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nextStopIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nextStopDetails: {
    flex: 1,
  },
  nextStopName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  nextStopRight: {
    alignItems: 'center',
  },
  remainingTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066FF',
  },
  remainingLabel: {
    fontSize: 10,
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
});