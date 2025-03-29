// External packages
import { create } from 'zustand';

// Models (types)
import { type Subject } from '@/models/subject';

// General state mnangment between components, mostly used to add, delete, or update subject or note on frontend.
export const useSubjectStore = create<{
  search: string;
  setSerach: (val: string) => void;

  // Subjects
  subjects: Subject[];
  setSubjects: (val: Subject[]) => void;
  addSubject: (val: Subject) => void;
  deleteSubject: (val: number) => void;
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
}));
