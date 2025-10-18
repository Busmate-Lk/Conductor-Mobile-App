import React, { createContext, useContext, useState } from 'react';
import { RouteStop } from '../types/journey';
import { IssueTicketRequest, TicketDetails } from '../types/ticket';

interface RouteStopsCache {
  routeId: string;
  stops: RouteStop[];
  lastFetched: number;
}

interface TicketContextType {
  ticketData: TicketDetails | null;
  setTicketData: (ticket: TicketDetails) => void;
  clearTicketData: () => void;
  // Backend data for API calls
  ticketBackendData: IssueTicketRequest | null;
  setTicketBackendData: (data: IssueTicketRequest) => void;
  clearTicketBackendData: () => void;
  // Route stops cache
  routeStopsCache: RouteStopsCache | null;
  setRouteStopsCache: (cache: RouteStopsCache) => void;
  clearRouteStopsCache: () => void;
  isRouteStopsCacheValid: (routeId: string) => boolean;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ticketData, setTicketData] = useState<TicketDetails | null>(null);
  const [ticketBackendData, setTicketBackendData] = useState<IssueTicketRequest | null>(null);
  const [routeStopsCache, setRouteStopsCache] = useState<RouteStopsCache | null>(null);

  const clearTicketData = () => {
    setTicketData(null);
  };

  const clearTicketBackendData = () => {
    setTicketBackendData(null);
  };

  const clearRouteStopsCache = () => {
    setRouteStopsCache(null);
  };

  // Check if cache is valid (same route and within 30 minutes)
  const isRouteStopsCacheValid = (routeId: string): boolean => {
    if (!routeStopsCache) return false;
    if (routeStopsCache.routeId !== routeId) return false;
    
    const now = Date.now();
    const cacheAge = now - routeStopsCache.lastFetched;
    const maxCacheAge = 30 * 60 * 1000; // 30 minutes
    
    return cacheAge < maxCacheAge;
  };

  return (
    <TicketContext.Provider value={{ 
      ticketData, 
      setTicketData, 
      clearTicketData,
      ticketBackendData,
      setTicketBackendData,
      clearTicketBackendData,
      routeStopsCache,
      setRouteStopsCache,
      clearRouteStopsCache,
      isRouteStopsCacheValid
    }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  return context;
};
