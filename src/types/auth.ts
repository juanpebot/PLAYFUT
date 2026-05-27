export type Position = 'POR' | 'DEF' | 'MED' | 'DEL';

export interface UserStats {
  matches: number;
  wins: number;
  goals: number;
  mvp: number;
  assists: number;
}

export interface CardStats {
  VEL: number;
  TIR: number;
  PAS: number;
  REG: number;
  FIS: number;
  DEF: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  city: string;
  position: Position;
  avatar: string;
  rating: number;
  level: 'BRONCE' | 'PLATA' | 'ORO' | 'ORO_SPECIAL' | 'PLATINO';
  memberSince: string;
  stats: UserStats;
  cardStats: CardStats;
  createdAt: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  city: string;
  position: Position;
}
