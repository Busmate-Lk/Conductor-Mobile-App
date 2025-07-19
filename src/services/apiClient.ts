import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiClient {
  private baseURL = 'http://47.128.250.151:8081/api';
  // private baseURL = 'http://192.168.17.101:8080/api';
  private timeout = 10000;

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const config: RequestInit = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, could trigger logout here
          throw new Error('UNAUTHORIZED');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async authenticatedRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    console.log('Making API request to:', `${this.baseURL}${endpoint}`);
    console.log('Request options:', JSON.stringify(options, null, 2));
    const token = await this.getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiClient = new ApiClient();
