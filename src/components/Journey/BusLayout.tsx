import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Seat status: 0 = Available, 1 = Booked & Validated, 2 = Booked Not Validated, 3 = Blocked/Canceled
interface SeatData {
  [key: string]: number;
}

export default function BusLayout() {
  // Seat data - in a real app, you would fetch this from an API
  const seatData: SeatData = {
    'A1': 1, 'A2': 2, 'A3': 0, 'A4': 1, 'A5': 0,
    'B1': 1, 'B2': 1, 'B3': 2, 'B4': 0, 'B5': 1,
    'C1': 3, 'C2': 1, 'C3': 1, 'C4': 2, 'C5': 0,
    'D1': 1, 'D2': 0, 'D3': 1, 'D4': 1, 'D5': 2,
    'E1': 2, 'E2': 1, 'E3': 0, 'E4': 0, 'E5': 1,
    'F1': 1, 'F2': 1, 'F3': 2, 'F4': 1, 'F5': 0,
    'G1': 0, 'G2': 1, 'G3': 1, 'G4': 2, 'G5': 1,
    'H1': 1, 'H2': 0, 'H3': 0, 'H4': 1, 'H5': 1,
    'I1': 2, 'I2': 1, 'I3': 1, 'I4': 0, 'I5': 1,
    'J1': 1, 'J2': 1, 'J3': 2, 'J4': 1, 'J5': 0,
    'K1': 1, 'K2': 0, 'K3': 2, 'K4': 1, 'K5': 0,
  };
  
  // Define rows and columns for seat layout
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const cols = [1, 2, 3, 4, 5];
  
  // Function to get style for a seat based on its status
  const getSeatStyle = (status: number) => {
    switch(status) {
      case 1: // Booked & Validated
        return styles.seatBookedValidated;
      case 2: // Booked Not Validated
        return styles.seatBookedNotValidated;
      case 3: // Blocked/Canceled
        return styles.seatBlocked;
      default: // Available
        return styles.seatAvailable;
    }
  };
  
  // Function to get text style for a seat based on its status
  const getSeatTextStyle = (status: number) => {
    switch(status) {
      case 1: // Booked & Validated
        return styles.seatTextBooked;
      case 2: // Booked Not Validated
        return styles.seatTextBooked;
      case 3: // Blocked/Canceled
        return styles.seatTextBlocked;
      default: // Available
        return styles.seatTextAvailable;
    }
  };
  
  // Function to handle seat press
  const handleSeatPress = (seatId: string) => {
    console.log(`Seat ${seatId} pressed`);
    // Additional logic for seat selection
  };
  
  // Function to render a single seat
  const renderSeat = (row: string, col: number) => {
    const seatId = `${row}${col}`;
    const seatStatus = seatData[seatId] || 0;
    
    return (
      <TouchableOpacity
        key={seatId}
        style={[styles.seat, getSeatStyle(seatStatus)]}
        onPress={() => handleSeatPress(seatId)}
      >
        <Text style={[styles.seatText, getSeatTextStyle(seatStatus)]}>{seatId}</Text>
      </TouchableOpacity>
    );
  };
  
  // Function to render a row of seats
  const renderRow = (row: string) => {
    return (
      <View key={row} style={styles.seatRow}>
        {cols.map(col => {
          // Create gap in the middle (aisle) after position 2
          if (col === 3) {
            return (
              <React.Fragment key={`gap-${row}-${col}`}>
                <View style={styles.aisle} />
                {renderSeat(row, col)}
              </React.Fragment>
            );
          }
          return renderSeat(row, col);
        })}
      </View>
    );
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Driver Seat */}
      <View style={styles.driverSeatContainer}>
        <View style={styles.driverSeat}>
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={styles.driverText}>Driver</Text>
        </View>
      </View>
      
      {/* Bus Layout */}
      <View style={styles.busLayout}>
        {rows.map(row => renderRow(row))}
      </View>
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatBookedValidated]} />
            <Text style={styles.legendText}>Booked & Validated</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatBookedNotValidated]} />
            <Text style={styles.legendText}>Booked, Not Validated</Text>
          </View>
        </View>
        
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatAvailable]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatBlocked]} />
            <Text style={styles.legendText}>Blocked/Canceled</Text>
          </View>
        </View>
      </View>
      
      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const SEAT_WIDTH = (width - 45 - 20 - 16) / 5; // (Screen width - padding - aisle - gap between seats) / number of seats per row

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  driverSeatContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
    marginRight: 85,
    marginTop: 16,
  },
  driverSeat: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
  busLayout: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  seat: {
    width: SEAT_WIDTH,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 3,
  },
  seatAvailable: {
    backgroundColor: '#F5F5F5',
  },
  seatBookedValidated: {
    backgroundColor: '#22C55E',
  },
  seatBookedNotValidated: {
    backgroundColor: '#F5C518',
  },
  seatBlocked: {
    backgroundColor: '#FF3B30',
  },
  seatText: {
    fontWeight: '600',
    fontSize: 14,
  },
  seatTextAvailable: {
    color: '#333333',
  },
  seatTextBooked: {
    color: '#FFFFFF',
  },
  seatTextBlocked: {
    color: '#FFFFFF',
  },
  aisle: {
    width: 20,
  },
  legendContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginHorizontal: 16,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#555555',
  },
});