export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      name: string;
      email: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    isExistingSession: boolean;
  };
}
