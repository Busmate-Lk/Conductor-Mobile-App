import { apiClient } from '../apiClient';

export const ticketApi = {
  // Validate a ticket - Ticket Management Service
  validateTicket: async (ticketId: string): Promise<any> => {
    return apiClient.authenticatedRequest<any>('/validate', {
      method: 'POST',
      body: JSON.stringify({ ticketId }),
    }, 'ticket');
  },

  // Issue a new ticket - Ticket Management Service
  issueTicket: async (ticketData: any): Promise<any> => {
    try {
      console.log('🎫 Attempting to issue ticket with data:', JSON.stringify(ticketData, null, 2));
      
      // Validate required fields before sending
      const requiredFields = ['conductorId', 'busId', 'tripId', 'startLocationId', 'endLocationId', 'fareAmount', 'paymentMethod', 'transactionRef'];
      const missingFields = requiredFields.filter(field => 
        ticketData[field] === undefined || 
        ticketData[field] === null || 
        ticketData[field] === ''
      );
      
      if (missingFields.length > 0) {
        console.error('❌ Missing required fields:', missingFields);
        return {
          success: false,
          error: 'Validation failed',
          message: `Missing required fields: ${missingFields.join(', ')}`
        };
      }
      
      // Log the exact request being sent
      console.log('📤 Sending ticket request to API...');
      
      const response = await apiClient.authenticatedRequest<any>('/v1/tickets/conductor/issue', {
        method: 'POST',
        body: JSON.stringify(ticketData),
      }, 'ticket');
      
      console.log('✅ Ticket issued successfully:', response);
      return {
        success: true,
        data: response,
        message: 'Ticket issued successfully'
      };
    } catch (error: any) {
      console.error('❌ Error issuing ticket:', error);
      
      // Handle different types of errors
      if (error.message === 'UNAUTHORIZED') {
        return {
          success: false,
          error: 'Authentication failed',
          message: 'Your session has expired. Please login again to continue.'
        };
      }
      
      if (error.message.includes('Permission denied') || error.message.includes('HTTP 403')) {
        return {
          success: false,
          error: 'Permission denied',
          message: 'You do not have permission to issue tickets. Please contact your administrator or check if you are logged in with the correct conductor account.'
        };
      }
      
      if (error.message.includes('JSON Parse error') || error.message.includes('content type')) {
        return {
          success: false,
          error: 'Server response error',
          message: 'Server returned invalid response. The ticket service may be temporarily unavailable.'
        };
      }
      
      if (error.message.includes('HTTP 404')) {
        return {
          success: false,
          error: 'Service not found',
          message: 'Ticket service endpoint not found. Please check your app version or contact support.'
        };
      }
      
      if (error.message.includes('HTTP 500')) {
        return {
          success: false,
          error: 'Server error',
          message: 'Server is experiencing issues. Please try again later.'
        };
      }
      
      if (error.message.includes('timeout') || error.message.includes('network')) {
        return {
          success: false,
          error: 'Connection error',
          message: 'Network connection failed. Please check your internet connection and try again.'
        };
      }
      
      // Generic error handling
      return {
        success: false,
        error: error.message || 'Unknown error',
        message: 'Failed to issue ticket. Please check your connection and try again. If the problem persists, contact support.'
      };
    }
  },

  // Get ticket by ID - Ticket Management Service
  getTicketById: async (ticketId: string): Promise<any> => {
    return apiClient.authenticatedRequest<any>(`/tickets/${ticketId}`, {}, 'ticket');
  },

  // Get scan history - Ticket Management Service
  getScanHistory: async (conductorId: string): Promise<any[]> => {
    return apiClient.authenticatedRequest<any[]>(`/scan-history?conductorId=${conductorId}`, {}, 'ticket');
  },

  // Print ticket - Ticket Management Service
  printTicket: async (ticketId: string): Promise<any> => {
    return apiClient.authenticatedRequest<any>(`/print/${ticketId}`, {
      method: 'POST',
    }, 'ticket');
  },

  // Get ticket statistics - Ticket Management Service
  getTicketStats: async (conductorId: string, date?: string): Promise<any> => {
    const params = date ? `?conductorId=${conductorId}&date=${date}` : `?conductorId=${conductorId}`;
    return apiClient.authenticatedRequest<any>(`/stats${params}`, {}, 'ticket');
  },
};
