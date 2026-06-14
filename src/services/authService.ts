import { supabase } from '../config/supabase';
import { User } from '../types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const authService = {
  // Sign up with email and password
  signUpWithEmail: async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      // Create default user settings
      if (data.user) {
        await createDefaultUserSettings(data.user.id);
      }

      return { user: data.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  },

  // Sign in with email and password
  signInWithEmail: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { user: data.user, session: data.session, error: null };
    } catch (error: any) {
      return { user: null, session: null, error: error.message };
    }
  },

  // Sign in with Google
  signInWithGoogle: async (idToken: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) throw error;

      // Create default user settings if first time
      if (data.user) {
        await createDefaultUserSettings(data.user.id);
      }

      return { user: data.user, session: data.session, error: null };
    } catch (error: any) {
      return { user: null, session: null, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session: data.session, error: null };
    } catch (error: any) {
      return { session: null, error: error.message };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      // Sign out from Google if needed
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        console.log('Not signed in with Google');
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Update password
  updatePassword: async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },
};

// Helper function to create default user settings
const createDefaultUserSettings = async (userId: string) => {
  try {
    // Check if settings already exist
    const { data: existingSettings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!existingSettings) {
      await supabase.from('user_settings').insert([
        {
          user_id: userId,
          language: 'ar',
          incubation_period_days: 14,
          weaning_period_days: 30,
          meal_notifications_enabled: true,
          dark_mode: false,
        },
      ]);
    }
  } catch (error) {
    console.log('Settings might already exist:', error);
  }
};
