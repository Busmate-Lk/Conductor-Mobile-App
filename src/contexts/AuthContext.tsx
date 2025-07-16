import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'conductor'; // Only conductor role allowed
  busId?: string;
  route?: string;
  contactNumber?: string;
  employeeId?: string; // Add employee ID
  fullName?: string;   // Add full name
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  saveUserData: (userData: User, accessToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  isBiometricSupported: boolean;
  hasBiometricCredentials: boolean;
   fetchEmployeeDetails: () => Promise<void>; // Add this function
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasBiometricCredentials, setHasBiometricCredentials] = useState(false);

  // Load user data and check biometric support on app start
  useEffect(() => {
    loadUserData();
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      
      setIsBiometricSupported(compatible && enrolled);
      setHasBiometricCredentials(enrolled);
      
      console.log('Biometric support:', { compatible, enrolled });
    } catch (error) {
      console.error('Error checking biometric support:', error);
      setIsBiometricSupported(false);
    }
  };

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('user');
      const authToken = await AsyncStorage.getItem('authToken');
      
      if (userData && authToken) {
        const parsedUser = JSON.parse(userData);
        // Only allow conductor role
        if (parsedUser.role === 'conductor') {
          setUser(parsedUser);
        } else {
          // Clear invalid role data
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('authToken');
        }
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    setIsLoading(true);
    const response = await fetch('http://192.168.17.101:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log('Login response:', data);
    
    // Only allow login if app_role is 'Conductor' and access_token exists
    if (
      response.ok &&
      data &&
      data.access_token &&
      data.user &&
      data.user.app_role === 'Conductor'
    ) {
      // Map backend user to frontend User type
      const userData: User = {
        id: data.user.id,
        name: data.user.email, // Use email as name for now, can be updated later
        email: data.user.email,
        role: 'conductor',
        busId: data.user.user_metadata?.busId,
        route: data.user.user_metadata?.route,
        contactNumber: data.user.user_metadata?.contactNumber,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('authToken', data.access_token);
      setUser(userData);
      return true;
    }
    return false; // Invalid credentials, missing token/user, or not a conductor
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  } finally {
    setIsLoading(false);
  }
};


  const saveUserData = async (userData: User, accessToken?: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      if (accessToken) {
        await AsyncStorage.setItem('authToken', accessToken);
      }
      setUser(userData);
    } catch (error) {
      console.error('Failed to save user data:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('authToken');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAuthenticated = !!user && user.role === 'conductor'; 
  

 const fetchEmployeeDetails = async (): Promise<void> => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('user');
      
      if (!authToken || !userData) {
        console.error('No auth token or user data found');
        return;
      }

      const parsedUser = JSON.parse(userData);
      
      // Call your employee details API
      const response = await fetch(`http://10.22.162.220:8080/api/conductor/profile/${parsedUser.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      


      if (response.ok) {
        const employeeData = await response.json();
        console.log('Employee details:', employeeData);
        
        // Update user with employee details
        const updatedUser: User = {
          ...parsedUser,
          employeeId: employeeData.employeeId || employeeData.employee_id,
          fullName: employeeData.fullName || employeeData.name,
          name: employeeData.fullName || employeeData.name || parsedUser.name,
          busId: employeeData.busId || parsedUser.busId,
          route: employeeData.route || parsedUser.route,
          contactNumber: employeeData.contactNumber || employeeData.phone || parsedUser.contactNumber,
        };
        
        // Save updated user data
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        console.error('Failed to fetch employee details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        saveUserData,
        logout,
        isBiometricSupported,
        hasBiometricCredentials,
        fetchEmployeeDetails, // Add this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};