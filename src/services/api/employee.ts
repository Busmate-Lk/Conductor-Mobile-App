import { EmployeeProfile, 
  EmployeeSchedule, 
  ShiftStatus,
  UpdateProfileRequest,
  UpdateProfileResponse } from '@/types/employee';
import { apiClient } from '../apiClient';

export const employeeApi = {
  // Fetch employee profile by userId
  getProfile: async (userId: string): Promise<EmployeeProfile> => {
    return apiClient.authenticatedRequest<EmployeeProfile>(`/conductor/profile?userId=${userId}`);
  },
// Update employee profile
  updateProfile: async (userId: string, data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    return apiClient.authenticatedRequest<UpdateProfileResponse>(`/conductor/update?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
// Fetch employee schedule by conductorId
  getSchedule: async (conductorId: string): Promise<EmployeeSchedule[]> => {
    return apiClient.authenticatedRequest<EmployeeSchedule[]>(`/conductor/schedule?conductorId=${conductorId}`);
  },
// Fetch shift status for a conductor
  getShiftStatus: async (conductorId: string): Promise<ShiftStatus> => {
    return apiClient.authenticatedRequest<ShiftStatus>(`/conductor/shift-status?conductorId=${conductorId}`);
  },
// Start shifts for a conductor
  startShift: async (conductorId: string): Promise<{ success: boolean; shiftId: string }> => {
    return apiClient.authenticatedRequest<{ success: boolean; shiftId: string }>(`/conductor/shift/start`, {
      method: 'POST',
      body: JSON.stringify({ conductorId }),
    });
  },
// End shifts for a conductor
  endShift: async (shiftId: string): Promise<{ success: boolean; summary: any }> => {
    return apiClient.authenticatedRequest<{ success: boolean; summary: any }>(`/conductor/shift/end`, {
      method: 'POST',
      body: JSON.stringify({ shiftId }),
    });
  },
};
