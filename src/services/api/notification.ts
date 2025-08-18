import { apiClient } from '../apiClient';

export const notificationApi = {
  // Get notifications for conductor - User Management Service
  getNotifications: async (conductorId: string): Promise<any[]> => {
    return apiClient.authenticatedRequest<any[]>(`/notifications?conductorId=${conductorId}`, {}, 'user');
  },

  // Send notification to passengers - User Management Service
  notifyPassengers: async (notification: any): Promise<any> => {
    return apiClient.authenticatedRequest<any>('/notify-passengers', {
      method: 'POST',
      body: JSON.stringify(notification),
    }, 'user');
  },

  // Mark notification as read - User Management Service
  markAsRead: async (notificationId: string): Promise<any> => {
    return apiClient.authenticatedRequest<any>(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    }, 'user');
  },

  // Get conductor notifications - User Management Service
  getConductorNotifications: async (conductorId: string): Promise<any[]> => {
    return apiClient.authenticatedRequest<any[]>(`/conductor-notifications?conductorId=${conductorId}`, {}, 'user');
  },
};
