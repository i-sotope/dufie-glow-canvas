import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

// Define user type (can potentially be enhanced with Supabase data)
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  photoURL?: string | null;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
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
    setLoading(true);
    // Check initial session state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const supabaseUser = session.user;
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email,
          photoURL: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
          app_metadata: supabaseUser.app_metadata,
          user_metadata: supabaseUser.user_metadata,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);
        if (session) {
          const supabaseUser = session.user;
          const newUser: User = {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email,
            photoURL: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
            app_metadata: supabaseUser.app_metadata,
            user_metadata: supabaseUser.user_metadata,
          };
          setUser(newUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Sign-in with Google using Supabase OAuth
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast.error("Sign in failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  // Sign out using Supabase
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully!", {
        description: "You have been signed out of your account.",
      });
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error("Sign out failed", {
        description: error.message || "Something went wrong. Please try again.",
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
