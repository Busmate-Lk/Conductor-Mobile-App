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

// Route stop structure from API
export interface RouteStop {
  routeStopId: string;
  stopId: string;
  stopName: string;
  stopDescription?: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  isAccessible?: boolean;
  stopOrder: number;
  distanceFromStartKm: number;
}

// Enhanced stop for UI with timing data and Google Maps support
export interface EnhancedStop {
  stopId: string;
  stopName: string;
  stopOrder: number;
  distanceFromStart: number; // Normalized from RouteStop.distanceFromStartKm
  latitude?: number; // For Google Maps integration
  longitude?: number; // For Google Maps integration
  arrivalTime: string;
  departureTime: string;
  actualArrivalTime?: string;
  actualDepartureTime?: string;
  status: 'pending' | 'arrived' | 'departed';
}
