import { useEmployeeScheduleContext } from '@/contexts/EmployeeScheduleContext';
import { employeeApi } from '@/services/api/employee';
import { EmployeeSchedule } from '@/types/employee';
import { useState } from 'react';

export function useOngoingTrip() {
  const { schedules, refreshSchedules } = useEmployeeScheduleContext();
  const [startingTrip, setStartingTrip] = useState(false);

  // Find ongoing trip
  const getOngoingTrip = (): EmployeeSchedule | null => {
    if (!schedules || schedules.length === 0) return null;
    
    const now = new Date();
    
    // Find trip that is currently ongoing
    const ongoingTrip = schedules.find(schedule => {
      // Parse date and time to create full datetime
      const [year, month, day] = schedule.date.split('-').map(Number);
      const [startHour, startMin] = schedule.startTime.split(':').map(Number);
      const [endHour, endMin] = schedule.endTime.split(':').map(Number);
      
      const startDateTime = new Date(year, month - 1, day, startHour, startMin);
      const endDateTime = new Date(year, month - 1, day, endHour, endMin);
      
      // Check if current time is between start and end time
      return now >= startDateTime && now <= endDateTime;
    });
    
    return ongoingTrip || null;
  };

  // Find next upcoming trip that can be started
  const getStartableTrip = (): EmployeeSchedule | null => {
    if (!schedules || schedules.length === 0) return null;
    
    const now = new Date();
    
    // Find the next upcoming trip (within reasonable time to start - e.g., 30 minutes before)
    const upcomingTrips = schedules.filter(schedule => {
      const [year, month, day] = schedule.date.split('-').map(Number);
      const [startHour, startMin] = schedule.startTime.split(':').map(Number);
      const startDateTime = new Date(year, month - 1, day, startHour, startMin);
      
      // Allow starting 30 minutes before scheduled time
      const canStartTime = new Date(startDateTime.getTime() - 30 * 60 * 1000);
      
      // Only include trips that are upcoming and can be started
      return now >= canStartTime && now < startDateTime;
    });
    
    if (upcomingTrips.length === 0) return null;
    
    // Sort by start time and return the earliest
    const sortedTrips = upcomingTrips.sort((a, b) => {
      const [yearA, monthA, dayA] = a.date.split('-').map(Number);
      const [hourA, minA] = a.startTime.split(':').map(Number);
      const dateTimeA = new Date(yearA, monthA - 1, dayA, hourA, minA);
      
      const [yearB, monthB, dayB] = b.date.split('-').map(Number);
      const [hourB, minB] = b.startTime.split(':').map(Number);
      const dateTimeB = new Date(yearB, monthB - 1, dayB, hourB, minB);
      
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
    
    return sortedTrips[0];
  };

  // Start a trip
  const startTrip = async (tripId: string): Promise<boolean> => {
    try {
      setStartingTrip(true);
      await employeeApi.startTrip(tripId);
      
      // Refresh schedules to get updated status
      await refreshSchedules();
      
      return true;
    } catch (error) {
      console.error('Failed to start trip:', error);
      return false;
    } finally {
      setStartingTrip(false);
    }
  };

  const ongoingTrip = getOngoingTrip();
  const startableTrip = getStartableTrip();


  console.log('Ongoing trip:', ongoingTrip);

  return {
    ongoingTrip,
    startableTrip,
    startTrip,
    startingTrip,
  };
}
