import FingerprintModal from '@/components/Login/FingerprintModel';
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Animated,
  Dimensions,
  Keyboard,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showFingerprint, setShowFingerprint] = useState(false);
  

  const handleSignIn = () => {
    // Implement your authentication logic here
    if (username && password) {
      router.replace('/(tabs)');
    }
  };

  // Handle fingerprint authentication
  const handleFingerprintAuth = () => {
    setShowFingerprint(true);
  };

  // Handle cancel fingerprint
  const handleCancelFingerprint = () => {
    setShowFingerprint(false);
  };

  // Simulate fingerprint authentication success
  const simulateAuthentication = () => {
    // Simulate scanning delay
    setTimeout(() => {
      setShowFingerprint(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="bus-outline" size={20} color="white" />
          <Text style={styles.headerText}>Busmate LK</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#D3D3D3" />
          </View>
          
          <Text style={styles.welcomeText}>Welcome Back</Text>
          
          {/* Username field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
              <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
            </View>
          </View>
          
          {/* Password field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            </View>
          </View>
          
          {/* Remember me and forgot password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={styles.rememberContainer} 
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={styles.checkbox}>
                {rememberMe && <Ionicons name="checkmark" size={16} color="#0066FF" />}
              </View>
              <Text style={styles.rememberText}>Remember Me</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          
          {/* Sign In Button */}
          <TouchableOpacity style={styles.signInButton} 
           onPress={() => { router.push('/(tabs)/home'); }}
          >
            <Ionicons name="lock-closed-outline" size={16} color="white" style={{marginRight: 8}} />
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          
          {/* OR Separator */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>
          
          {/* Fingerprint Button */}
          <TouchableOpacity 
            style={styles.fingerprintContainer} 
            onPress={handleFingerprintAuth}
          >
            <Ionicons name="finger-print" size={60} color="#0066FF" />
          </TouchableOpacity>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
                    <Text style={styles.copyright}>© {new Date().getFullYear()} Busmate LK. All rights reserved.</Text>
          

        </View>
      </View>
      <FingerprintModal
  visible={showFingerprint}
  onCancel={handleCancelFingerprint}
  onAuthenticate={() => {
    // You can call simulateAuthentication() or your real auth logic here
    setShowFingerprint(false);
    router.replace('/(tabs)/home');
  }}
/>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  card: {
    backgroundColor: 'white',
    // borderRadius: 10,
    width: '100%',
    // maxWidth: 400,
    overflow: 'hidden',
    // elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    
    backgroundColor: '#0066FF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 8,
    fontSize: 14,
  },
  inputIcon: {
    marginHorizontal: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 2,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    fontSize: 12,
    color: '#666',
  },
  forgotText: {
    fontSize: 12,
    color: '#0066FF',
  },
  signInButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    width: '100%',
    padding: 12,
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 14,
  },
  fingerprintContainer: {
    marginTop: 8,
    marginBottom: 36,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: '#999',
    marginBottom: 30,
  },
  copyright: {
    color: '#9CA3AF',
    fontSize: 12,
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
  }
});