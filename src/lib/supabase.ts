import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUpUser = async (username: string, email: string, password: string) => {
  const { data: existingUser } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .single();

  if (existingUser) {
    throw new Error('Username already taken');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username
      }
    }
  });

  if (error) throw error;

  // Create user profile
  await supabase.from('users').insert([
    {
      id: data.user?.id,
      username,
      level: 1,
      diamonds: 0,
      wellness: 0,
      aura: 0,
      strength: 0,
      defeated_monsters: []
    }
  ]);

  return data;
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getLeaderboard = async () => {
  const { data, error } = await supabase
    .from('leaderboard')
    .select(`
      id,
      diamonds,
      users (
        username
      )
    `)
    .order('diamonds', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
};

export const updateLeaderboard = async (userId: string, diamonds: number) => {
  const { error } = await supabase
    .from('leaderboard')
    .upsert({
      user_id: userId,
      diamonds
    });

  if (error) throw error;
};