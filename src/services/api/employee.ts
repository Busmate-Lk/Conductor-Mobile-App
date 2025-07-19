import { EmployeeProfile, 
  EmployeeSchedule, 
  ShiftStatus,
  UpdateProfileRequest,
  UpdateProfileResponse } from '@/types/employee';
import { apiClient } from '../apiClient';

export const employeeApi = {
  getProfile: async (userId: string): Promise<EmployeeProfile> => {
    return apiClient.authenticatedRequest<EmployeeProfile>(`/conductor/profile?userId=${userId}`);
  },

  updateProfile: async (userId: string, data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    return apiClient.authenticatedRequest<UpdateProfileResponse>(`/conductor/update?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getSchedule: async (conductorId: string): Promise<EmployeeSchedule[]> => {
    return apiClient.authenticatedRequest<EmployeeSchedule[]>(`/conductor/schedule?conductorId=${conductorId}`);
  },

  getShiftStatus: async (conductorId: string): Promise<ShiftStatus> => {
    return apiClient.authenticatedRequest<ShiftStatus>(`/conductor/shift-status?conductorId=${conductorId}`);
  },

  startShift: async (conductorId: string): Promise<{ success: boolean; shiftId: string }> => {
    return apiClient.authenticatedRequest<{ success: boolean; shiftId: string }>(`/conductor/shift/start`, {
      method: 'POST',
      body: JSON.stringify({ conductorId }),
    });
  },

  endShift: async (shiftId: string): Promise<{ success: boolean; summary: any }> => {
    return apiClient.authenticatedRequest<{ success: boolean; summary: any }>(`/conductor/shift/end`, {
      method: 'POST',
      body: JSON.stringify({ shiftId }),
    });
  },
};
