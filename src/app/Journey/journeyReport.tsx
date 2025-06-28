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
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TripReportScreen() {
  // Trip report data - this would typically come from API
  const tripData = {
    details: {
      route: 'Colombo → Kandy',
      busNumber: 'NC-2152',
      date: '2025-06-12',
      time: '08:00 AM – 12:30 PM',
      status: 'completed'
    },
    summary: {
      totalPassengers: 42,
      ticketsIssued: 45,
      qrRevenue: 3240,
      cashRevenue: 1580,
      duration: '4h 30m'
    },
    qrLogs: [
      {
        id: '1',
        name: 'Kasun Perera',
        qrCode: '#QR240612001',
        from: 'Colombo',
        to: 'Kandy',
        scanTime: '08:15 AM',
        fare: 120
      },
      {
        id: '2',
        name: 'Nimali Silva',
        qrCode: '#QR240612002',
        from: 'Colombo',
        to: 'Kegalle',
        scanTime: '08:22 AM',
        fare: 85
      }
    ],
    totalQrLogs: 45,
    totalRevenue: 4820
  };

  const handleExportPDF = () => {
    
  };

  const handleDownloadCSV = () => {
    
  };

  const handleEmailReport = () => {
    
  };

  const handleShareReport = () => {
    
  };

  const handleViewAllLogs = () => {
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Report</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShareReport}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Trip Details */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>Trip Details</Text>
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="git-network" size={18} color="#0066FF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Route</Text>
              <Text style={styles.detailValue}>{tripData.details.route}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="bus" size={18} color="#0066FF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Bus No.</Text>
              <Text style={styles.detailValue}>{tripData.details.busNumber}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="calendar" size={18} color="#0066FF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Trip Date</Text>
              <Text style={styles.detailValue}>{tripData.details.date}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="time" size={18} color="#0066FF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{tripData.details.time}</Text>
            </View>
          </View>
        </View>

        {/* Trip Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip Summary</Text>

          <View style={styles.statsGrid}>
            {/* Passengers */}
            <View style={[styles.statCard, { backgroundColor: '#EEF3FF' }]}>
              <Ionicons name="people" size={22} color="#0066FF" />
              <Text style={styles.statValue}>{tripData.summary.totalPassengers}</Text>
              <Text style={styles.statLabel}>Total Passengers</Text>
            </View>

            {/* Tickets */}
            <View style={[styles.statCard, { backgroundColor: '#E6F9EC' }]}>
              <MaterialIcons name="confirmation-number" size={22} color="#22C55E" />
              <Text style={styles.statValue}>{tripData.summary.ticketsIssued}</Text>
              <Text style={styles.statLabel}>Tickets Issued</Text>
            </View>

            {/* QR Revenue */}
            <View style={[styles.statCard, { backgroundColor: '#FFF8E6' }]}>
              <MaterialCommunityIcons name="qrcode-scan" size={22} color="#F5A623" />
              <Text style={styles.statValue}>Rs. {tripData.summary.qrRevenue.toLocaleString()}</Text>
              <Text style={styles.statLabel}>QR Revenue</Text>
            </View>

            {/* Cash Revenue */}
            <View style={[styles.statCard, { backgroundColor: '#F5EEFF' }]}>
              <MaterialIcons name="attach-money" size={22} color="#7C3AED" />
              <Text style={styles.statValue}>Rs. {tripData.summary.cashRevenue.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Cash Revenue</Text>
            </View>
          </View>

          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Trip Duration</Text>
            <Text style={styles.durationValue}>{tripData.summary.duration}</Text>
          </View>
        </View>

        {/* QR Scan Logs */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>QR Scan Logs</Text>

          {tripData.qrLogs.map((log) => (
            <View key={log.id} style={styles.logItem}>
              <View style={styles.logHeader}>
                <Text style={styles.passengerName}>{log.name}</Text>
                <View style={styles.successIndicator}>
                  <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
                </View>
              </View>
              
              <Text style={styles.qrCode}>{log.qrCode}</Text>
              
              <View style={styles.logDetailsRow}>
                <View style={styles.logDetail}>
                  <Text style={styles.logDetailLabel}>From:</Text>
                  <Text style={styles.logDetailValue}>{log.from}</Text>
                </View>
                <View style={styles.logDetail}>
                  <Text style={styles.logDetailLabel}>To:</Text>
                  <Text style={styles.logDetailValue}>{log.to}</Text>
                </View>
              </View>
              
              <View style={styles.logDetailsRow}>
                <View style={styles.logDetail}>
                  <Text style={styles.logDetailLabel}>Scan:</Text>
                  <Text style={styles.logDetailValue}>{log.scanTime}</Text>
                </View>
                <View style={styles.logDetail}>
                  <Text style={styles.logDetailLabel}>Fare:</Text>
                  <Text style={styles.fareValue}>Rs. {log.fare}</Text>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.viewAllButton} 
            onPress={handleViewAllLogs}
          >
            <Text style={styles.viewAllText}>View All Logs ({tripData.totalQrLogs})</Text>
            <Ionicons name="chevron-down" size={16} color="#0066FF" />
          </TouchableOpacity>
        </View>

        {/* Total Revenue */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Revenue</Text>
          <Text style={styles.totalRevenueValue}>Rs. {tripData.totalRevenue.toLocaleString()}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.pdfButton]} 
            onPress={handleExportPDF}
          >
            <Ionicons name="document-text" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Export PDF</Text>
          </TouchableOpacity>
          
          {/* <TouchableOpacity 
            style={[styles.actionButton, styles.csvButton]} 
            onPress={handleDownloadCSV}
          >
            <MaterialIcons name="file-download" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Download CSV</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.emailButton]} 
            onPress={handleEmailReport}
          >
            <Ionicons name="mail" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Email Report</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpace} />
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
    paddingVertical: 14,
    backgroundColor: '#0066FF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  shareButton: {
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
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066FF',
    marginBottom: 12,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  durationContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  durationLabel: {
    fontSize: 14,
    color: '#666666',
  },
  durationValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  logItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#22C55E',
    paddingLeft: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  successIndicator: {
    padding: 2,
  },
  qrCode: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 6,
  },
  logDetailsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  logDetail: {
    flexDirection: 'row',
    width: '50%',
  },
  logDetailLabel: {
    fontSize: 14,
    color: '#666666',
    width: 50,
  },
  logDetailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  fareValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginTop: 8,
  },
  viewAllText: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  totalRevenueValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 25,
  },
  pdfButton: {
    backgroundColor: '#FF3B30',
  },
  csvButton: {
    backgroundColor: '#22C55E',
  },
  emailButton: {
    backgroundColor: '#0066FF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  bottomSpace: {
    height: 20,
  },
});