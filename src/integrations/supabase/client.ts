
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = "https://tzpaftdelrgtgcuzpsjj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cGFmdGRlbHJndGdjdXpwc2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDMzMTgsImV4cCI6MjA2MjExOTMxOH0.t3ZMP2blfW7nEg8l3eQsjfbEtZPMqcp2p2mMFJKYj8s";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true
  }
});
