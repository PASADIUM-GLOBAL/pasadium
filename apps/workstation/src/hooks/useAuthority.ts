import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  roles: string[];
}

interface AuthorityState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (token: string, user: User) => void;
  terminate: () => void;
}

export const useAuthority = create<AuthorityState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  
  setSession: (token, user) => set({ 
    token, 
    user, 
    isAuthenticated: true 
  }),

  terminate: () => set({ 
    token: null, 
    user: null, 
    isAuthenticated: false 
  }),
}));
