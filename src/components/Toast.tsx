'use client';

// External packages
import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { twJoin } from 'tailwind-merge';
import { useShallow } from 'zustand/shallow';
import { MdAccessTime, MdErrorOutline } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

// Components
import { CloseButton } from '@/components/CloseButton';

// Store
import { useToastStore } from '@/store/useToastStore';

export const Toast = () => {
  // todo: This is not the best practice to get states like this with => state
  const { isOpen, setIsOpen, title, content, type, iconRight } = useToastStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      title: state.title,
      content: state.content,
      type: state.type,
      iconRight: state.iconRight,
    }))
  );

  const sharedIconStyles = React.useMemo(() => 'w-12 h-12', []);
  return (
    <RadixToast.Provider swipeDirection="left" duration={4000}>
      <RadixToast.Root
        onOpenChange={setIsOpen}
        open={isOpen}
        className={twJoin(
          type === 'success' && 'bg-blue-900',
          type === 'information' && 'bg-blue-400',
          type === 'error' && 'bg-red-400',
          'group relative flex w-full items-center justify-between rounded-lg px-4 py-6 text-grayscale-100',
          'data-[swipe=cancel]:-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:-translate-x-[15%] data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in data-[swipe=end]:animate-slide-out data-[swipe=cancel]:transition-transform data-[swipe=move]:duration-100'
        )}
      >
        <div className="flex-1">
          <RadixToast.Title className="text-lg font-semibold md:text-xl">
            {title}
          </RadixToast.Title>
          <RadixToast.Description className="text text-sm text-grayscale-200">
            {content}
          </RadixToast.Description>
        </div>
        {type === 'success' && <MdAccessTime className={sharedIconStyles} />}
        {type === 'error' && <MdErrorOutline className={sharedIconStyles} />}
        {type === 'information' && (
          <IoIosCheckmarkCircleOutline className={sharedIconStyles} />
        )}
        <RadixToast.Close asChild>
          <CloseButton
            positionTopPadding="sm"
            className="text-grayscale-200 transition-[opacity] duration-300 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100"
          />
        </RadixToast.Close>
      </RadixToast.Root>
      {/* todo: Decide padding on mobile */}
      <RadixToast.Viewport className="fixed inset-x-6 bottom-6 md:inset-auto md:bottom-12 md:left-24 md:w-96" />
    </RadixToast.Provider>
  );
};
