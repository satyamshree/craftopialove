import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string;
          icon?: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          icon?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          price: number;
          compare_at_price: number | null;
          image_url: string;
          images: string[];
          category_id: string | null;
          occasion: string;
          recipient: string;
          featured: boolean;
          bestseller: boolean;
          new_arrival: boolean;
          inventory: number;
          gift_packaging_available: boolean;
          customization_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string;
          price?: number;
          compare_at_price?: number | null;
          image_url?: string;
          images?: string[];
          category_id?: string | null;
          occasion?: string;
          recipient?: string;
          featured?: boolean;
          bestseller?: boolean;
          new_arrival?: boolean;
          inventory?: number;
          gift_packaging_available?: boolean;
          customization_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          price?: number;
          compare_at_price?: number | null;
          image_url?: string;
          images?: string[];
          category_id?: string | null;
          occasion?: string;
          recipient?: string;
          featured?: boolean;
          bestseller?: boolean;
          new_arrival?: boolean;
          inventory?: number;
          gift_packaging_available?: boolean;
          customization_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          title: string;
          comment: string;
          verified_purchase: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          rating: number;
          title?: string;
          comment?: string;
          verified_purchase?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string;
          rating?: number;
          title?: string;
          comment?: string;
          verified_purchase?: boolean;
          created_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          gift_packaging: boolean;
          customization_text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity?: number;
          gift_packaging?: boolean;
          customization_text?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          quantity?: number;
          gift_packaging?: boolean;
          customization_text?: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          status: string;
          total: number;
          subtotal: number;
          shipping: number;
          discount: number;
          shipping_name: string;
          shipping_address: string;
          shipping_city: string;
          shipping_state: string;
          shipping_zip: string;
          shipping_country: string;
          shipping_phone: string;
          notes: string;
          payment_status: string;
          payment_method: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_number: string;
          status?: string;
          total: number;
          subtotal: number;
          shipping?: number;
          discount?: number;
          shipping_name?: string;
          shipping_address?: string;
          shipping_city?: string;
          shipping_state?: string;
          shipping_zip?: string;
          shipping_country?: string;
          shipping_phone?: string;
          notes?: string;
          payment_status?: string;
          payment_method?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_number?: string;
          status?: string;
          total?: number;
          subtotal?: number;
          shipping?: number;
          discount?: number;
          shipping_name?: string;
          shipping_address?: string;
          shipping_city?: string;
          shipping_state?: string;
          shipping_zip?: string;
          shipping_country?: string;
          shipping_phone?: string;
          notes?: string;
          payment_status?: string;
          payment_method?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          price: number;
          quantity: number;
          gift_packaging: boolean;
          customization_text: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name: string;
          price: number;
          quantity: number;
          gift_packaging?: boolean;
          customization_text?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name?: string;
          price?: number;
          quantity?: number;
          gift_packaging?: boolean;
          customization_text?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};

export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type CartItem = Database['public']['Tables']['cart_items']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];

export type CartItemWithProduct = CartItem & {
  products: Product;
};

export type ProductWithCategory = Product & {
  categories: Category | null;
};
