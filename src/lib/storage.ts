import { User, RegisterData, Position } from '../types/auth';

const STORAGE_KEYS = {
  USER: 'playfut_user',
  SESSION: 'playfut_session',
  CREDENTIALS: 'playfut_credentials',
};

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate initial rating based on position
const calculateInitialRating = (position: Position): number => {
  const baseRating = 70;
  const positionBonus: Record<Position, number> = {
    POR: 5,
    DEF: 3,
    MED: 0,
    DEL: -2,
  };
  return baseRating + positionBonus[position] + Math.floor(Math.random() * 5);
};

// Generate card stats based on position
const generateCardStats = (position: Position) => {
  const baseStats = {
    VEL: 70 + Math.floor(Math.random() * 10),
    TIR: 70 + Math.floor(Math.random() * 10),
    PAS: 70 + Math.floor(Math.random() * 10),
    REG: 70 + Math.floor(Math.random() * 10),
    FIS: 70 + Math.floor(Math.random() * 10),
    DEF: 70 + Math.floor(Math.random() * 10),
  };

  // Position-specific adjustments
  const positionAdjustments: Record<Position, Partial<typeof baseStats>> = {
    POR: { VEL: baseStats.VEL - 5, TIR: baseStats.TIR - 15, PAS: baseStats.PAS - 5, REG: baseStats.REG - 10, DEF: baseStats.DEF + 15 },
    DEF: { TIR: baseStats.TIR - 5, PAS: baseStats.PAS - 3, REG: baseStats.REG - 5, DEF: baseStats.DEF + 10, FIS: baseStats.FIS + 5 },
    MED: { PAS: baseStats.PAS + 5, REG: baseStats.REG + 3 },
    DEL: { VEL: baseStats.VEL + 5, TIR: baseStats.TIR + 10, DEF: baseStats.DEF - 10, PAS: baseStats.PAS - 5 },
  };

  return { ...baseStats, ...positionAdjustments[position] };
};

// Determine level based on rating
const determineLevel = (rating: number): 'BRONCE' | 'PLATA' | 'ORO' | 'ORO_SPECIAL' | 'PLATINO' => {
  if (rating >= 88) return 'PLATINO';
  if (rating >= 84) return 'ORO_SPECIAL';
  if (rating >= 78) return 'ORO';
  if (rating >= 74) return 'PLATA';
  return 'BRONCE';
};

// Create new user
export const createUser = (data: RegisterData): User => {
  const now = new Date();
  const rating = calculateInitialRating(data.position);
  const cardStats = generateCardStats(data.position);
  const level = determineLevel(rating);

  return {
    id: generateId(),
    username: data.username,
    email: data.email,
    city: data.city,
    position: data.position,
    avatar: data.username.slice(0, 2).toUpperCase(),
    rating,
    level,
    memberSince: now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
    stats: {
      matches: 0,
      wins: 0,
      goals: 0,
      mvp: 0,
      assists: 0,
    },
    cardStats,
    createdAt: now.toISOString(),
    lastLogin: now.toISOString(),
  };
};

// STORAGE OPERATIONS

export const storage = {
  // Save user data
  saveUser: (user: User): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  // Get user data
  getUser: (): User | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Save credentials (email + password) for auto-login
  saveCredentials: (email: string, password: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify({ email, password }));
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  },

  // Get credentials
  getCredentials: (): { email: string; password: string } | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting credentials:', error);
      return null;
    }
  },

  // Set session as active
  setSessionActive: (): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, 'true');
    } catch (error) {
      console.error('Error setting session:', error);
    }
  },

  // Check if session is active
  isSessionActive: (): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SESSION) === 'true';
    } catch (error) {
      console.error('Error checking session:', error);
      return false;
    }
  },

  // Clear session
  clearSession: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  },

  // Clear all data (full logout)
  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },

  // Check if user exists
  hasStoredUser: (): boolean => {
    return storage.getUser() !== null;
  },
};

// AUTH OPERATIONS

export const authService = {
  // Register new user
  register: (data: RegisterData): User => {
    const user = createUser(data);
    storage.saveUser(user);
    storage.saveCredentials(data.email, data.password);
    storage.setSessionActive();
    return user;
  },

  // Login (check credentials)
  login: (email: string, password: string): User | null => {
    const storedCredentials = storage.getCredentials();
    const storedUser = storage.getUser();

    if (!storedUser || !storedCredentials) {
      return null;
    }

    if (storedCredentials.email === email && storedCredentials.password === password) {
      // Update last login
      const updatedUser = { ...storedUser, lastLogin: new Date().toISOString() };
      storage.saveUser(updatedUser);
      storage.setSessionActive();
      return updatedUser;
    }

    return null;
  },

  // Auto-login (if session exists)
  autoLogin: (): User | null => {
    const isSessionActive = storage.isSessionActive();
    const user = storage.getUser();

    if (isSessionActive && user) {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      storage.saveUser(updatedUser);
      return updatedUser;
    }

    return null;
  },

  // Logout
  logout: (): void => {
    storage.clearSession();
  },

  // Full logout (delete all data)
  fullLogout: (): void => {
    storage.clearAll();
  },

  // Update user
  updateUser: (updates: Partial<User>): User | null => {
    const user = storage.getUser();
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    storage.saveUser(updatedUser);
    return updatedUser;
  },
};
