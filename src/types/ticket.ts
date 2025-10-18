// API request types for backend integration
export interface IssueTicketRequest {
  conductorId: String;
  busId:String;
  tripId: String;
  startLocationId: string;
  endLocationId: string;
  fareAmount: number;
  paymentMethod: string;
  transactionRef: string;
}

export interface IssueTicketResponse {
  success: boolean;
  message: string;
  ticketId?: string;
  timestamp?: string;
}


export interface TicketDetails {
  id: string;
  from: string;
  to: string;
  platform: string;
  gate: string;
  passengers: string;
  fare: string;
  issuedOn: string;
  phoneNumber?: string;
  // Backend data
  conductorId?: number;
  busId?: number;
  tripId?: number;
  startLocationId?: string;
  endLocationId?: string;
  fareAmount?: number;
  paymentMethod?: string;
  transactionRef?: string;
}