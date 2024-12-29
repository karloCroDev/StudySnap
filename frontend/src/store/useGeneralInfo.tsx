// External packages
import { create } from 'zustand';

export const useGeneralInfo = create<{
  user: string;
  setUser: (val: string) => void;
}>((set) => ({
  user: '',
  setUser: (val) => set({ user: val }),
}));
