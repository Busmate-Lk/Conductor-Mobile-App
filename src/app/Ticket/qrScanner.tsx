import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

// Define types for scan history items
interface ScanHistoryItem {
  id: string;
  name?: string;
  seatNumber?: string;
  status: 'success' | 'failed';
  timestamp: Date;
  ticketId?: string;
}

// Interface for passenger details
interface PassengerDetails {
  name: string;
  seatNumber: string;
  paymentStatus: string;
  ticketId: string;
}

export default function QRScannerScreen() {
  // Camera permission state using the new hooks
  const [permission, requestPermission] = useCameraPermissions();
  
  // Scanning states
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState<'ready' | 'scanning' | 'success' | 'failed'>('ready');
  
  // Passenger details state
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails | null>(null);
  
  // Scan history
  const [recentScans, setRecentScans] = useState<ScanHistoryItem[]>([
    {
      id: '1',
      name: 'John Smith',
      seatNumber: '12A',
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
      ticketId: 'TK20250612-001'
    },
    {
      id: '2',
      status: 'failed',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
    }
  ]);

  // Request camera permissions if not already granted
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  // Handle barcode scanning - updated to match CameraView's format
  const handleBarCodeScanned = ({data, type}: {data: string, type: string}) => {
    if (!scanning || scanned) return;
    
    setScanned(true);
    setScanning(false);
    setScanStatus('scanning');
    
    // Simulate API call to validate ticket
    setTimeout(() => {
      try {
        // Simulate ticket validation logic
        if (data.startsWith('TICKET:')) {
          // Successful scan
          const ticketData = JSON.parse(data.replace('TICKET:', ''));
          setPassengerDetails({
            name: ticketData.name || 'Unknown',
            seatNumber: ticketData.seat || 'Not assigned',
            paymentStatus: ticketData.paid ? 'Paid' : 'Unpaid',
            ticketId: ticketData.id || 'Unknown'
          });
          
          setScanStatus('success');
          
          // Add to recent scans
          setRecentScans(prevScans => [
            {
              id: Date.now().toString(),
              name: ticketData.name,
              seatNumber: ticketData.seat,
              status: 'success',
              timestamp: new Date(),
              ticketId: ticketData.id
            },
            ...prevScans.slice(0, 9) // Keep only the 10 most recent scans
          ]);
        } else {
          // Failed scan
          setScanStatus('failed');
          setPassengerDetails(null);
          
          // Add to recent scans
          setRecentScans(prevScans => [
            {
              id: Date.now().toString(),
              status: 'failed',
              timestamp: new Date()
            },
            ...prevScans.slice(0, 9)
          ]);
        }
      } catch (error) {
        // Handle parsing error
        setScanStatus('failed');
        setPassengerDetails(null);
        
        setRecentScans(prevScans => [
          {
            id: Date.now().toString(),
            status: 'failed',
            timestamp: new Date()
          },
          ...prevScans.slice(0, 9)
        ]);
      }
      
      // Enable scanning again after a delay
      setTimeout(() => {
        if (scanStatus !== 'success') {
          setScanned(false);
          setScanning(true);
        }
      }, 2000);
      
    }, 1500); // Simulate network delay
  };

  // Reset scanner
  const resetScanner = () => {
    setScanned(false);
    setScanning(true);
    setScanStatus('ready');
    setPassengerDetails(null);
  };

  // Handle ticket validation
  const handleValidateTicket = () => {
    if (!passengerDetails) return;
    
    // Here you would implement the actual validation logic
    Alert.alert(
      "Ticket Validated",
      `${passengerDetails.name}'s ticket has been successfully validated.`,
      [{ text: "OK", onPress: resetScanner }]
    );
  };
  
  // View scan history
  const handleViewScanHistory = () => {
    // Navigate to scan history page
    router.push('/Ticket/scanHistory');
  };

  // Format time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  // Render scan status indicator
  const renderScanStatus = () => {
    switch (scanStatus) {
      case 'ready':
        return (
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicatorReady} />
            <Text style={styles.statusText}>Ready to scan</Text>
          </View>
        );
      case 'scanning':
        return (
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicatorScanning} />
            <Text style={styles.statusText}>Scanning...</Text>
          </View>
        );
      case 'success':
        return (
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicatorSuccess} />
            <Text style={styles.statusText}>Scan successful</Text>
          </View>
        );
      case 'failed':
        return (
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicatorFailed} />
            <Text style={styles.statusText}>Scan failed</Text>
          </View>
        );
      default:
        return null;
    }
  };

  // If we don't have permission info yet
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  // If permission is not granted
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is needed to scan QR codes</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR Scanner</Text>
        <View style={styles.menuButton} />
      </View> */}
      
      {/* Camera View - Using CameraView with only back camera */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"]
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.scanOverlay}>
            <View style={styles.scanFrame}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
            </View>
          </View>
          
          <View style={styles.cameraContentOverlay}>
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.cameraViewText}>Camera View</Text>
            </View>
            
            <Text style={styles.instructionText}>
              Position QR code within the frame
            </Text>
            <Text style={styles.subInstructionText}>
              Hold steady for automatic scanning
            </Text>
          </View>
        </CameraView>
      </View>
      
      {/* Scan Status */}
      {renderScanStatus()}
      
      <ScrollView style={styles.detailsScrollView}>
        {/* Passenger Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Passenger Details</Text>
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>
                {scanStatus === 'scanning' ? 'Scanning...' : 'Pending Scan'}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>
              {passengerDetails?.name || '–'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Seat Number</Text>
            <Text style={styles.detailValue}>
              {passengerDetails?.seatNumber || '–'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Status</Text>
            <Text style={styles.detailValue}>
              {passengerDetails?.paymentStatus || '–'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ticket ID</Text>
            <Text style={styles.detailValue}>
              {passengerDetails?.ticketId || '–'}
            </Text>
          </View>
        </View>
        
        {/* Validate Button */}
        <TouchableOpacity 
          style={[
            styles.validateButton,
            (!passengerDetails || scanStatus === 'scanning') && styles.disabledButton
          ]} 
          onPress={handleValidateTicket}
          disabled={!passengerDetails || scanStatus === 'scanning'}
        >
          <Ionicons name="checkmark" size={20} color="white" />
          <Text style={styles.validateButtonText}>Validate Ticket</Text>
        </TouchableOpacity>
        
        {/* Scan History Button */}
        <TouchableOpacity 
          style={styles.historyButton} 
          onPress={handleViewScanHistory}
        >
          <Ionicons name="time" size={20} color="#555" />
          <Text style={styles.historyButtonText}>Scan History</Text>
        </TouchableOpacity>
        
        {/* Recent Scans */}
        <View style={styles.recentScansContainer}>
          <Text style={styles.recentScansTitle}>Recent Scans</Text>
          
          {recentScans.slice(0, 2).map((scan) => (
            <View key={scan.id} style={styles.scanItem}>
              <View style={styles.scanItemLeft}>
                <View style={scan.status === 'success' ? styles.successIcon : styles.failedIcon}>
                  {scan.status === 'success' ? (
                    <Ionicons name="checkmark" size={16} color="#22C55E" />
                  ) : (
                    <Ionicons name="close" size={16} color="#FF3B30" />
                  )}
                </View>
                
                <View>
                  <Text style={styles.scanItemName}>
                    {scan.name || 'Invalid QR'}
                  </Text>
                  {scan.seatNumber && (
                    <Text style={styles.scanItemDetails}>
                      Seat {scan.seatNumber} • {getTimeAgo(scan.timestamp)}
                    </Text>
                  )}
                  {!scan.seatNumber && (
                    <Text style={styles.scanItemDetails}>
                      {getTimeAgo(scan.timestamp)}
                    </Text>
                  )}
                </View>
              </View>
              
              <View style={scan.status === 'success' ? styles.successBadge : styles.failedBadge}>
                <Text style={scan.status === 'success' ? styles.successText : styles.failedText}>
                  {scan.status === 'success' ? 'Success' : 'Failed'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const SCAN_FRAME_SIZE = width * 0.7;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerBackButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
    width: 40, // Fixed width to maintain layout balance
  },
  cameraContainer: {
    width: '100%',
    height: width * 0.9,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanFrame: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE,
    borderWidth: 2,
    borderColor: '#0066FF',
    borderRadius: 16,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    borderTopLeftRadius: 16,
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    borderTopRightRadius: 16,
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    borderBottomLeftRadius: 16,
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    borderBottomRightRadius: 16,
  },
  cameraContentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  cameraIconContainer: {
    alignItems: 'center',
  },
  cameraViewText: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  subInstructionText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  statusIndicatorReady: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  statusIndicatorScanning: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F59E0B',
    marginRight: 8,
  },
  statusIndicatorSuccess: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  statusIndicatorFailed: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  detailsScrollView: {
    flex: 1,
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    padding: 16,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  pendingBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pendingText: {
    fontSize: 12,
    color: '#777',
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#777',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  validateButton: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#A0AEC0',
  },
  validateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  historyButton: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  historyButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  recentScansContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  recentScansTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  scanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  scanItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  failedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scanItemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  scanItemDetails: {
    fontSize: 13,
    color: '#777',
  },
  successBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  failedBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  successText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '500',
  },
  failedText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
  },
  backButton: {
    backgroundColor: '#6c757d',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});