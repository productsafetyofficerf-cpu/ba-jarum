import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are not configured. Check .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Photo = {
  id: string;
  user_id: string;
  image_url: string;
  caption: string | null;
  photo_date: string;
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  username: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
};
