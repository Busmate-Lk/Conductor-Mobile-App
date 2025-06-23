import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TicketPrintingScreen() {
  const [progress, setProgress] = useState(0);
  const progressAnimation = new Animated.Value(0);
  
  // Simulate printing progress
  useEffect(() => {
    // Start progress animation
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    
    // Update progress state for additional logic if needed
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.02;
        if (newProgress >= 1) {
          clearInterval(interval);
          // Navigate to confirmation screen after completion
          setTimeout(() => {
            router.replace('/Ticket/ticketIssuePage');
          }, 500);
          return 1;
        }
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate width for progress bar
  const width = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />
      
      {/* Upper shadow */}
      <View style={styles.upperShadow} />
      
      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Ticket Info (faded in background) */}
        {/* <View style={styles.ticketInfoContainer}>
          <Text style={styles.busNumber}>Bus 4.50</Text>
          <Text style={styles.destination}>Downtown</Text>
        </View> */}
        
        {/* QR Code */}
        <View style={styles.qrContainer}>
          <Image
            source={require('@/assets/images/qr-placeholder.svg')}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Printing Message */}
        <Text style={styles.printingText}>Printing Ticket...</Text>
        <Text style={styles.waitText}>Please wait</Text>
        
        {/* Loading Spinner */}
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width }]} />
        </View>
        
        {/* Volume Control */}
        <View style={styles.volumeContainer}>
          <Ionicons name="volume-medium" size={24} color="rgba(255,255,255,0.7)" />
          <View style={styles.volumeBars}>
            <View style={[styles.volumeBar, styles.activeVolumeBar]} />
            <View style={[styles.volumeBar, styles.activeVolumeBar]} />
            <View style={[styles.volumeBar, styles.activeVolumeBar]} />
            <View style={[styles.volumeBar, styles.inactiveVolumeBar]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
  },
  upperShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#000',
    opacity: 0.2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  ticketInfoContainer: {
    position: 'absolute',
    top: '15%',
    alignItems: 'center',
    opacity: 0.6,
  },
  busNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  destination: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  qrContainer: {
    marginBottom: 60,
  },
  qrImage: {
    width: 100,
    height: 100,
    opacity: 0.5,
  },
  printingText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  waitText: {
    color: '#FFFFFF',
    fontSize: 20,
    opacity: 0.8,
    marginBottom: 30,
  },
  spinner: {
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  volumeBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
    marginLeft: 10,
  },
  volumeBar: {
    width: 4,
    marginHorizontal: 2,
    borderRadius: 1,
  },
  activeVolumeBar: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: '100%',
  },
  inactiveVolumeBar: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: '50%',
  },
});