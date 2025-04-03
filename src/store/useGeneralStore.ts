// External packages
import { create } from 'zustand';

// General state mnangment between components. Currently only used in search values
export const useGeneralStore = create<{
  search: string;
  setSearch: (val: string) => void;
}>((set) => ({
  search: '',
  setSearch: (val) => set({ search: val.toLowerCase() }),
}));
