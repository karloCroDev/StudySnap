// External packages
import { create } from 'zustand';

// Models (types)
import { Subject } from '@/models/subject';
import { Note } from '@/models/note';

export const useGeneralInfo = create<{
  search: string;
  setSerach: (val: string) => void;

  // Subjects
  subjects: Subject[];
  setSubjects: (val: Subject[]) => void;
  addSubject: (val: Subject) => void;
  deleteSubject: (val: string) => void;

  // Notes
  notes: Note[];
  setNotes: (val: Note[]) => void;
  addNote: (val: Note) => void;
  deleteNote: (val: string) => void;
}>((set) => ({
  search: '',
  setSerach: (val) => set({ search: val.toLowerCase() }),
  subjects: [],
  setSubjects: (val) => set({ subjects: val }),
  addSubject: (val) => set((state) => ({ subjects: [...state.subjects, val] })),
  deleteSubject: (val) => {
    set((state) => ({
      subjects: state.subjects.filter((subject) => subject.id !== val),
    }));
  },
  notes: [],
  setNotes: (val) => set({ notes: val }),
  addNote: (val) => set((state) => ({ notes: [...state.notes, val] })),
  deleteNote: (val) =>
    set((state) => ({ notes: state.notes.filter((note) => note.id !== val) })),
}));
