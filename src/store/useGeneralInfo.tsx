// External packages
import { create } from 'zustand';

export const useGeneralInfo = create<{
  search: string;
  setSerach: (val: string) => void;
}>((set) => ({
  search: '',
  setSerach: (val) => set({ search: val.toLowerCase() }),
}));
