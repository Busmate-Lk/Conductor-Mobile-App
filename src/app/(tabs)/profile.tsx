import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StatusBar,
  ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const userInfo = {
    fullName: "Kamal Perera",
    conductorId: "CON-2024-001",
    email: "kamal.perera@busmate.lk",
    contactNumber: "+94 77 123 4567"
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.emptySpace} />
      </View> */}
      
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
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
          
          {/* Profile Information */}
          <View style={styles.infoSection}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <View style={styles.fieldContainer}>
              <Ionicons name="person" size={22} color="#999" style={styles.fieldIcon} />
              <Text style={styles.fieldText}>{userInfo.fullName}</Text>
            </View>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.fieldLabel}>Conductor ID</Text>
            <View style={styles.fieldContainer}>
              <Ionicons name="card" size={22} color="#999" style={styles.fieldIcon} />
              <Text style={styles.fieldText}>{userInfo.conductorId}</Text>
            </View>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={styles.fieldContainer}>
              <Ionicons name="mail" size={22} color="#999" style={styles.fieldIcon} />
              <Text style={styles.fieldText}>{userInfo.email}</Text>
            </View>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.fieldLabel}>Contact Number</Text>
            <View style={styles.fieldContainer}>
              <Ionicons name="call" size={22} color="#999" style={styles.fieldIcon} />
              <Text style={styles.fieldText}>{userInfo.contactNumber}</Text>
            </View>
          </View>
        </View>
        
        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            // Use navigation to go to the edit_profile page
            // Assumes you are using React Navigation
            // and that 'EditProfile' is the route name for app/profile/edit_profile
            // If using Expo Router, use router.push('/profile/edit_profile')
            // Example below uses Expo Router:
            // import { useRouter } from 'expo-router' at the top of the file

            // Place this hook at the top of your component:
            // const router = useRouter();

            // Then use:
            router.push('/profile/edit_profile');
          }}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        {/* Change Password Section */}
        <TouchableOpacity
          style={styles.passwordSection}
          onPress={() => router.push('/profile/change_password')}
        >
          <View style={styles.passwordLeft}>
            <View style={styles.lockIconContainer}>
              <Ionicons name="lock-closed" size={20} color="#666" />
            </View>
            <View>
              <Text style={styles.passwordTitle}>Change Password</Text>
              <Text style={styles.passwordSubtitle}>Update your account password</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    marginTop: StatusBar.currentHeight ,
    flex: 1,
    backgroundColor: '#F5F7FA',
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
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
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
  infoSection: {
    width: '100%',
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
    padding: 12,
  },
  fieldIcon: {
    marginRight: 12,
  },
  fieldText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIconContainer: {
    backgroundColor: '#F0F2F5',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  passwordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  passwordSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});