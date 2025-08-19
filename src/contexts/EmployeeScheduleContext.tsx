import { useAuth } from '@/hooks/auth/useAuth';
import { employeeApi } from '@/services/api/employee';
import { ConductorTripApiResponse, EmployeeSchedule } from '@/types/employee';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type TimeFilter = 'today' | 'upcoming' | 'past';

interface EmployeeScheduleContextType {
  schedules: EmployeeSchedule[];
  filteredSchedules: EmployeeSchedule[];
  loading: boolean;
  error: string | null;
  activeTab: TimeFilter;
  setActiveTab: (tab: TimeFilter) => void;
  retry: () => void;
  refreshSchedules: () => Promise<void>;
}

const EmployeeScheduleContext = createContext<EmployeeScheduleContextType | undefined>(undefined);

// Helper function to determine status based on current time and trip times
function getScheduleStatus(schedule: EmployeeSchedule): 'ongoing' | 'upcoming' | 'completed' {
  const now = new Date();
  
  // Parse the date from YYYY-MM-DD format
  const [year, month, day] = schedule.date.split('-').map(Number);
  
  // Parse times from HH:MM:SS format
  const [startHour, startMin] = schedule.startTime.split(':').map(Number);
  const [endHour, endMin] = schedule.endTime.split(':').map(Number);

  // Create Date objects for start and end times
  const startDateTime = new Date(year, month - 1, day, startHour, startMin);
  const endDateTime = new Date(year, month - 1, day, endHour, endMin);
  

  // Determine status based on current time
  if (now > endDateTime) {
    return 'completed';
  } else if (now >= startDateTime && now <= endDateTime) {
    return 'ongoing';
  } else {
    return 'upcoming';
  }
}

interface EmployeeScheduleProviderProps {
  children: React.ReactNode;
}

export function EmployeeScheduleProvider({ children }: EmployeeScheduleProviderProps) {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<EmployeeSchedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<EmployeeSchedule[]>([]);
  const [activeTab, setActiveTab] = useState<TimeFilter>('today');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch schedules from API
  const fetchSchedules = useCallback(async () => {
    if (!user?.id) {
      setError('No user ID found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('🏠 Fetching schedules for conductor ID:', user.id);
       
      // Fetch schedules using conductor ID (which is user.id)
      const data = await employeeApi.getSchedule(String(user.id));
      console.log(`🏠 Fetched ${data.length} schedules`);
      
      // Transform API response to match EmployeeSchedule interface and add status
      const schedulesWithStatus: EmployeeSchedule[] = data.map((item: ConductorTripApiResponse) => {
        const schedule: EmployeeSchedule = {
          id: item.id,
          date: item.tripDate, // API returns tripDate in YYYY-MM-DD format
          startTime: item.scheduledDepartureTime, // API returns HH:MM:SS format
          endTime: item.scheduledArrivalTime, // API returns HH:MM:SS format
          route: item.routeName,
          busId: item.busPlateNumber, // Using plate number as busId
          status: 'pending', // Will be updated below
          passengers: 0, // Not provided in API, set default
          revenue: 0, // Not provided in API, set default
          // Additional properties for journey details
          fromLocation: item.routeName?.split(' - ')[0] || item.routeName || 'Unknown',
          toLocation: item.routeName?.split(' - ')[1] || 'Unknown',
          busPlateNumber: item.busPlateNumber,
          routeName: item.routeName,
          scheduleName: item.scheduleName,
          scheduleId: item.scheduleId,
          routeGroupId: item.routeGroupId,
          RouteId: item.routeId,
        };
        
        // Calculate and assign the actual status
        schedule.status = getScheduleStatus(schedule);
        return schedule;
      });
      
      setSchedules(schedulesWithStatus);
      console.log(`🏠 Processed ${schedulesWithStatus.length} schedules with status`);
      
    } catch (err) {
      console.error('🏠 Failed to fetch employee schedules:', err);
      setError('Failed to load schedules. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Initial fetch when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchSchedules();
    }
  }, [user?.id, fetchSchedules]);

  // Filter schedules based on active tab
  useEffect(() => {
    if (schedules.length === 0) {
      setFilteredSchedules([]);
      return;
    }
    
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Get YYYY-MM-DD format

    console.log('🏠 Filtering schedules for tab:', activeTab);
    console.log('🏠 Current date:', today);

    switch (activeTab) {
      case 'today':
        // Today's schedules that aren't completed
        const todaySchedules = schedules.filter(schedule => {
          const isToday = schedule.date === today;
          return isToday;
        });
        
        console.log(`🏠 Found ${todaySchedules.length} schedules for today`);
        setFilteredSchedules(todaySchedules);
        break;
        
      case 'upcoming':
        // Future schedules or today's upcoming schedules
        const upcomingSchedules = schedules.filter(schedule => {
            const upcoming = schedule.date > today;
            return upcoming;
        //   return schedule.status === 'upcoming';
        });
        
        console.log(`🏠 Found ${upcomingSchedules.length} upcoming schedules`);
        setFilteredSchedules(upcomingSchedules);
        break;
        
      case 'past':
        // Completed schedules
        const pastSchedules = schedules.filter(schedule => {
            const completed=schedule.date< today;
            return completed;

        //   return schedule.status === 'completed';
        });
        
        console.log(`🏠 Found ${pastSchedules.length} completed schedules`);
        setFilteredSchedules(pastSchedules);
        break;
        
      default:
        setFilteredSchedules(schedules);
    }
  }, [activeTab, schedules]);

  // Retry function
  const retry = useCallback(() => {
    setError(null);
    fetchSchedules();
  }, [fetchSchedules]);

  // Refresh function that can be called from any component
  const refreshSchedules = useCallback(async () => {
    await fetchSchedules();
  }, [fetchSchedules]);

  const value: EmployeeScheduleContextType = {
    schedules,
    filteredSchedules,
    loading,
    error,
    activeTab,
    setActiveTab,
    retry,
    refreshSchedules,
  };

  return (
    <EmployeeScheduleContext.Provider value={value}>
      {children}
    </EmployeeScheduleContext.Provider>
  );
}

export function useEmployeeScheduleContext(): EmployeeScheduleContextType {
  const context = useContext(EmployeeScheduleContext);
  if (context === undefined) {
    throw new Error('useEmployeeScheduleContext must be used within an EmployeeScheduleProvider');
  }
  return context;
}
