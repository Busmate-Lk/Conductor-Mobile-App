import { useAuth } from '@/hooks/auth/useAuth';
import { employeeApi } from '@/services/api/employee';
import { UpdateProfileRequest } from '@/types/employee';
import { useCallback, useState } from 'react';

export const useEmployeeProfile = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user?.id) {
      setError('No user ID found');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const profile = await employeeApi.getProfile(user.id);
      
      const updatedUser = {
        ...user,
        employeeId: profile.employee_id,
        fullName: profile.fullName,
        name: profile.fullName || user.name,
        username: profile.username,
        busId: profile.assign_operator_id,
        contactNumber: profile.phoneNumber,
        nicNumber: profile.nicNumber,
        dateofBirth: profile.dateofBirth,
        gender: profile.gender,
        shiftStatus: profile.shiftStatus,
      };
      
      await updateUser(updatedUser);
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
      setError(errorMessage);
      console.error('Error fetching employee profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, updateUser]);

  const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
    if (!user?.id) {
      setError('No user ID found');
      return { success: false, error: 'No user ID found' };
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await employeeApi.updateProfile(user.id, data);

      console.log('Profile update response:', JSON.stringify(response, null, 2));
      
      if (response && (response.userld || response.userId || response.fullName)) {
        // Update user in context with new data
        const updatedUser = {
        ...user,
        fullName: response.fullName || user.fullName,
        name: response.fullName || user.name,
        contactNumber: response.phoneNumber || user.contactNumber,
        employeeId: response.employee_id || user.employeeId,
        email: response.email || user.email,
        username: response.username || user.username,
        busId: response.assign_operator_id || user.busId,
        role: 'conductor' as const,
        // Keep existing values for fields not in response
        nicNumber: response.nicNumber || user.nicNumber,
        dateofBirth: response.dateOfBirth || user.dateofBirth,
        gender: response.gender || user.gender,
        shiftStatus: response.shift_status || user.shiftStatus,
      };
      
          await updateUser(updatedUser);
      return { success: true, data: response };
    } else {
      // Response doesn't have expected fields - treat as error
      const errorMessage = 'Failed to update profile - invalid response';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
    setError(errorMessage);
    console.error('Error updating profile:', error);
    return { success: false, error: errorMessage };
  } finally {
    setIsLoading(false);
  }
}, [user, updateUser]);

  return {
    fetchProfile,
    updateProfile,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
