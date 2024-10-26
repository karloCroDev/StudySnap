// External packages
import { create } from 'zustand';

interface ToastStoreProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  content: string;
  iconRight: React.ReactNode | null;
  type: 'success' | 'error' | 'information';
}

export const useToastStore = create<
  ToastStoreProps & {
    setToast: ({
      title,
      content,
      iconRight,
      type,
    }: {
      title: ToastStoreProps['title'];
      content: ToastStoreProps['content'];
      iconRight?: ToastStoreProps['iconRight'];
      type?: ToastStoreProps['type'];
    }) => void;
  }
>((set) => ({
  isOpen: false,
  title: '',
  content: '',
  iconRight: '',
  type: 'success',
  setIsOpen: (val) => set({ isOpen: val }),
  setToast: ({ title, content, iconRight, type = 'success' }) =>
    set({
      isOpen: true,
      title,
      content,
      iconRight,
      type,
    }),
}));

// note: I can't use radix props, because I want to create toast component in the root of an application (like how other lbaries implmented). Props were meant for creating a toast in certain component, since a lot of components will use toast component this approach with global state managment in my opinion seems
