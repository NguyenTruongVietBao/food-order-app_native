import { getCurrentUser, signOut } from '@/lib/configs/user.appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
  signOut: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user: User) => set({ user }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

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
    await signOut();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
