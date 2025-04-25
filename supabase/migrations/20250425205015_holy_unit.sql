/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `level` (integer)
      - `diamonds` (integer)
      - `wellness` (integer)
      - `aura` (integer)
      - `strength` (integer)
      - `defeated_monsters` (integer array)
      - `created_at` (timestamp)
    - `monsters`
      - `id` (integer, primary key)
      - `name` (text)
      - `level` (integer)
      - `wellness` (integer)
      - `aura` (integer)
      - `strength` (integer)
      - `diamonds_reward` (integer)
      - `image_url` (text)
    - `leaderboard`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `diamonds` (integer)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  username text UNIQUE NOT NULL,
  level integer DEFAULT 1,
  diamonds integer DEFAULT 0,
  wellness integer DEFAULT 0,
  aura integer DEFAULT 0,
  strength integer DEFAULT 0,
  defeated_monsters integer[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create monsters table
CREATE TABLE IF NOT EXISTS monsters (
  id integer PRIMARY KEY,
  name text NOT NULL,
  level integer NOT NULL,
  wellness integer NOT NULL,
  aura integer NOT NULL,
  strength integer NOT NULL,
  diamonds_reward integer NOT NULL,
  image_url text NOT NULL
);

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  diamonds integer NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE monsters ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read monsters"
  ON monsters
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own leaderboard entry"
  ON leaderboard
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial monsters
INSERT INTO monsters (id, name, level, wellness, aura, strength, diamonds_reward, image_url) VALUES
  (1, 'Shadow Lurker', 1, 30, 20, 25, 10, 'https://models.readyplayer.me/63e9c6c8c81d1e98911a3a2b.png'),
  (2, 'Crystal Golem', 2, 40, 30, 45, 20, 'https://models.readyplayer.me/63e9c6f8c81d1e98911a3a2c.png'),
  (3, 'Venom Serpent', 3, 55, 50, 40, 30, 'https://models.readyplayer.me/63e9c728c81d1e98911a3a2d.png'),
  (4, 'Frost Wraith', 4, 65, 60, 50, 40, 'https://models.readyplayer.me/63e9c758c81d1e98911a3a2e.png'),
  (5, 'Lava Behemoth', 5, 70, 65, 80, 50, 'https://models.readyplayer.me/63e9c788c81d1e98911a3a2f.png'),
  (6, 'Shadow Dragon', 6, 85, 75, 90, 60, 'https://models.readyplayer.me/63e9c7b8c81d1e98911a3a30.png');