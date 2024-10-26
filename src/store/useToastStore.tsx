// External packages
import { create } from 'zustand';

interface ToastStoreProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  content: string;
  variant: 'success' | 'error' | 'information';
}

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

// note: I can't use radix props, because I want to create toast component in the root of an application (like how other lbaries implmented). Props were meant for creating a toast in certain component, since a lot of components will use toast component this approach with global state managment in my opinion seems
