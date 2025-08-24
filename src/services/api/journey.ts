import { RouteStop } from '../../types/journey';
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

  // Get route stops with order and distance - Schedule Management Service
  getRouteStops: async (routeId: string): Promise<RouteStop[]> => {
    console.log('🔗 Making API call to: /stops/route/' + routeId);
    console.log('🏗️  Full URL will be: http://18.140.161.237:8080/api/stops/route/' + routeId);
    
    try {
      return await apiClient.authenticatedRequest<RouteStop[]>(`/stops/route/${routeId}`, {}, 'schedule');
    } catch (error) {
      console.log('❌ First endpoint failed, trying alternative: /routes/' + routeId + '/stops');
      // Try alternative endpoint structure
      try {
        return await apiClient.authenticatedRequest<RouteStop[]>(`/routes/${routeId}/stops`, {}, 'schedule');
      } catch (secondError) {
        console.log('❌ Both endpoints failed, throwing original error');
        throw error; // Throw the original error
      }
    }
  },

  // Get stops for a schedule with timings - Schedule Management Service
  getScheduleStops: async (scheduleId: string): Promise<any[]> => {
    console.log('🔗 Making API call to: /stops/schedule/' + scheduleId);
    console.log('🏗️  Full URL will be: http://18.140.161.237:8080/api/stops/schedule/' + scheduleId);
    
    return apiClient.authenticatedRequest<any[]>(`/stops/schedule/${scheduleId}`, {}, 'schedule');
  },

  // Get seat layout - Schedule Management Service
  getSeatLayout: async (busId: string): Promise<any> => {
    return apiClient.authenticatedRequest<any>(`/buses/${busId}/seats`, {}, 'schedule');
  },
};
