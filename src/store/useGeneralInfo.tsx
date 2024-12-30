// External packages
import { create } from 'zustand';

interface UserProps {
  id?: string | number; // Remove number, only because it si test data
  email?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const useGeneralInfo = create<{
  user: UserProps;
  setUser: (val: UserProps) => void;
}>((set) => ({
  user: {},
  setUser: (val) => set({ user: val }),
}));
