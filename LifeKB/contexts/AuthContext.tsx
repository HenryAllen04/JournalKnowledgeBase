import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { router } from 'expo-router';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
});

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'Has session' : 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Navigate based on auth event
      if (event === 'SIGNED_IN') {
        console.log('User signed in, redirecting to tabs');
        router.replace('/(tabs)');
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out, redirecting to auth');
        router.replace('/(auth)');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle navigation after initial session check
  useEffect(() => {
    if (!isLoading && !hasNavigated) {
      setHasNavigated(true);
      if (session) {
        console.log('Initial check: User is authenticated, going to tabs');
        router.replace('/(tabs)');
      } else {
        console.log('Initial check: No user, going to auth');
        router.replace('/(auth)');
      }
    }
  }, [isLoading, session, hasNavigated]);

  const value = {
    session,
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using the context
export function useAuth() {
  return useContext(AuthContext);
} 