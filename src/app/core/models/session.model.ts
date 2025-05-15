export interface Session {
  device: {
    os: {
      name: string;
      version: string;
    };
    client: {
      name: string;
      version: string;
      type: string;
    };
    id: string;
    platform: string;
    isBot: boolean;
  };
  ip: {
    location: {
      country: string;
      region: string;
      city: string;
      latitude: number;
      longitude: number;
      status: string;
    };
    address: string;
    type: string;
  };
  lastActive: string;
  status: string;
  current: boolean;
}

export interface SessionResponse {
  success: boolean;
  message: string;
  data: {
    sessions: Session[];
    count: number;
  };
}
