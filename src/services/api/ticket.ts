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
    return apiClient.authenticatedRequest<any>('/issue', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    }, 'ticket');
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
