import { createClient, SupabaseClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
let supabase: SupabaseClient | null = null

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined')
}

export const connect = () => {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export const client = (): SupabaseClient => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized. Call connect() first.')
  }
  return supabase
}