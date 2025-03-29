// External packages
import { create } from 'zustand';

// Models (types)
import { type Note } from '@/models/note';

// General state mnangment between components, mostly used to add, delete, or update subject or note on frontend.
export const useNoteStore = create<{
  // Notes
  notes: Note[];
  setNotes: (val: Note[]) => void;
  addNote: (val: Note) => void;
  deleteNote: (val: number) => void;
}>((set) => ({
  subjects: [],
  notes: [],
  setNotes: (val) => set({ notes: val }),
  addNote: (val) => set((state) => ({ notes: [...state.notes, val] })),
  deleteNote: (val) =>
    set((state) => ({ notes: state.notes.filter((note) => note.id !== val) })),
}));
