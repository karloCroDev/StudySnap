// External packages
import { create } from 'zustand';

// Models (types)
import { Note } from '@/models/note';

export const useGeneralInfo = create<{
  search: string;
  setSerach: (val: string) => void;
  subjects: Note[];
  setSubjects: (val: Note) => void;
}>((set) => ({
  search: '',
  setSerach: (val) => set({ search: val.toLowerCase() }),
  subjects: [],
  setSubjects: (val) =>
    set((state) => ({ subjects: [...state.subjects, val] })),
}));
