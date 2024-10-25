// External packages
import { create } from 'zustand';

export const toastStore = create<{
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  setTitle: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
  iconRight: React.ReactNode;
  setIconRight: (val: React.ReactNode) => void;
  type: 'success' | 'error' | 'pending';
  setType: (val: 'success' | 'error' | 'pending') => void;
}>((set) => ({
  isOpen: false,
  setIsOpen: (val) => set({ isOpen: val }),
  title: '',
  setTitle: (val) => set({ title: val }),
  content: '',
  setContent: (val) => set({ content: val }),
  iconRight: '',
  setIconRight: (val) => set({ iconRight: val }),
  type: 'success',
  setType: (val) => set({ type: val }),
}));

// note: I can't use radix props, because I want to create toast component in the root of an application (like how other lbaries implmented). Props were meant for creating a toast in certain component, since a lot of components will use toast component this approach with global state managment in my opinion seems
