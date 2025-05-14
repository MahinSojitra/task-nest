export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponseData {
  tokens: TokenPair;
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: TokenResponseData;
}
