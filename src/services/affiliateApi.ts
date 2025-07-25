import { ApiResponse } from '@/types/api';

export interface AffiliateUser {
  name: string;
  role: string;
  avatar: string;
  email?: string;
  affiliate_id?: string;
  status?: string;
}

export interface AffiliateProfileUpdate {
  name?: string;
  avatar?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class AffiliateApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async getAffiliateProfile(userId: string): Promise<AffiliateUser> {
    return this.makeRequest<AffiliateUser>(
      `/api/affiliate/profile?user_id=${userId}`
    );
  }

  async updateAffiliateProfile(
    userId: string, 
    profileData: AffiliateProfileUpdate
  ): Promise<AffiliateUser> {
    return this.makeRequest<AffiliateUser>(
      `/api/affiliate/profile?user_id=${userId}`,
      {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }
    );
  }

  async getAffiliateStats(userId: string): Promise<any> {
    return this.makeRequest(`/api/affiliate/stats?user_id=${userId}`);
  }

  async getAffiliatePayouts(userId: string): Promise<any> {
    return this.makeRequest(`/api/affiliate/payouts?user_id=${userId}`);
  }
}

export const affiliateApiService = new AffiliateApiService();
