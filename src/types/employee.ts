// Interface for the conductor profile
export interface EmployeeProfile {
  employee_id: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  assign_operator_id: string;
  nicNumber?: string;
  dateofBirth?: string;
  gender?: string;
  shiftStatus?: string;
  address?: string;
}

// Interface for the conductor profile update request
export interface UpdateProfileRequest{

    fullName?: string;
    phoneNumber?: string;
    
}
// Interface for the conductor profile update response
export interface UpdateProfileResponse {
  userId?: string;          // Note: your response shows "userld" - might be a typo in backend
  userld?: string;          // Add this in case backend has typo
  fullName: string;
  username: string;
  email: string;
  role: string;
  accountStatus: string | null;
  isVerified: boolean;
  phoneNumber: string;
  employee_id: string;
  assign_operator_id: string;
  shift_status: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  password: string | null;
  nicNumber: string | null;
}
// Interface for the conductor profile update error response
export interface ProfileUpdateError {
    field: string;
    message: string;
}




// Interface for the conductor schedule
export interface EmployeeSchedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  route: string;
  busId: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  passengers?: number;
  revenue?: number;
}

export interface ShiftStatus {
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  currentLocation?: string;
  totalPassengers?: number;
  totalRevenue?: number;
}