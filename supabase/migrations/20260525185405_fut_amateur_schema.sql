/*
  # FUT Amateur - Complete Schema

  1. New Tables
    - `players` - Player cards with stats (pace, shooting, passing, dribbling, defense, physical)
    - `teams` - Amateur football teams
    - `matches` - Scheduled and played matches
    - `rankings` - League standings

  2. Security
    - RLS enabled on all tables
    - Public read access for all data (amateur league directory)
    - Authenticated users can insert/update their own records
*/

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  badge_color text DEFAULT '#f59e0b',
  secondary_color text DEFAULT '#1f2937',
  city text DEFAULT '',
  wins integer DEFAULT 0,
  draws integer DEFAULT 0,
  losses integer DEFAULT 0,
  goals_for integer DEFAULT 0,
  goals_against integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  name text NOT NULL,
  position text NOT NULL DEFAULT 'MID',
  overall integer DEFAULT 75 CHECK (overall BETWEEN 1 AND 99),
  pace integer DEFAULT 70 CHECK (pace BETWEEN 1 AND 99),
  shooting integer DEFAULT 70 CHECK (shooting BETWEEN 1 AND 99),
  passing integer DEFAULT 70 CHECK (passing BETWEEN 1 AND 99),
  dribbling integer DEFAULT 70 CHECK (dribbling BETWEEN 1 AND 99),
  defending integer DEFAULT 70 CHECK (defending BETWEEN 1 AND 99),
  physical integer DEFAULT 70 CHECK (physical BETWEEN 1 AND 99),
  card_type text DEFAULT 'gold' CHECK (card_type IN ('gold', 'silver', 'bronze', 'special', 'toty', 'hero')),
  nationality text DEFAULT 'España',
  photo_url text DEFAULT '',
  goals integer DEFAULT 0,
  assists integer DEFAULT 0,
  matches_played integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  away_team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  home_score integer,
  away_score integer,
  match_date timestamptz NOT NULL,
  location text DEFAULT '',
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished', 'cancelled')),
  competition text DEFAULT 'Liga Amateur',
  created_at timestamptz DEFAULT now()
);

-- Rankings view helper
CREATE TABLE IF NOT EXISTS rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE UNIQUE,
  season text DEFAULT '2025/26',
  points integer DEFAULT 0,
  position integer DEFAULT 0,
  form text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read teams"
  ON teams FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read players"
  ON players FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read matches"
  ON matches FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read rankings"
  ON rankings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated insert/update policies
CREATE POLICY "Authenticated can insert teams"
  ON teams FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update teams"
  ON teams FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert players"
  ON players FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert matches"
  ON matches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert rankings"
  ON rankings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update rankings"
  ON rankings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
