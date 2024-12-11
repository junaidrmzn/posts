export interface SignupData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
}
