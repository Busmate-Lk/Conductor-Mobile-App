export interface JourneySchedule {
  id: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  busId: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  conductorId: string;
  passengerCount?: number;
  revenue?: number;
}

export interface TripDetails {
  id: string;
  scheduleId: string;
  startTime: string;
  endTime?: string;
  route: string;
  stops: Stop[];
  currentStop?: string;
  nextStop?: string;
}

export interface Stop {
  id: string;
  name: string;
  arrivalTime: string;
  departureTime: string;
  status: 'pending' | 'arrived' | 'departed';
}
