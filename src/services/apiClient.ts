import { API_CONFIG, ServiceType } from '@/config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiClient {
  private timeout = 10000;
  private activeRequests = new Map<string, Promise<any>>();

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  private getServiceConfig(serviceType: ServiceType) {
    switch (serviceType) {
      case 'user':
        return API_CONFIG.USER_MANAGEMENT;
      case 'schedule':
        return API_CONFIG.SCHEDULE_MANAGEMENT;
      case 'ticket':
        return API_CONFIG.TICKET_MANAGEMENT;
      default:
        return API_CONFIG.USER_MANAGEMENT;
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}, serviceType: ServiceType = 'user'): Promise<T> {
    const serviceConfig = this.getServiceConfig(serviceType);
    let baseURL = String(serviceConfig.baseURL || '');
    const timeout = serviceConfig.timeout;

    // Ensure scheme exists (prepend http:// if missing)
    if (!/^https?:\/\//i.test(baseURL)) {
      baseURL = `http://${baseURL}`;
    }

    // Normalize and build final URL
    const normalizedBase = baseURL.replace(/\/+$/g, '');       // remove trailing slashes
    const normalizedEndpoint = endpoint.replace(/^\/+/g, '');  // remove leading slashes
    const fullUrl = `${normalizedBase}/${normalizedEndpoint}`;

    // Create a unique key for this request to prevent duplicates
    const requestKey = `${serviceType}_${fullUrl}_${JSON.stringify(options)}`;
    
    // If the same request is already in progress, return the existing promise
    if (this.activeRequests.has(requestKey)) {
      console.log('🔄 Reusing existing request for:', fullUrl, 'on service:', serviceType);
      return this.activeRequests.get(requestKey);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const requestPromise = (async (): Promise<T> => {
      try {
        console.log('🚀 Making new API request to:', fullUrl, `(Service: ${serviceType})`);

        const config: RequestInit = {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          signal: controller.signal,
        };

        const response = await fetch(fullUrl, config);
        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired, could trigger logout here
            throw new Error('UNAUTHORIZED');
          }
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('✅ Request completed successfully:', fullUrl, `(Service: ${serviceType})`);
        return result;
      } catch (error) {
        clearTimeout(timeoutId);
        console.log('❌ Request failed:', fullUrl, `(Service: ${serviceType})`, error);
        throw error;
      } finally {
        // Remove from active requests after completion
        this.activeRequests.delete(requestKey);
      }
    })();

    // Store the request promise
    this.activeRequests.set(requestKey, requestPromise);
    return requestPromise;
  }

  async authenticatedRequest<T>(endpoint: string, options: RequestInit = {}, serviceType: ServiceType = 'user'): Promise<T> {
    const serviceConfig = this.getServiceConfig(serviceType);
    let baseURL = String(serviceConfig.baseURL || '');
    
    // Ensure scheme exists (prepend http:// if missing)
    if (!/^https?:\/\//i.test(baseURL)) {
      baseURL = `http://${baseURL}`;
    }

    // Normalize and build final URL
    const normalizedBase = baseURL.replace(/\/+$/g, '');       // remove trailing slashes
    const normalizedEndpoint = endpoint.replace(/^\/+/g, '');  // remove leading slashes
    const fullUrl = `${normalizedBase}/${normalizedEndpoint}`;
    
    console.log(' Making authenticated API request to:', fullUrl, `(Service: ${serviceType})`);
    console.log(' Request options:', JSON.stringify(options, null, 2));
    const token = await this.getAuthToken();
    
    if (!token) {
      console.log('❌ No authentication token found');
      throw new Error('No authentication token found');
    }

    console.log('🎫 Token exists, length:', token.length);

    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    }, serviceType);
  }
}

export const apiClient = new ApiClient();
