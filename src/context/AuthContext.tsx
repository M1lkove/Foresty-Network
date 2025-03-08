
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

type UserRole = 'admin' | 'job-seeker' | 'job-poster';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  userRole: UserRole | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Check for an active session
    const checkSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
      } else if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        
        // Check user role from profiles table
        const { data: profileData } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.session.user.id)
          .single();
        
        const userTypeFromDb = profileData?.user_type || null;
        const isUserAdmin = userTypeFromDb === 'admin';
        
        setIsAdmin(isUserAdmin);
        
        if (userTypeFromDb) {
          setUserRole(userTypeFromDb as UserRole);
        } else {
          // Fallback check based on email format for backwards compatibility
          const userEmail = data.session.user.email || '';
          const isJobPoster = userEmail.includes('employer') || userEmail.includes('job-poster');
          setUserRole(isJobPoster ? 'job-poster' : 'job-seeker');
        }
      }
      
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
        
        if (newSession?.user) {
          // Check user role from profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', newSession.user.id)
            .single();
          
          const userTypeFromDb = profileData?.user_type || null;
          const isUserAdmin = userTypeFromDb === 'admin';
          
          setIsAdmin(isUserAdmin);
          
          if (userTypeFromDb) {
            setUserRole(userTypeFromDb as UserRole);
          } else {
            // Fallback check based on email format for backwards compatibility
            const userEmail = newSession.user.email || '';
            const isJobPoster = userEmail.includes('employer') || userEmail.includes('job-poster');
            setUserRole(isJobPoster ? 'job-poster' : 'job-seeker');
          }
        } else {
          setIsAdmin(false);
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    isAdmin,
    userRole,
    isLoading,
    signOut,
    setUser,
    setIsAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
