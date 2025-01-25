// External packages
import { create } from 'zustand';

// Models (types)
import { Subject } from '@/models/subject';
import { Note } from '@/models/note';

export const useGeneralInfo = create<{
  search: string;
  setSerach: (val: string) => void;
  subjects: Subject[];
  setSubjects: (
    val: Subject | Subject[] | ((prev: Subject[]) => Subject[])
  ) => void;
}>((set) => ({
  search: '',
  setSerach: (val) => set({ search: val.toLowerCase() }),
  subjects: [],
  setSubjects: (val) =>
    set((state) => ({
      subjects:
        typeof val === 'function' // This is used to update the state of the subjects, but without calling the subject again --> reducing the code by avoiding to call the subject and using useShallow
          ? val(state.subjects)
          : Array.isArray(val)
            ? val
            : [...state.subjects, val],
    })),
}));
