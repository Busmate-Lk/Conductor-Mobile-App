import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

// Note: For charts in the "Daily Passenger Trend" section, you would need to install
// a charting library like react-native-chart-kit

type TimeFilter = 'today' | 'lastWeek' | 'lastMonth' | 'custom';

type InsightsData = {
  totalPassengers: {
    value: number;
    trend: string;
    trending: string;
  };
  moneyCollected: {
    value: number;
    trend: string;
    trending: string;
  };
  tripsCompleted: {
    value: number;
    trend: string;
    trending: string;
  };
  qrValidations: {
    value: number;
    trend: string;
    trending: string;
  };
  paymentBreakdown: {
    cash: {
      amount: number;
      percentage: number;
    };
    qr: {
      amount: number;
      percentage: number;
    };
  };
};

export default function InsightsScreen() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<'from' | 'to'>('from');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  // Mock data
  const insightsData: Record<TimeFilter, InsightsData> = {
    today: { 
      totalPassengers: {
        value: 244,
        trend: '+12% from yesterday',
        trending: 'up'
      },
      moneyCollected: {
        value: 2470,
        trend: '+8% from yesterday',
        trending: 'up'
      },
      tripsCompleted: {
        value: 12,
        trend: 'Same as yesterday',
        trending: 'same'
      },
      qrValidations: {
        value: 189,
        trend: '+15% from yesterday',
        trending: 'up'
      },
      paymentBreakdown: {
        cash: {
          amount: 1482,
          percentage: 60
        },
        qr: {
          amount: 988,
          percentage: 40
        }
      }
    },
    lastWeek: {
      totalPassengers: {
        value: 1680,
        trend: '+18% from previous week',
        trending: 'up'
      },
      moneyCollected: {
        value: 16800,
        trend: '+22% from previous week',
        trending: 'up'
      },
      tripsCompleted: {
        value: 84,
        trend: '+5% from previous week',
        trending: 'up'
      },
      qrValidations: {
        value: 1260,
        trend: '+28% from previous week',
        trending: 'up'
      },
      paymentBreakdown: {
        cash: {
          amount: 10080,
          percentage: 60
        },
        qr: {
          amount: 6720,
          percentage: 40
        }
      }
    },
    lastMonth: {
      totalPassengers: {
        value: 7320,
        trend: '+15% from previous month',
        trending: 'up'
      },
      moneyCollected: {
        value: 73200,
        trend: '+12% from previous month',
        trending: 'up'
      },
      tripsCompleted: {
        value: 366,
        trend: '+8% from previous month',
        trending: 'up'
      },
      qrValidations: {
        value: 5490,
        trend: '+25% from previous month',
        trending: 'up'
      },
      paymentBreakdown: {
        cash: {
          amount: 43920,
          percentage: 60
        },
        qr: {
          amount: 29280,
          percentage: 40
        }
      }
    },
    custom: {
      totalPassengers: {
        value: 1520,
        trend: 'For selected period',
        trending: 'same'
      },
      moneyCollected: {
        value: 15200,
        trend: 'For selected period',
        trending: 'same'
      },
      tripsCompleted: {
        value: 76,
        trend: 'For selected period',
        trending: 'same'
      },
      qrValidations: {
        value: 1140,
        trend: 'For selected period',
        trending: 'same'
      },
      paymentBreakdown: {
        cash: {
          amount: 9120,
          percentage: 60
        },
        qr: {
          amount: 6080,
          percentage: 40
        }
      }
    }
  };

  // Get current selected period data
  const currentData = insightsData[timeFilter];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      if (datePickerMode === 'from') {
        setFromDate(selectedDate);
      } else {
        setToDate(selectedDate);
      }
    }
  };

  const openDatePicker = (mode: 'from' | 'to') => {
    setDatePickerMode(mode);
    setShowDatePicker(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Prepare chart data for payment methods
  const getPaymentChartData = () => {
    return [
      {
        name: 'Cash',
        population: currentData.paymentBreakdown.cash.amount,
        color: '#0066FF',
        legendFontColor: '#333',
        legendFontSize: 14,
      },
      {
        name: 'QR/Digital',
        population: currentData.paymentBreakdown.qr.amount,
        color: '#22C55E',
        legendFontColor: '#333',
        legendFontSize: 14,
      }
    ];
  };

  const screenWidth = Dimensions.get('window').width;
  
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insights</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333" />
        </TouchableOpacity>
      </View> */}
      
      {/* Time Period Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'today' && styles.activeFilterButton]} 
            onPress={() => setTimeFilter('today')}
          >
            <Text style={[styles.filterText, timeFilter === 'today' && styles.activeFilterText]}>Today</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'lastWeek' && styles.activeFilterButton]} 
            onPress={() => setTimeFilter('lastWeek')}
          >
            <Text style={[styles.filterText, timeFilter === 'lastWeek' && styles.activeFilterText]}>Last Week</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'lastMonth' && styles.activeFilterButton]} 
            onPress={() => setTimeFilter('lastMonth')}
          >
            <Text style={[styles.filterText, timeFilter === 'lastMonth' && styles.activeFilterText]}>Last Month</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'custom' && styles.activeFilterButton]} 
            onPress={() => setTimeFilter('custom')}
          >
            <Text style={[styles.filterText, timeFilter === 'custom' && styles.activeFilterText]}>Custom</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Custom Date Range (shown when custom filter is selected) */}
      {timeFilter === 'custom' && (
        <View style={styles.dateRangeContainer}>
          <Text style={styles.dateRangeTitle}>Select Date Range</Text>
          <View style={styles.dateRangeButtons}>
            <TouchableOpacity style={styles.dateButton} onPress={() => openDatePicker('from')}>
              <Text style={styles.dateButtonLabel}>From</Text>
              <Text style={styles.dateButtonValue}>{formatDate(fromDate)}</Text>
            </TouchableOpacity>
            
            <Text style={styles.dateRangeSeparator}>to</Text>
            
            <TouchableOpacity style={styles.dateButton} onPress={() => openDatePicker('to')}>
              <Text style={styles.dateButtonLabel}>To</Text>
              <Text style={styles.dateButtonValue}>{formatDate(toDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          {/* Total Passengers */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Passengers</Text>
            <View style={styles.metricValueRow}>
              <Ionicons name="people" size={20} color="#0066FF" style={styles.metricIcon} />
              <Text style={styles.metricValue}>{currentData.totalPassengers.value}</Text>
            </View>
            <Text style={[
              styles.trendText, 
              currentData.totalPassengers.trending === 'up' ? styles.trendUp : 
              currentData.totalPassengers.trending === 'down' ? styles.trendDown : 
              styles.trendSame
            ]}>
              {currentData.totalPassengers.trend}
            </Text>
          </View>
          
          {/* Money Collected */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Money Collected</Text>
            <View style={styles.metricValueRow}>
              <FontAwesome5 name="money-bill-wave" size={18} color="#0066FF" style={styles.metricIcon} />
              <Text style={styles.metricValue}>RS {currentData.moneyCollected.value}</Text>
            </View>
            <Text style={[
              styles.trendText, 
              currentData.moneyCollected.trending === 'up' ? styles.trendUp : 
              currentData.moneyCollected.trending === 'down' ? styles.trendDown : 
              styles.trendSame
            ]}>
              {currentData.moneyCollected.trend}
            </Text>
          </View>
          
          {/* Trips Completed */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Trips Completed</Text>
            <View style={styles.metricValueRow}>
              <MaterialCommunityIcons name="map-marker-path" size={20} color="#0066FF" style={styles.metricIcon} />
              <Text style={styles.metricValue}>{currentData.tripsCompleted.value}</Text>
            </View>
            <Text style={[
              styles.trendText, 
              currentData.tripsCompleted.trending === 'up' ? styles.trendUp : 
              currentData.tripsCompleted.trending === 'down' ? styles.trendDown : 
              styles.trendSame
            ]}>
              {currentData.tripsCompleted.trend}
            </Text>
          </View>
          
          {/* QR Validations */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>QR Validations</Text>
            <View style={styles.metricValueRow}>
              <MaterialIcons name="qr-code-scanner" size={20} color="#0066FF" style={styles.metricIcon} />
              <Text style={styles.metricValue}>{currentData.qrValidations.value}</Text>
            </View>
            <Text style={[
              styles.trendText, 
              currentData.qrValidations.trending === 'up' ? styles.trendUp : 
              currentData.qrValidations.trending === 'down' ? styles.trendDown : 
              styles.trendSame
            ]}>
              {currentData.qrValidations.trend}
            </Text>
          </View>
        </View>
        
        {/* Payment Breakdown */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Breakdown</Text>
          <View style={styles.paymentBreakdownContainer}>
            <View style={styles.paymentRow}>
              <View style={styles.paymentLabelContainer}>
                <View style={[styles.dot, {backgroundColor: '#0066FF'}]} />
                <Text style={styles.paymentLabel}>Cash Payments</Text>
              </View>
              <Text style={styles.paymentValue}>RS. {currentData.paymentBreakdown.cash.amount} ({currentData.paymentBreakdown.cash.percentage}%)</Text>
            </View>
            
            <View style={styles.paymentRow}>
              <View style={styles.paymentLabelContainer}>
                <View style={[styles.dot, {backgroundColor: '#22C55E'}]} />
                <Text style={styles.paymentLabel}>QR Payments</Text>
              </View>
              <Text style={styles.paymentValue}>RS. {currentData.paymentBreakdown.qr.amount} ({currentData.paymentBreakdown.qr.percentage}%)</Text>
            </View>
          </View>
        </View> */}
        
       
        
        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods Distribution</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={getPaymentChartData()}
              width={screenWidth - 64}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"0"}
              absolute={false}
            />
            
            {/* Total Revenue Display Below Chart */}
            <View style={styles.totalRevenueContainer}>
              <Text style={styles.totalRevenueLabel}>Total Revenue</Text>
              <Text style={styles.totalRevenueValue}>RS {currentData.moneyCollected.value}</Text>
              <Text style={styles.totalRevenuePeriod}>
                {timeFilter === 'today' ? 'Today' : 
                 timeFilter === 'lastWeek' ? 'Last Week' : 
                 timeFilter === 'lastMonth' ? 'Last Month' : 
                 'Custom Period'}
              </Text>
            </View>
            
            {/* Enhanced Legend */}
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#0066FF' }]} />
                <View style={styles.legendContent}>
                  <Text style={styles.legendLabel}>Cash Payments</Text>
                  <Text style={styles.legendAmount}>RS {currentData.paymentBreakdown.cash.amount}</Text>
                  <Text style={styles.legendPercent}>{currentData.paymentBreakdown.cash.percentage}% of total</Text>
                </View>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#22C55E' }]} />
                <View style={styles.legendContent}>
                  <Text style={styles.legendLabel}>QR/Digital Payments</Text>
                  <Text style={styles.legendAmount}>RS {currentData.paymentBreakdown.qr.amount}</Text>
                  <Text style={styles.legendPercent}>{currentData.paymentBreakdown.qr.percentage}% of total</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Add bottom padding for scrolling */}
        <View style={{height: 20}} />
      </ScrollView>
      
      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Select {datePickerMode === 'from' ? 'From' : 'To'} Date
              </Text>
              <DateTimePicker
                value={datePickerMode === 'from' ? fromDate : toDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
              {Platform.OS === 'ios' && (
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.modalButton} 
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.modalButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
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
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  menuButton: {
    padding: 4,
  },
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterScrollContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#0066FF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066FF',
    marginBottom: 8,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricIcon: {
    marginRight: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  trendText: {
    fontSize: 12,
  },
  trendUp: {
    color: '#22C55E',
  },
  trendDown: {
    color: '#EF4444',
  },
  trendSame: {
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066FF',
    marginBottom: 12,
  },
  activeRouteContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  activeRouteName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeRoutePassengers: {
    fontSize: 14,
    color: '#666',
  },
  paymentBreakdownContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#333',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  chartPlaceholder: {
    height: 180,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateRangeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  dateRangeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066FF',
    marginBottom: 12,
  },
  dateRangeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dateButtonLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateButtonValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  dateRangeSeparator: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0066FF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 24,
  },
  chart: {
    height: 250,
    marginBottom: 16,
  },
  totalRevenueContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: '100%',
 
  },
  totalRevenueLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  totalRevenueValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 4,
  },
  totalRevenuePeriod: {
    fontSize: 12,
    color: '#999',
  },
  chartLegend: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    width: '100%',
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    marginTop: 2,
  },
  legendContent: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  legendAmount: {
    fontSize: 18,
    color: '#0066FF',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  legendPercent: {
    fontSize: 13,
    color: '#666',
  },
  legendText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});