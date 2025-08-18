import { apiClient } from '../apiClient';

export const journeyApi = {
  // Get schedules - Schedule Management Service
  getSchedules: async (): Promise<any[]> => {
    return apiClient.authenticatedRequest<any[]>('/schedules', {}, 'schedule');
  },

  // Get schedule by ID - Schedule Management Service
  getScheduleById: async (id: string): Promise<any> => {
    return apiClient.authenticatedRequest<any>(`/schedules/${id}`, {}, 'schedule');
  },

  // Update schedule - Schedule Management Service
  updateSchedule: async (id: string, data: any): Promise<any> => {
    return apiClient.authenticatedRequest<any>(`/schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, 'schedule');
  },

  // Get passengers for a trip - Schedule Management Service
  getPassengers: async (tripId: string): Promise<any[]> => {
    return apiClient.authenticatedRequest<any[]>(`/trips/${tripId}/passengers`, {}, 'schedule');
  },

  // Get stops for a route - Schedule Management Service
  getStops: async (routeId: string): Promise<any[]> => {
    return apiClient.authenticatedRequest<any[]>(`/routes/${routeId}/stops`, {}, 'schedule');
  },

  // Get seat layout - Schedule Management Service
  getSeatLayout: async (busId: string): Promise<any> => {
    return apiClient.authenticatedRequest<any>(`/buses/${busId}/seats`, {}, 'schedule');
  },
};
