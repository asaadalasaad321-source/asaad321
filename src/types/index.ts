// User Types
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
  created_at: string;
}

// Bird Types
export interface Bird {
  id: string;
  user_id: string;
  ring_number: string;
  species: string;
  gender: 'male' | 'female' | 'unknown';
  birth_date: string;
  color: string;
  image_url?: string;
  status: 'available' | 'paired' | 'sick' | 'deceased';
  created_at: string;
}

// Pair Types
export interface Pair {
  id: string;
  user_id: string;
  male_bird_id: string;
  female_bird_id: string;
  pairing_date: string;
  status: 'active' | 'separated';
  notes?: string;
  created_at: string;
  male_bird?: Bird;
  female_bird?: Bird;
}

// Breeding Cycle Types
export interface BreedingCycle {
  id: string;
  user_id: string;
  pair_id: string;
  start_date: string;
  expected_hatch_date: string;
  actual_hatch_date?: string;
  chicks_count?: number;
  expected_weaning_date: string;
  actual_weaning_date?: string;
  status: 'eggs' | 'hatched' | 'weaning' | 'completed';
  created_at: string;
  pair?: Pair;
}

// Feeding Schedule Types
export type MealType = 'sprouted_seeds' | 'boiled_egg' | 'staple_grains' | 'vegetables' | 'fruits' | 'supplements' | 'leafy_greens';

export interface FeedingSchedule {
  id: string;
  user_id: string;
  day_of_week: number; // 0-6 (Saturday-Friday)
  meal_type: MealType;
  recipe_description: string;
  time: string; // HH:MM format
  notes?: string;
  created_at: string;
}

// Transaction Types
export type TransactionType = 'purchase' | 'sale' | 'expense';
export type TransactionCategory = 'bird' | 'cage' | 'food' | 'medicine' | 'other_supplies';

export interface InventoryTransaction {
  id: string;
  user_id: string;
  bird_id?: string;
  pair_id?: string;
  transaction_type: TransactionType;
  category: TransactionCategory;
  quantity: number;
  unit_price: number;
  total_amount: number;
  transaction_date: string;
  notes?: string;
  created_at: string;
  bird?: Bird;
  pair?: Pair;
}

// User Settings Types
export interface UserSettings {
  id: string;
  user_id: string;
  language: 'en' | 'ar';
  incubation_period_days: number;
  weaning_period_days: number;
  meal_notifications_enabled: boolean;
  dark_mode: boolean;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  error: string | null;
}
