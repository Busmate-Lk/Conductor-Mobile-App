import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
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
  mostActiveRoute: {
    route: string;
    passengers: number;
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

  // Mock data
  const insightsData: Record<TimeFilter, InsightsData> = {
    today: {
      totalPassengers: {
        value: 247,
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
      mostActiveRoute: {
        route: 'Colombo - Kandy',
        passengers: 78
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
        value: 0,
        trend: '',
        trending: 'same'
      },
      moneyCollected: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      tripsCompleted: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      qrValidations: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      mostActiveRoute: {
        route: '',
        passengers: 0
      },
      paymentBreakdown: {
        cash: {
          amount: 0,
          percentage: 0
        },
        qr: {
          amount: 0,
          percentage: 0
        }
      }
    },
    lastMonth: {
      totalPassengers: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      moneyCollected: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      tripsCompleted: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      qrValidations: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      mostActiveRoute: {
        route: '',
        passengers: 0
      },
      paymentBreakdown: {
        cash: {
          amount: 0,
          percentage: 0
        },
        qr: {
          amount: 0,
          percentage: 0
        }
      }
    },
    custom: {
      totalPassengers: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      moneyCollected: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      tripsCompleted: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      qrValidations: {
        value: 0,
        trend: '',
        trending: 'same'
      },
      mostActiveRoute: {
        route: '',
        passengers: 0
      },
      paymentBreakdown: {
        cash: {
          amount: 0,
          percentage: 0
        },
        qr: {
          amount: 0,
          percentage: 0
        }
      }
    }
  };

  // Get current selected period data
  const currentData = insightsData[timeFilter];

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
        
        {/* Most Active Route */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Active Route</Text>
            <MaterialIcons name="route" size={20} color="#0066FF" />
          </View>
          <View style={styles.activeRouteContainer}>
            <Text style={styles.activeRouteName}>{currentData.mostActiveRoute.route}</Text>
            <Text style={styles.activeRoutePassengers}>{currentData.mostActiveRoute.passengers} passengers today</Text>
          </View>
        </View>
        
        {/* Payment Breakdown */}
        <View style={styles.section}>
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
        </View>
        
        {/* Passengers per Route */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passengers per Route</Text>
          {/* This would typically contain a chart */}
          <View style={styles.chartPlaceholder}>
            {/* Chart would be implemented here */}
          </View>
        </View>
        
        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.chartPlaceholder}>
            {/* Chart would be implemented here */}
          </View>
        </View>
        
        {/* Daily Passenger Trend */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Passenger Trend</Text>
          <View style={styles.chartPlaceholder}>
            {/* Chart would be implemented here */}
          </View>
        </View>
        
        {/* Add bottom padding for scrolling */}
        <View style={{height: 20}} />
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
});