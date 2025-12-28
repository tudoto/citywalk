export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WalkStop {
  id: string;
  name: string;
  description: string;
  socialMediaTip: string; // "Photo spot", "Must try latte", etc.
  coordinates: Coordinates;
  estimatedTimeMinutes: number;
  tags: string[];
}

export interface WalkRoute {
  title: string;
  totalDistanceKm: string;
  totalTimeMinutes: number;
  vibe: string;
  stops: WalkStop[];
}

export enum AppState {
  WELCOME = 'WELCOME',
  REQUESTING_LOCATION = 'REQUESTING_LOCATION',
  PREFERENCES = 'PREFERENCES',
  GENERATING = 'GENERATING',
  ROUTE_PREVIEW = 'ROUTE_PREVIEW',
  NAVIGATION = 'NAVIGATION',
  ERROR = 'ERROR'
}

export interface UserPreferences {
  theme: string; // e.g., "Coffee", "Architecture", "Night Life"
  duration: string; // "Short", "Medium", "Long"
}