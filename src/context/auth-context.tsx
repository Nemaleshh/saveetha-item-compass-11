
import { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, adminCode?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@sec.edu",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Test User",
    email: "user@sec.edu",
    role: "user",
    createdAt: new Date().toISOString(),
  },
];

const ADMIN_CODE = "79041167197200060295";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("sec_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user", error);
        localStorage.removeItem("sec_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call
      const user = MOCK_USERS.find((u) => u.email === email);
      
      if (user) {
        setUser(user);
        localStorage.setItem("sec_user", JSON.stringify(user));
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        // Register new user
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          name: email.split("@")[0],
          email,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        setUser(newUser);
        localStorage.setItem("sec_user", JSON.stringify(newUser));
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, adminCode?: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user exists
      const existingUser = MOCK_USERS.find((u) => u.email === email);
      if (existingUser) {
        toast.error("User already exists");
        return;
      }

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

      // Register new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem("sec_user", JSON.stringify(newUser));
      toast.success(`Welcome, ${name}!${role === "admin" ? " Admin access granted." : ""}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sec_user");
    toast.info("Logged out successfully");
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
