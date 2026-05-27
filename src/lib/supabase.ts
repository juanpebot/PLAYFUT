import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type CardType = 'gold' | 'silver' | 'bronze' | 'special' | 'toty' | 'hero';
export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'cancelled';

export interface Team {
  id: string;
  name: string;
  badge_color: string;
  secondary_color: string;
  city: string;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  created_at: string;
}

export interface Player {
  id: string;
  team_id: string | null;
  name: string;
  position: string;
  overall: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  card_type: CardType;
  nationality: string;
  photo_url: string;
  goals: number;
  assists: number;
  matches_played: number;
  created_at: string;
  teams?: Team;
}

export interface Match {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  location: string;
  status: MatchStatus;
  competition: string;
  created_at: string;
  home_team?: Team;
  away_team?: Team;
}

export interface Ranking {
  id: string;
  team_id: string;
  season: string;
  points: number;
  position: number;
  form: string;
  updated_at: string;
  teams?: Team;
}
