import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

// Ticket interface
interface TicketDetails {
  id: string;
  from: string;
  to: string;
  platform: string;
  gate: string;
  passengers: string;
  fare: string;
  issuedOn: string;
  phoneNumber?: string;
}

export default function TicketConfirmationScreen() {
  // Sample ticket data
  const ticket: TicketDetails = {
    id: 'TK-2024-001573',
    from: 'Colombo',
    to: 'Kandy',
    platform: 'Platform 2',
    gate: 'Gate 5',
    passengers: '2 Adults',
    fare: 'Rs.12.50',
    issuedOn: 'Dec 15, 2024 - 2:35 PM',
    phoneNumber: '+94 77 123 4567'
  };

  // Handle going back
  const handleBack = () => {
    router.back();
  };

  // Handle issue another ticket
  const handleIssueAnother = () => {
    router.push('/(tabs)/tickets');
  };

  // Handle download ticket
  const handleDownload = () => {
    // Implement ticket download functionality
    console.log('Downloading ticket...');
  };

  // Handle share ticket
  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing ticket...');
  };

  // Handle view history
  const handleViewHistory = () => {
    router.push('/scanHistory');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ticket Confirmation</Text>
        <View style={{ width: 24 }} />
      </View> */}
      
      {/* Content */}
      <View style={styles.content}>
        {/* Success Message */}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={36} color="#22C55E" />
          </View>
          <Text style={styles.successTitle}>Ticket Successfully Issued!</Text>
          <Text style={styles.successSubtitle}>Your virtual ticket has been generated</Text>
        </View>
        
        {/* Digital Ticket */}
        <View style={styles.ticketCard}>
          {/* Ticket Header */}
          <View style={styles.ticketHeader}>
            <View style={styles.ticketHeaderLeft}>
              <View style={styles.ticketIcon}>
                <Ionicons name="ticket-outline" size={20} color="white" />
              </View>
              <View>
                <Text style={styles.ticketHeaderTitle}>Digital Ticket</Text>
                <Text style={styles.ticketHeaderSubtitle}>Valid for single journey</Text>
              </View>
            </View>
            <View>
              <Text style={styles.ticketIdLabel}>Ticket ID</Text>
              <Text style={styles.ticketIdText}>{ticket.id}</Text>
            </View>
          </View>
          
          {/* Ticket Body */}
          <View style={styles.ticketBody}>
            {/* From - To */}
            <View style={styles.journeyRow}>
              <View>
                <Text style={styles.journeyLabel}>FROM</Text>
                <Text style={styles.journeyLocation}>{ticket.from}</Text>
                <Text style={styles.journeyDetail}>{ticket.platform}</Text>
              </View>
              <View style={styles.journeyMiddle}>
                <View style={styles.journeyLine}>
                  <View style={styles.journeyDot} />
                  <View style={styles.journeyBus}>
                    <FontAwesome5 name="bus" size={14} color="#0066FF" />
                  </View>
                  <View style={styles.journeyDot} />
                </View>
              </View>
              <View style={styles.journeyDestination}>
                <Text style={styles.journeyLabel}>TO</Text>
                <Text style={styles.journeyLocation}>{ticket.to}</Text>
                <Text style={styles.journeyDetail}>{ticket.gate}</Text>
              </View>
            </View>
            
            {/* Divider */}
            <View style={styles.divider} />
            
            {/* Ticket Details */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Passengers</Text>
              <Text style={styles.detailValue}>{ticket.passengers}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Fare</Text>
              <Text style={styles.detailValue}>{ticket.fare}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Issued On</Text>
              <Text style={styles.detailValue}>{ticket.issuedOn}</Text>
            </View>
            
            {/* Divider */}
            <View style={styles.divider} />
            
            {/* QR Code */}
            <View style={styles.qrContainer}>
              <Image 
                source={require('@/assets/images/qr-code.svg')}
                style={styles.qrCode}
                resizeMode="contain"
                // If you don't have an image, use a placeholder or implement a QR library
                // defaultSource={require('@/assets/images/qr-placeholder.png')}
              />
              <Text style={styles.qrText}>Scan QR Code for Validation</Text>
            </View>
          </View>
        </View>
        
        {/* SMS Confirmation */}
        <View style={styles.smsContainer}>
          <Ionicons name="phone-portrait-outline" size={20} color="#22C55E" />
          <View style={styles.smsTextContainer}>
            <Text style={styles.smsTitle}>SMS Sent Successfully</Text>
            <Text style={styles.smsDetails}>
              Ticket details sent to {ticket.phoneNumber}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.primaryButton} 
        onPress={() => { router.push('/(tabs)/tickets'); }}
        >
          <Text style={styles.primaryButtonText}>Issue Another Ticket</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={18} color="#333" style={styles.buttonIcon} />
          <Text style={styles.secondaryButtonText}>Download Ticket</Text>
        </TouchableOpacity>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color="#555" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleViewHistory}>
            <Ionicons name="time-outline" size={20} color="#555" />
            <Text style={styles.actionButtonText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  ticketHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ticketHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ticketHeaderSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  ticketIdLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  ticketIdText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ticketBody: {
    padding: 16,
  },
  journeyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  journeyLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  journeyLocation: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  journeyDetail: {
    fontSize: 13,
    color: '#666',
  },
  journeyMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  journeyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: -15,
  },
  journeyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066FF',
  },
  journeyBus: {
    marginHorizontal: 8,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  journeyDestination: {
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  qrCode: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  qrText: {
    fontSize: 14,
    color: '#666',
  },
  smsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  smsTextContainer: {
    marginLeft: 12,
  },
  smsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22C55E',
  },
  smsDetails: {
    fontSize: 13,
    color: '#4A9D60',
  },
  bottomActions: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  primaryButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  actionButtonText: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
});