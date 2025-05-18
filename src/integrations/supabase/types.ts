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
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string
          entity_type: string
          id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id: string
          entity_type: string
          id?: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      business_documents: {
        Row: {
          business_id: string
          created_at: string | null
          document_type: string
          document_url: string
          id: string
          review_notes: string | null
          reviewer_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          document_type: string
          document_url: string
          id?: string
          review_notes?: string | null
          reviewer_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          document_type?: string
          document_url?: string
          id?: string
          review_notes?: string | null
          reviewer_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_documents_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_documents_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      business_hours: {
        Row: {
          business_id: string
          close_time: string
          created_at: string | null
          day: number
          id: string
          open_time: string
        }
        Insert: {
          business_id: string
          close_time: string
          created_at?: string | null
          day: number
          id?: string
          open_time: string
        }
        Update: {
          business_id?: string
          close_time?: string
          created_at?: string | null
          day?: number
          id?: string
          open_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_hours_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_photos: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          order: number
          url: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          order?: number
          url: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_photos_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          phone: string | null
          state: string | null
          status: string
          updated_at: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          phone?: string | null
          state?: string | null
          status?: string
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          phone?: string | null
          state?: string | null
          status?: string
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          place_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          place_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          place_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      itineraries: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_items: {
        Row: {
          created_at: string | null
          end_time: string | null
          id: string
          itinerary_id: string
          notes: string | null
          order_index: number
          place_id: string
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          itinerary_id: string
          notes?: string | null
          order_index: number
          place_id: string
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          itinerary_id?: string
          notes?: string | null
          order_index?: number
          place_id?: string
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_items_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "itineraries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_items_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address: string | null
          business_hours: Json | null
          created_at: string | null
          description: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          phone: string | null
          photo_references: string[] | null
          place_type: string | null
          price_level: number | null
          rating: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: Json | null
          created_at?: string | null
          description?: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          phone?: string | null
          photo_references?: string[] | null
          place_type?: string | null
          price_level?: number | null
          rating?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          phone?: string | null
          photo_references?: string[] | null
          place_type?: string | null
          price_level?: number | null
          rating?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          role: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id: string
          role?: string
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          role?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      search_history: {
        Row: {
          created_at: string | null
          id: string
          parsed_intent: Json | null
          query: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          parsed_intent?: Json | null
          query: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          parsed_intent?: Json | null
          query?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_audit_log: {
        Args: {
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          details?: Json
        }
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
    Enums: {},
  },
} as const
