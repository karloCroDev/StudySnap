// External packages
import { create } from 'zustand';

// Models (types)
import { type Note } from '@/models/note';

// General state mnangment between components, mostly used to add, delete, or update subject or note on frontend.
export const useDiscoverStore = create<{
  notes: Note[];
  setNotes: (val: Note[]) => void;
  addFetchedNotes: (val: Note[]) => void;
}>((set) => ({
  notes: [],
  setNotes: (val) => set({ notes: val }),
  addFetchedNotes: (val) =>
    set((state) => ({ notes: [...state.notes, ...val] })),
}));
