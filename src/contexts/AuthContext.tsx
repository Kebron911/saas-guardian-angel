import React, { createContext, useContext, useState, useEffect } from 'react';
import { DatabaseInterface } from '@/database_interface';

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
  isAffiliate: boolean;
  applyForAffiliate: () => Promise<void>;
  checkUserRole: () => Promise<Role>;
  updateUser: (id: string, email: string) => void;
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
    
    // Check role on initial load
    if (user) {
      checkUserRole().then(detectedRole => {
        setRole(detectedRole);
      });
    }
  }, [user?.id]);

  const signOut = async () => {
    // In a real app with Supabase Auth:
    // await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole('user');
  };

  const isAffiliate = role === 'affiliate';

  const applyForAffiliate = async () => {
    // In a real app, this would make an API call to submit the application
    // For demo purposes, we'll just set the role
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setRole('affiliate');
        resolve();
      }, 1000);
    });
  };

  const checkUserRole = async (): Promise<Role> => {
    if (!user) return 'user';
    
    const email = user.email?.toLowerCase() || '';
    
    if (email === 'admin@example.com') {
      return 'admin';
    } else if (email === 'affiliate@example.com') {
      return 'affiliate';
    }
    
    try {
      // Check if the user has the admin role
      const adminRole = await DatabaseInterface.select('user_roles', { 
        user_id: user.id, 
        role: 'admin' 
      });
      
      if (adminRole && adminRole.length > 0) {
        return 'admin';
      }
      
      // Check if the user has an affiliate entry
      const affiliate = await DatabaseInterface.select('affiliates', {
        user_id: user.id
      });
        
      if (affiliate && affiliate.length > 0) {
        return 'affiliate';
      }
    } catch (error) {
      console.error("Error checking user role:", error);
    }

    return 'user';
  };

  // Add a function to update user based on input
  const updateUser = (id: string, email: string) => {
    setUser({
      id,
      email,
    });
  };

  return (
    <AuthContext.Provider value={{ 
      role, 
      setRole, 
      user, 
      session, 
      signOut,
      isAffiliate,
      applyForAffiliate,
      checkUserRole,
      updateUser
    }}>
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

// Usage example elsewhere in your app:
// const { updateUser } = useAuth();
// updateUser("new-id", "new@email.com");
