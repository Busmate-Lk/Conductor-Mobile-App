// Service configuration for different API endpoints
export const API_CONFIG = {
  USER_MANAGEMENT: {
    baseURL: process.env.EXPO_PUBLIC_USER_API_URL || 'http://13.229.67.236:8081/api',
    timeout: 10000,
  },
  SCHEDULE_MANAGEMENT: {
    baseURL: process.env.EXPO_PUBLIC_SCHEDULE_API_URL || 'http://13.229.67.236:8080/api',
    timeout: 15000, // Longer timeout for complex schedule operations
  },
  TICKET_MANAGEMENT: {
    baseURL: process.env.EXPO_PUBLIC_TICKET_API_URL || 'http://13.229.67.236:8083/api',
    timeout: 10000,
  },
} as const;

export type ServiceType = 'user' | 'schedule' | 'ticket';
