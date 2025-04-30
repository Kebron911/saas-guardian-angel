
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Role = 'user' | 'admin' | 'affiliate';

interface User {
  id: string;
  email?: string;
}

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  user: User | null;
  session: any | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>('user');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  
  useEffect(() => {
    // For demo purposes, we're simulating a user session
    setUser({
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'demo@example.com'
    });
    
    // This is a placeholder. In a real app, you would use Supabase Auth
    // and have proper session management
  }, []);

  const signOut = async () => {
    // In a real app with Supabase Auth:
    // await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole('user');
  };

  return (
    <AuthContext.Provider value={{ role, setRole, user, session, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
