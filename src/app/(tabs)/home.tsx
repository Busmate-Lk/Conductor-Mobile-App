import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  // Today's date would typically be dynamic
  const today = "Thursday, June 12, 2025";
  const markTime = "8:00 M";
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="bus" size={16} color="white" />
            </View>
            <Text style={styles.logoText}>Busmate LK</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image 
                source={require('@/assets/images/profile-pic.jpg')} 
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>
            Good Morning, Manusha <Text>👋</Text>
          </Text>
          <Text style={styles.dateText}>{today}</Text>
        </View>
        
        {/* Attendance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Attendance</Text>
          <Text style={styles.nameText}>Name: Manusha Ranaweera</Text>
          <Text style={styles.infoText}>Date: June 12, 2025</Text>
          
          <TouchableOpacity style={styles.markAttendanceButton}>
            <Text style={styles.buttonText}>Mark Attendance • {markTime}</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quick Actions Section */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={[styles.actionButton, styles.blueButton]}>
            <Ionicons name="calendar" size={24} color="white" />
            <Text style={styles.actionText}>View Schedules</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.blueButton]}>
            <Ionicons name="notifications" size={24} color="white" />
            <Text style={styles.actionText}>Notify Passengers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.blueButton]}>
            <Ionicons name="receipt-outline" size={24} color="white" />
            <Text style={styles.actionText}>Tickets</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.blueButton]}>
            <Ionicons name="bar-chart-outline" size={24} color="white" />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
        
        {/* Today's Assignment */}
        <Text style={styles.sectionTitle}>Today's Assignment</Text>
        <View style={styles.assignmentCard}>
          <Text style={styles.routeText}>Route: Colombo - Kandy</Text>
          <Text style={styles.busIdText}>Bus ID: NB-2845</Text>
          <Text style={styles.departureText}>Departure: 9:30 AM</Text>
          
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>Tap to View Trip Details</Text>
          </TouchableOpacity>
        </View>
        
        {/* Today's Summary */}
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconContainer, {backgroundColor: '#e6efff'}]}>
              <Ionicons name="people" size={24} color="#0066FF" />
            </View>
            <Text style={styles.summaryValue}>48</Text>
            <Text style={styles.summaryLabel}>Passengers</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconContainer, {backgroundColor: '#e6fff2'}]}>
              <FontAwesome5 name="money-bill-wave" size={20} color="#00CC66" />
            </View>
            <Text style={styles.summaryValue}>12,500</Text>
            <Text style={styles.summaryLabel}>Collected</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconContainer, {backgroundColor: '#fff8e6'}]}>
              <MaterialCommunityIcons name="ticket-outline" size={24} color="#FFCC00" />
            </View>
            <Text style={styles.summaryValue}>45</Text>
            <Text style={styles.summaryLabel}>Tickets</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation - This would normally be handled by your tab navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="home" size={22} color="#0066FF" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="receipt-outline" size={22} color="#999" />
          <Text style={styles.navText}>Tickets</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={22} color="#999" />
          <Text style={styles.navText}>Journey</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
     marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    backgroundColor: '#0066FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 16,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
  },
  greetingSection: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  markAttendanceButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    marginBottom: 24,
  },
  actionButton: {
    width: '46%',
    margin: '2%',
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButton: {
    backgroundColor: '#0066FF',
  },
  actionText: {
    color: 'white',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  assignmentCard: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  routeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  busIdText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 4,
  },
  departureText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 16,
  },
  viewDetailsButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#0066FF',
    fontWeight: '500',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  summaryCard: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 56,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#0066FF',
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeNavText: {
    color: '#0066FF',
  },
});