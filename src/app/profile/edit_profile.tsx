import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput,
  SafeAreaView, 
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function EditProfileScreen() {
  const [userInfo, setUserInfo] = useState({
    fullName: "Kasun Perera",
    conductorId: "CON-2024-001",
    email: "kasun.perera@gmail.com",
    contactNumber: "+94 77 123 4567",
    nationalId: "199512345678",
    address: "No. 123, Main Street, Colombo 07, Sri Lanka"
  });

  const [passwordSectionOpen, setPasswordSectionOpen] = useState(false);

  const handleSaveChanges = () => {
    // Save profile changes logic here
    console.log("Saving profile changes:", userInfo);
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.emptySpace} />
      </View> */}
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Profile Picture */}
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('@/assets/images/profile-pic.jpg')} 
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Full Name */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={userInfo.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
          </View>
          
          {/* Conductor ID */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Conductor ID</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={userInfo.conductorId}
              editable={false}
            />
          </View>
          
          {/* Email Address */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={userInfo.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          {/* Contact Number */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Contact Number</Text>
            <TextInput
              style={styles.input}
              value={userInfo.contactNumber}
              onChangeText={(text) => handleInputChange('contactNumber', text)}
              keyboardType="phone-pad"
            />
          </View>
          
          {/* National ID */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>NIC / National ID</Text>
            <TextInput
              style={styles.input}
              value={userInfo.nationalId}
              onChangeText={(text) => handleInputChange('nationalId', text)}
            />
          </View>
          
          {/* Address */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={userInfo.address}
              onChangeText={(text) => handleInputChange('address', text)}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          
          {/* Change Password Section */}
          <TouchableOpacity 
            style={styles.passwordHeader}
            onPress={() => router.push('/profile/change_password')}
          >
            <Text style={styles.passwordHeaderText}>Change Password</Text>
            <Ionicons 
              name="chevron-forward" 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          {/* Save Changes Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          
          {/* Add bottom padding for scrolling */}
          <View style={{height: 40}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  emptySpace: {
    width: 28, // Match the size of the back button for alignment
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileImageContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0066FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  disabledInput: {
    opacity: 0.7,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  passwordHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  saveButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});