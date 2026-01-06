import { createClient } from '@supabase/supabase-js';


const supabaseURL = import.meta.env.VITE_SUPABASE_API_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY;

if (!supabaseURL || !supabaseAnonKey) {

  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
    supabaseURL, 
    supabaseAnonKey,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        }
    }


);