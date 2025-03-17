import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Default to demo values if environment variables are not set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://xyzcompany.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdGJyc3Bub3ZqYnl0cWJwZHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NjY5NzcsImV4cCI6MjAxNTU0Mjk3N30.demo_key";

if (
  import.meta.env.VITE_SUPABASE_URL === undefined ||
  import.meta.env.VITE_SUPABASE_ANON_KEY === undefined
) {
  console.warn(
    "Supabase credentials are missing. Using demo values. Authentication and database features will work in demo mode only.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
