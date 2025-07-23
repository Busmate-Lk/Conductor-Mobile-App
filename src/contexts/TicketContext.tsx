import React, { createContext, useContext, useState } from 'react';

// Ticket interface
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
}

interface TicketContextType {
  ticketData: TicketDetails | null;
  setTicketData: (ticket: TicketDetails) => void;
  clearTicketData: () => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ticketData, setTicketData] = useState<TicketDetails | null>(null);

  const clearTicketData = () => {
    setTicketData(null);
  };

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData, clearTicketData }}>
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
