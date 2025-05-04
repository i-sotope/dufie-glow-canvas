
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from "@/components/ui/sonner";

// Define user type
export interface User {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage on component mount
    const storedUser = localStorage.getItem('dufie_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      toast.success("Welcome back!", {
        description: "You've been automatically signed in.",
      });
    }
    setLoading(false);
  }, []);

  // Mock sign-in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Simulate a Google auth response
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        email: 'user@example.com',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      };
      
      setUser(mockUser);
      localStorage.setItem('dufie_user', JSON.stringify(mockUser));
      toast.success("Sign in successful!", {
        description: "Welcome to Dufie's Skincare.",
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error("Sign in failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('dufie_user');
      toast.success("Signed out successfully!", {
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Sign out failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
