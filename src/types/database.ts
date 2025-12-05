export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          category: 'places' | 'tech'
          image_url: string | null
          author: string
          created_at: string
          search_vector: unknown | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          category: 'places' | 'tech'
          image_url?: string | null
          author?: string
          created_at?: string
          search_vector?: unknown | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          category?: 'places' | 'tech'
          image_url?: string | null
          author?: string
          created_at?: string
          search_vector?: unknown | null
        }
      }
    }
  }
}

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
