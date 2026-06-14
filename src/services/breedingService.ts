import { supabase } from '../config/supabase';
import { BreedingCycle } from '../types';

export const breedingService = {
  // Create a new breeding cycle
  createBreedingCycle: async (
    userId: string,
    pairId: string,
    startDate: string,
    expectedHatchDate: string,
    expectedWeaningDate: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('breeding_cycles')
        .insert([
          {
            user_id: userId,
            pair_id: pairId,
            start_date: startDate,
            expected_hatch_date: expectedHatchDate,
            expected_weaning_date: expectedWeaningDate,
            status: 'eggs',
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

  // Get all breeding cycles for a pair
  getCyclesByPair: async (pairId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('breeding_cycles')
        .select('*')
        .eq('pair_id', pairId)
        .eq('user_id', userId)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  },

  // Get ongoing cycles
  getOngoingCycles: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('breeding_cycles')
        .select(
          `
          *,
          pair:pair_id(*)
        `
        )
        .eq('user_id', userId)
        .in('status', ['eggs', 'hatched', 'weaning'])
        .order('expected_hatch_date', { ascending: true });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  },

  // Get cycle by ID
  getCycleById: async (cycleId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('breeding_cycles')
        .select(
          `
          *,
          pair:pair_id(*)
        `
        )
        .eq('id', cycleId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Confirm hatching
  confirmHatching: async (cycleId: string, userId: string, chicksCount: number) => {
    try {
      const { data, error } = await supabase
        .from('breeding_cycles')
        .update({
          status: 'hatched',
          actual_hatch_date: new Date().toISOString().split('T')[0],
          chicks_count: chicksCount,
        })
        .eq('id', cycleId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Confirm weaning
  confirmWeaning: async (cycleId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('breeding_cycles')
        .update({
          status: 'completed',
          actual_weaning_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', cycleId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Update cycle status
  updateCycleStatus: async (cycleId: string, userId: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('breeding_cycles')
        .update({ status })
        .eq('id', cycleId)
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
