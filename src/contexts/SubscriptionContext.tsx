
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionState {
  isSubscribed: boolean;
  planType: string | null;
  isCanceled: boolean;
  currentPeriodEnd: string | null;
  isLoading: boolean;
  checkSubscription: () => Promise<void>;
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

const SubscriptionContext = createContext<SubscriptionState | undefined>(undefined);

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { session } = useAuth();
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [planType, setPlanType] = useState<string | null>(null);
  const [isCanceled, setIsCanceled] = useState(false);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSubscription = async () => {
    if (!session?.access_token) {
      setIsSubscribed(false);
      setPlanType(null);
      setIsCanceled(false);
      setCurrentPeriodEnd(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('check-subscription', {});

      if (error) {
        throw new Error(error.message);
      }

      setIsSubscribed(data.active);
      setPlanType(data.plan);
      setIsCanceled(data.cancel_at_period_end);
      setCurrentPeriodEnd(data.current_period_end);
    } catch (error: any) {
      console.error('Error checking subscription status:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify subscription status',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [session]);

  const value = {
    isSubscribed,
    planType,
    isCanceled,
    currentPeriodEnd,
    isLoading,
    checkSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
