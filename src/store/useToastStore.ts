// External packages
import { create } from 'zustand';

interface ToastStoreProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  content: string;
  variant: 'success' | 'error' | 'information';
}

// Created our custom Toast library using Radix toast. Toast component is being called in the root of the application (like other libraries implemented it), and to call it I need to set up state managment

export const useToastStore = create<
  ToastStoreProps & {
    setToast: ({
      title,
      content,
      variant,
    }: {
      title: ToastStoreProps['title'];
      content: ToastStoreProps['content'];
      variant?: ToastStoreProps['variant'];
    }) => void;
  }
>((set) => ({
  isOpen: false,
  title: '',
  content: '',
  iconRight: '',
  variant: 'success',
  setIsOpen: (val) => set({ isOpen: val }),
  setToast: ({ title, content, variant = 'success' }) =>
    set({
      isOpen: true,
      title,
      content,
      variant,
    }),
}));
