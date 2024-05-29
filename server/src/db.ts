import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase: SupabaseClient | null = null;

export const connect = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("SUPABASE_URL and SUPABASE_KEY must be defined");
  }
  supabase = createClient(supabaseUrl, supabaseKey);
};

export const client = (): SupabaseClient => {
  if (!supabase) {
    throw new Error(
      "Supabase client is not initialized. Call connect() first."
    );
  }
  return supabase;
};
