
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

interface SubscriptionContextType {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt: Date | null;
  features: string[];
  upgrade: (newTier: SubscriptionTier) => Promise<void>;
  cancel: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  
  // Features available based on subscription tier
  const [features, setFeatures] = useState<string[]>([]);

  // Simulate loading subscription data when user changes
  useEffect(() => {
    if (user) {
      // For demo purposes, we'll simulate a starter subscription
      setTier('starter');
      setIsActive(true);
      
      // Set expiration to 30 days from now
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 30);
      setExpiresAt(expDate);
      
      // Set features based on tier
      setFeatures([
        '24/7 AI Receptionist',
        'Up to 500 minutes/month',
        'Basic call analytics',
        'Email notifications',
      ]);
    } else {
      // Reset to free when not logged in
      setTier('free');
      setIsActive(true);
      setExpiresAt(null);
      setFeatures(['Limited AI Receptionist']);
    }
  }, [user]);

  // Upgrade subscription tier
  const upgrade = async (newTier: SubscriptionTier): Promise<void> => {
    // This would make an API call to handle the upgrade
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTier(newTier);
        // Update features based on new tier
        if (newTier === 'professional') {
          setFeatures([
            'Everything in Starter',
            'Up to 1500 minutes/month',
            'Advanced call routing',
            'SMS notifications',
            'Custom voice selection',
          ]);
        } else if (newTier === 'enterprise') {
          setFeatures([
            'Everything in Professional',
            'Unlimited minutes',
            'Premium voice options',
            'API integration',
            'Custom script development',
            'Dedicated support',
          ]);
        }
        resolve();
      }, 1000);
    });
  };

  // Cancel subscription
  const cancel = async (): Promise<void> => {
    // This would make an API call to handle the cancellation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTier('free');
        setFeatures(['Limited AI Receptionist']);
        resolve();
      }, 1000);
    });
  };

  return (
    <SubscriptionContext.Provider value={{ 
      tier, 
      isActive, 
      expiresAt, 
      features, 
      upgrade, 
      cancel
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
