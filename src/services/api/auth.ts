import { LoginRequest, LoginResponse } from '@/types/auth';
import { apiClient } from '../apiClient';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiClient.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  refreshToken: async (): Promise<{ access_token: string }> => {
    return apiClient.authenticatedRequest<{ access_token: string }>('/auth/refresh', {
      method: 'POST',
    });
  },

  logout: async (): Promise<void> => {
    return apiClient.authenticatedRequest<void>('/auth/logout', {
      method: 'POST',
    });
  },

  validateToken: async (): Promise<{ valid: boolean; user?: any }> => {
    return apiClient.authenticatedRequest<{ valid: boolean; user?: any }>('/auth/validate');
  },
};
