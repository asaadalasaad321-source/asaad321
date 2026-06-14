import { supabase } from '../config/supabase';
import { Pair } from '../types';

export const pairService = {
  // Create a new pair
  createPair: async (
    userId: string,
    maleBirdId: string,
    femaleBirdId: string,
    pairingDate: string,
    notes?: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('pairs')
        .insert([
          {
            user_id: userId,
            male_bird_id: maleBirdId,
            female_bird_id: femaleBirdId,
            pairing_date: pairingDate,
            status: 'active',
            notes,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Get all pairs for user
  getPairs: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('pairs')
        .select(
          `
          *,
          male_bird:male_bird_id(*),
          female_bird:female_bird_id(*)
        `
        )
        .eq('user_id', userId)
        .order('pairing_date', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  },

  // Get active pairs
  getActivePairs: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('pairs')
        .select(
          `
          *,
          male_bird:male_bird_id(*),
          female_bird:female_bird_id(*)
        `
        )
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('pairing_date', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  },

  // Get pair by ID
  getPairById: async (pairId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('pairs')
        .select(
          `
          *,
          male_bird:male_bird_id(*),
          female_bird:female_bird_id(*)
        `
        )
        .eq('id', pairId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Update pair
  updatePair: async (pairId: string, userId: string, updates: Partial<Pair>) => {
    try {
      const { data, error } = await supabase
        .from('pairs')
        .update(updates)
        .eq('id', pairId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Delete pair
  deletePair: async (pairId: string, userId: string) => {
    try {
      const { error } = await supabase.from('pairs').delete().eq('id', pairId).eq('user_id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Separate pair (set status to separated)
  separatePair: async (pairId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('pairs')
        .update({ status: 'separated' })
        .eq('id', pairId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },
};
