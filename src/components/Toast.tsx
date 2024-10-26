'use client';

// External packages
import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { twJoin } from 'tailwind-merge';

// Components
import { CloseButton } from '@/components/CloseButton';

// Store
import { toastStore } from '@/store/useToastStore';

export const Toast = () => {
  // todo: This is not the best practice to get states like this with => state
  const { isOpen, setIsOpen, title, content, type, iconRight } = toastStore(
    (state) => state
  );

  return (
    <RadixToast.Provider swipeDirection="left" duration={4000}>
      <RadixToast.Root
        onOpenChange={setIsOpen}
        open={isOpen}
        className={twJoin(
          type === 'success' && 'bg-blue-900',
          type === 'pending' && 'bg-blue-400',
          type === 'error' && 'bg-red-400',
          'group relative flex justify-between rounded-lg px-3 py-4 text-grayscale-100 md:min-w-80',
          'data-[swipe=cancel]:-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:-translate-x-[15%] data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in data-[swipe=end]:animate-slide-out data-[swipe=cancel]:transition-transform data-[swipe=move]:duration-100'
        )}
      >
        <div>
          <RadixToast.Title className="text-md font-semibold">
            {title}
          </RadixToast.Title>
          <RadixToast.Description className="mt-2 text-xs text-grayscale-200 md:text-sm">
            {content}
          </RadixToast.Description>
        </div>
        {iconRight}
        <RadixToast.Close>
          <CloseButton
            positionTopPadding="sm"
            className="text-grayscale-200 transition-[opacity] duration-300 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100"
          />
        </RadixToast.Close>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-12 z-max md:w-auto" />
    </RadixToast.Provider>
  );
};
