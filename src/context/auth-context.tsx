
import { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/database.types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, adminCode?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin code for manual registration
const ADMIN_CODE = "79041167197200060295";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial session check and auth state listener
  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await fetchUserProfile(session.user.id, session.user.email || "");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setLoading(true);
          // Use setTimeout to avoid potential deadlocks
          setTimeout(async () => {
            await fetchUserProfile(session.user.id, session.user.email || "");
            setLoading(false);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to fetch user profile data
  const fetchUserProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      const profile = data as ProfileRow;
      
      // Get username from email (part before @)
      const username = email.split('@')[0];

      setUser({
        id: userId,
        name: profile?.name || username,
        email: email,
        role: (profile?.role as UserRole) || 'user',
        createdAt: profile?.created_at || new Date().toISOString()
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Fallback to basic user object
      setUser({
        id: userId,
        name: email.split('@')[0],
        email: email,
        role: 'user',
        createdAt: new Date().toISOString()
      });
    }
  };

  // Helper to clean up auth state
  const cleanupAuthState = () => {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      toast.success(`Welcome back, ${email.split('@')[0]}!`);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, adminCode?: string) => {
    setLoading(true);
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      let role: UserRole = "user";
      
      // Check admin code if provided
      if (adminCode) {
        if (adminCode === ADMIN_CODE) {
          role = "admin";
        } else {
          toast.error("Invalid admin code");
          setLoading(false);
          return;
        }
      }

      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) throw error;
      
      toast.success(`Welcome, ${email.split('@')[0]}!${role === "admin" ? " Admin access granted." : ""}`);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      setUser(null);
      toast.info("Logged out successfully");
      
      // Force page reload for a clean state
      window.location.href = '/login';
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
