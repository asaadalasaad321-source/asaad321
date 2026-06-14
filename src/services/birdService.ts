import { supabase } from '../config/supabase';
import { Bird } from '../types';

export const birdService = {
  // Create a new bird
  createBird: async (userId: string, birdData: Omit<Bird, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('birds')
        .insert([{ ...birdData, user_id: userId }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Get all birds for user
  getBirds: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('birds')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  },

  // Get bird by ID
  getBirdById: async (birdId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('birds')
        .select('*')
        .eq('id', birdId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Get available birds (for pairing)
  getAvailableBirds: async (userId: string, gender?: 'male' | 'female') => {
    try {
      let query = supabase
        .from('birds')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'available');

      if (gender) {
        query = query.eq('gender', gender);
      }

      const { data, error } = await query.order('ring_number');

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  },

  // Update bird
  updateBird: async (birdId: string, userId: string, updates: Partial<Bird>) => {
    try {
      const { data, error } = await supabase
        .from('birds')
        .update(updates)
        .eq('id', birdId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Delete bird
  deleteBird: async (birdId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('birds')
        .delete()
        .eq('id', birdId)
        .eq('user_id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Check if ring number exists
  ringNumberExists: async (userId: string, ringNumber: string, excludeId?: string) => {
    try {
      let query = supabase
        .from('birds')
        .select('id')
        .eq('user_id', userId)
        .eq('ring_number', ringNumber);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query.single();

      if (error && error.code !== 'PGRST116') throw error;
      return { exists: !!data, error: null };
    } catch (error: any) {
      return { exists: false, error: error.message };
    }
  },
};
