
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      items: {
        Row: {
          id: string
          user_id: string
          user_name: string
          user_phone: string
          product_name: string
          photo_url: string | null
          place: string
          date: string
          type: string
          status: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          user_name: string
          user_phone: string
          product_name: string
          photo_url?: string | null
          place: string
          date: string
          type: string
          status: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          user_name?: string
          user_phone?: string
          product_name?: string
          photo_url?: string | null
          place?: string
          date?: string
          type?: string
          status?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          role: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
