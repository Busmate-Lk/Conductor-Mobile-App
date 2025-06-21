import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  // Auto-navigate after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login'); // Navigate to the main app screen
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require('@/assets/images/bus-icon.svg')} // Make sure to add this icon to assets
            style={styles.busIcon}
            contentFit="contain"
          />
           
        </View>
      </View>
      
      <Text style={styles.title}>Busmate LK</Text>
      <Text style={styles.subtitle}>Conductor Version</Text>
      
      <Text style={styles.tagline}>Your Smart Ride Starts Here</Text>
      
      <ActivityIndicator 
        size="large" 
        color="#FFFFFF" 
        style={styles.loadingIndicator} 
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Provided by Busmate LK (Pvt)Ltd</Text>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  busIcon: {
    width: 50,
    height: 50,
  },
  
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.9,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 30,
  },
  loadingIndicator: {
    marginBottom: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
});