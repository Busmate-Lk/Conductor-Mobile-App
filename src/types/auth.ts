export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    app_role: string;
    user_metadata?: {
      busId?: string;
      route?: string;
      contactNumber?: string;
    };
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'conductor';
  busId?: string;
  route?: string;
  contactNumber?: string;
  employeeId?: string;
  fullName?: string;
  username?: string;
  shiftStatus?: string;
  nicNumber?: string;
  dateofBirth?: string;
  gender?: string;
}

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
  biometricType?: string;
}
