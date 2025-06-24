import { useState, useEffect } from 'react';
import { api } from '@/services/scheduleapi';
import { Schedule, TimeFilter } from '@/types/schedule';

export function useSchedules(initialFilter: TimeFilter = 'today') {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [activeTab, setActiveTab] = useState<TimeFilter>(initialFilter);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch schedules - only gets raw data, no filtering
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.schedules.getAll();
        
        
        
        setSchedules(data);
        console.log(`Fetched ${data.length} schedules`);
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
        setError("Failed to load schedules. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // Filter schedules based on active tab
  useEffect(() => {
    if (schedules.length === 0) return;
    
    console.log(`Filtering schedules for tab: ${activeTab}`);
    
    // Get current date/time in Sri Lanka time zone (UTC+5:30)
    const now = new Date();
    const sriLankaOffset = 5.5 * 60 * 60 * 1000;
    const sriLankaTime = new Date(now.getTime() + sriLankaOffset);
    
    console.log("Current Sri Lanka time:", sriLankaTime.toISOString());
    
    const currentDay = sriLankaTime.getDate();
    const currentMonth = sriLankaTime.getMonth() + 1; // +1 because getMonth() returns 0-11
    const currentYear = sriLankaTime.getFullYear();
    
    // Format today's date as MM/DD/YYYY for direct string comparison
    const todayFormatted = `${currentMonth.toString().padStart(2, '0')}/${currentDay.toString().padStart(2, '0')}/${currentYear}`;
    
    console.log("Today's formatted date:", todayFormatted);
    
    // Create today's date at 00:00 for date-only comparisons
    const todayStart = new Date(currentYear, currentMonth - 1, currentDay, 0, 0, 0);
    
    console.log("Today's date (midnight):", todayStart.toISOString());
    
    // Helper function to parse date strings (MM/DD/YYYY format)
    const parseDate = (dateStr: string): Date => {
      try {
        // Trim any leading/trailing spaces
        dateStr = dateStr.trim();
        
        // Split by /
        const parts = dateStr.split('/');
        if (parts.length !== 3) {
          console.error(`Invalid date format: "${dateStr}"`);
          return new Date(); // Return today as fallback
        }
        
        const month = parseInt(parts[0], 10) - 1; // Subtract 1 because months are 0-indexed
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        if (isNaN(month) || isNaN(day) || isNaN(year)) {
          console.error(`Invalid date components: month=${parts[0]}, day=${parts[1]}, year=${parts[2]}`);
          return new Date();
        }
        
        // Create date using individual components
        const date = new Date(year, month, day, 0, 0, 0, 0);
        console.log(`Parsed date "${dateStr}" to: ${date.toISOString()}`);
        return date;
      } catch (error) {
        console.error(`Error parsing date "${dateStr}":`, error);
        return new Date(); // Return today as fallback
      }
    };
    
    // Helper function to parse time and combine with date
    const parseDateTime = (dateObj: Date, timeStr: string): Date => {
      try {
        const dateTime = new Date(dateObj);
        const timeParts = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
        
        if (!timeParts) {
          console.error(`Invalid time format: "${timeStr}"`);
          return dateTime;
        }
        
        let hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const meridiem = timeParts[3].toUpperCase();
        
        // Convert to 24-hour format
        if (meridiem === 'PM' && hours < 12) {
          hours += 12;
        } else if (meridiem === 'AM' && hours === 12) {
          hours = 0;
        }
        
        dateTime.setHours(hours, minutes, 0, 0);
        return dateTime;
      } catch (error) {
        console.error(`Error parsing time "${timeStr}":`, error);
        return dateObj;
      }
    };
    
    // Check if a date string is today's date
    const isToday = (dateStr: string): boolean => {
      // Simple string comparison - much more reliable!
      const result = dateStr.trim() === todayFormatted;
      console.log(`Is "${dateStr}" today (${todayFormatted})? ${result}`);
      return result;
    };
    
    // Apply filters based on active tab
    switch (activeTab) {
      case 'today':
        // Today's schedules that aren't completed
        const todaySchedules = schedules.filter(schedule => {
          try {
            const isDateToday = isToday(schedule.date);
            const notCompleted = schedule.status !== 'completed';
            const result = isDateToday && notCompleted;
            
            if (isDateToday) {
              console.log(`Schedule ${schedule.id} is today, status: ${schedule.status}, included: ${result}`);
            }
            
            return result;
          } catch (error) {
            console.error(`Error filtering today schedule ${schedule.id}:`, error);
            return false;
          }
        });
        
        console.log(`Found ${todaySchedules.length} schedules for today tab`);
        setFilteredSchedules(todaySchedules);
        break;
        
      case 'upcoming':
        // Future schedules or today's schedules with future start time
        const upcomingSchedules = schedules.filter(schedule => {
          try {
            const scheduleDate = parseDate(schedule.date);
            
            // Future date (not today)
            if (scheduleDate > todayStart && !isToday(schedule.date)) {
              console.log(`Schedule ${schedule.id} is in the future (${schedule.date})`);
              return true;
            }
            
            // Today but start time is in the future
            if (isToday(schedule.date)) {
              const startDateTime = parseDateTime(scheduleDate, schedule.startTime);
              const isFutureTime = startDateTime > sriLankaTime;
              
              console.log(`Schedule ${schedule.id} is today, start: ${schedule.startTime}, isFuture: ${isFutureTime}`);
              return isFutureTime;
            }
            
            return false;
          } catch (error) {
            console.error(`Error filtering upcoming schedule ${schedule.id}:`, error);
            return false;
          }
        });
        
        console.log(`Found ${upcomingSchedules.length} schedules for upcoming tab`);
        setFilteredSchedules(upcomingSchedules);
        break;
        
      case 'past':
        // Completed schedules
        const pastSchedules = schedules.filter(schedule => {
          const isCompleted = schedule.status === 'completed';
          if (isCompleted) {
            console.log(`Schedule ${schedule.id} is completed`);
          }
          return isCompleted;
        });
        
        console.log(`Found ${pastSchedules.length} schedules for past tab`);
        setFilteredSchedules(pastSchedules);
        break;
        
      default:
        setFilteredSchedules(schedules);
    }
  }, [activeTab, schedules]);

  return {
    schedules,
    filteredSchedules,
    loading,
    error,
    activeTab,
    setActiveTab,
    setError,
  };
}