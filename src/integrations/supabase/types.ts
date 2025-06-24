export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_revenue_data: {
        Row: {
          created_at: string
          id: string
          name: string
          revenue: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          revenue: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          revenue?: number
        }
        Relationships: []
      }
      admin_stats: {
        Row: {
          change: string
          created_at: string
          icon: string
          icon_bg: string
          id: string
          title: string
          value: string
        }
        Insert: {
          change: string
          created_at?: string
          icon: string
          icon_bg: string
          id?: string
          title: string
          value: string
        }
        Update: {
          change?: string
          created_at?: string
          icon?: string
          icon_bg?: string
          id?: string
          title?: string
          value?: string
        }
        Relationships: []
      }
      admin_subscription_data: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          value: number
        }
        Insert: {
          color: string
          created_at?: string
          id?: string
          name: string
          value: number
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          value?: number
        }
        Relationships: []
      }
      admin_user_activities: {
        Row: {
          details: string
          event_type: string
          id: string
          performed_by: string
          timestamp: string
        }
        Insert: {
          details: string
          event_type: string
          id?: string
          performed_by: string
          timestamp?: string
        }
        Update: {
          details?: string
          event_type?: string
          id?: string
          performed_by?: string
          timestamp?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          role: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          role: string
          status: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      affiliates: {
        Row: {
          Clicks: number | null
          commission_rate: number | null
          created_at: string
          Earnings: number | null
          Email: string | null
          id: string
          Name: string | null
          referral_code: string | null
          Revenue: number | null
          "Sign Ups": number | null
          Tier_1: number | null
          Tier_2: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          Clicks?: number | null
          commission_rate?: number | null
          created_at?: string
          Earnings?: number | null
          Email?: string | null
          id?: string
          Name?: string | null
          referral_code?: string | null
          Revenue?: number | null
          "Sign Ups"?: number | null
          Tier_1?: number | null
          Tier_2?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          Clicks?: number | null
          commission_rate?: number | null
          created_at?: string
          Earnings?: number | null
          Email?: string | null
          id?: string
          Name?: string | null
          referral_code?: string | null
          Revenue?: number | null
          "Sign Ups"?: number | null
          Tier_1?: number | null
          Tier_2?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      calls: {
        Row: {
          call_sid: string | null
          created_at: string
          direction: string
          duration: number | null
          ended_at: string | null
          from_number: string
          id: string
          recording_url: string | null
          started_at: string | null
          status: string
          to_number: string
          transcript: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          call_sid?: string | null
          created_at?: string
          direction: string
          duration?: number | null
          ended_at?: string | null
          from_number: string
          id?: string
          recording_url?: string | null
          started_at?: string | null
          status: string
          to_number: string
          transcript?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          call_sid?: string | null
          created_at?: string
          direction?: string
          duration?: number | null
          ended_at?: string | null
          from_number?: string
          id?: string
          recording_url?: string | null
          started_at?: string | null
          status?: string
          to_number?: string
          transcript?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          call_id: string
          created_at: string
          id: string
          is_ai: boolean
          message_content: string
        }
        Insert: {
          call_id: string
          created_at?: string
          id?: string
          is_ai: boolean
          message_content: string
        }
        Update: {
          call_id?: string
          created_at?: string
          id?: string
          is_ai?: boolean
          message_content?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "calls"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          business_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          industry: string | null
          last_name: string
          phone: string
          plan: string
          status: string
          user_id: string | null
        }
        Insert: {
          business_name: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          industry?: string | null
          last_name: string
          phone: string
          plan: string
          status?: string
          user_id?: string | null
        }
        Update: {
          business_name?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          industry?: string | null
          last_name?: string
          phone?: string
          plan?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_history: {
        Row: {
          Amount: number | null
          created_at: string
          id: number
          payment_method: string | null
          referrals: number | null
          status: string | null
        }
        Insert: {
          Amount?: number | null
          created_at?: string
          id?: number
          payment_method?: string | null
          referrals?: number | null
          status?: string | null
        }
        Update: {
          Amount?: number | null
          created_at?: string
          id?: number
          payment_method?: string | null
          referrals?: number | null
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      receptionist_configs: {
        Row: {
          business_hours: Json | null
          business_name: string | null
          created_at: string
          custom_instructions: string | null
          fallback_message: string | null
          greeting_message: string | null
          id: string
          updated_at: string
          user_id: string
          voice_type: string | null
        }
        Insert: {
          business_hours?: Json | null
          business_name?: string | null
          created_at?: string
          custom_instructions?: string | null
          fallback_message?: string | null
          greeting_message?: string | null
          id?: string
          updated_at?: string
          user_id: string
          voice_type?: string | null
        }
        Update: {
          business_hours?: Json | null
          business_name?: string | null
          created_at?: string
          custom_instructions?: string | null
          fallback_message?: string | null
          greeting_message?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          voice_type?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          affiliate_id: string
          commission_amount: number | null
          created_at: string
          id: string
          referred_user_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          commission_amount?: number | null
          created_at?: string
          id?: string
          referred_user_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number | null
          created_at?: string
          id?: string
          referred_user_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      sample_calls: {
        Row: {
          bookings: number
          calls: number
          created_at: string
          day: string
          id: string
          user_id: string | null
        }
        Insert: {
          bookings: number
          calls: number
          created_at?: string
          day: string
          id?: string
          user_id?: string | null
        }
        Update: {
          bookings?: number
          calls?: number
          created_at?: string
          day?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voicemails: {
        Row: {
          call_id: string
          created_at: string
          id: string
          is_read: boolean | null
          recording_url: string | null
          transcript: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          call_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          recording_url?: string | null
          transcript?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          call_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          recording_url?: string | null
          transcript?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicemails_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "calls"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_sample_data: {
        Args: { uid: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "affiliate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "affiliate"],
    },
  },
} as const
