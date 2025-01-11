// External packages
import { create } from 'zustand';
import { Editor as EditorType } from '@tiptap/react';

export const useGeneralInfo = create<{
  editor: EditorType | null;
  setEditor: (val: EditorType) => void;
}>((set) => ({
  editor: null,
  setEditor: (val) => set({ editor: val }),
}));
