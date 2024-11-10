'use client';

// External packages
import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { twJoin } from 'tailwind-merge';
import { useShallow } from 'zustand/shallow';
import {
  CheckCircledIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  Cross2Icon,
} from '@radix-ui/react-icons';

// Store
import { useToastStore } from '@/store/useToastStore';

export const Toast = () => {
  // todo: This is not the best practice to get states like this with => state
  const { isOpen, setIsOpen, title, content, variant } = useToastStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      title: state.title,
      content: state.content,
      variant: state.variant,
    }))
  );

  return (
    <RadixToast.Provider swipeDirection="left" duration={3000}>
      <RadixToast.Root
        onOpenChange={setIsOpen}
        open={isOpen}
        className={twJoin(
          variant === 'success' && 'bg-blue-900',
          variant === 'information' && 'bg-blue-400',
          variant === 'error' && 'bg-red-400',
          'group relative flex w-full items-center justify-between rounded-lg px-4 py-5 text-gray-100',
          'data-[swipe=cancel]:-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:-translate-x-[15%] data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in data-[swipe=end]:animate-slide-out data-[swipe=cancel]:transition-transform data-[swipe=move]:duration-100'
        )}
      >
        <div className="flex-1">
          <RadixToast.Title className="text-lg font-semibold md:text-xl">
            {title}
          </RadixToast.Title>
          <RadixToast.Description className="text text-sm text-gray-200">
            {content}
          </RadixToast.Description>
        </div>
        {variant === 'information' && <ClockIcon className="h-12 w-12" />}
        {variant === 'error' && (
          <ExclamationTriangleIcon className="h-12 w-12" />
        )}
        {variant === 'success' && <CheckCircledIcon className="h-12 w-12" />}
        <RadixToast.Close asChild>
          <Cross2Icon className="w absolute right-2 top-2 h-5 w-5 cursor-pointer text-gray-100 opacity-0 transition-[opacity] duration-300 group-hover:pointer-events-auto md:pointer-events-none md:group-hover:opacity-100" />
        </RadixToast.Close>
      </RadixToast.Root>
      {/* todo: Decide padding on mobile */}
      <RadixToast.Viewport className="fixed inset-x-6 bottom-6 md:inset-auto md:bottom-12 md:left-24 md:w-96" />
    </RadixToast.Provider>
  );
};
