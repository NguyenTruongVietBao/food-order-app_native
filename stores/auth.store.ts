import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from '@/lib/configs/user.appwrite';
import { User } from '@/type';
import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  fetchAuthenticatedUser: () => Promise<void>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
};

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      fetchAuthenticatedUser: async () => {
        try {
          set({ isLoading: true });
          const user = await getCurrentUser();
          if (!user) {
            set({ user: null, isAuthenticated: false });
            return;
          }
          set({
            user: user as User,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Error fetching authenticated user', error);
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
      signOut: async () => {
        try {
          set({ isLoading: true });
          await signOut();
          set({ user: null, isAuthenticated: false });
          await deleteItemAsync('auth-store');
        } catch (error) {
          console.error('Error signing out', error);
        } finally {
          set({ isLoading: false });
        }
      },
      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const newSession = await signIn({ email, password });
          if (!newSession) {
            throw new Error('Failed to sign in');
          }
          const user = await getCurrentUser();
          set({
            user: user as User,
            isAuthenticated: true,
          });
          setItem('auth-store', JSON.stringify(user));
        } catch (error) {
          console.error('Error signing in', error);
        } finally {
          set({ isLoading: false });
        }
      },
      signUp: async (name: string, email: string, password: string) => {
        try {
          set({ isLoading: true });
          const newUser = await signUp({ name, email, password });
          if (!newUser) {
            throw new Error('Failed to sign up');
          }
          set({ user: newUser as User, isAuthenticated: true });
          setItem('auth-store', JSON.stringify(newUser));
        } catch (error) {
          console.error('Error signing up', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);

export default useAuthStore;
