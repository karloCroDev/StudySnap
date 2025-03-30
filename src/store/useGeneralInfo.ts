// External packages
import { create } from 'zustand';

// General state mnangment between components, mostly used to add, delete, or update subject or note on frontend.
export const useGeneralInfo = create<{
  // Karlo: Procjeni za search
  search: string;
  setSearch: (val: string) => void;
}>((set) => ({
  search: '',
  setSearch: (val) => set({ search: val.toLowerCase() }),
}));
