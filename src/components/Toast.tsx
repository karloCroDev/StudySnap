'use client';

// External packages
import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { twMerge, twJoin } from 'tailwind-merge';

// Components
import { CloseButton } from '@/components/CloseButton';

export const Toast: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    RadixToast.ToastProps & {
      iconRight?: React.ReactNode;
      isSuccess?: boolean;
    }
> = ({ isSuccess = true, iconRight, title, content, children, ...rest }) => {
  const [openToast, setOpenToast] = React.useState(false);
  return (
    <RadixToast.Provider {...rest} swipeDirection="left" duration={4000}>
      {children}
      <RadixToast.Root
        onOpenChange={setOpenToast}
        open={openToast}
        className={twJoin(
          isSuccess ? 'bg-blue-900' : 'bg-red-400',
          'group relative flex justify-between rounded-lg px-3 py-4 text-grayscale-100 md:min-w-80',
          'data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out data-[swipe=end]:animate-slide-out data-[swipe=cancel]:-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:-translate-x-[15%] data-[swipe=cancel]:transition-transform data-[swipe=move]:duration-100'
        )}
      >
        <div>
          <RadixToast.Title className="text-md font-semibold">
            {title}
          </RadixToast.Title>
          <RadixToast.Description className="mt-2 text-xs text-grayscale-300 md:text-sm">
            {content}
          </RadixToast.Description>
        </div>
        {iconRight}
        <RadixToast.Close onClick={() => setOpenToast(false)}>
          <CloseButton
            positionTopPadding="sm"
            className="text-grayscale-300 transition-[opacity] duration-300 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100"
          />
        </RadixToast.Close>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-12 z-max md:w-auto" />
    </RadixToast.Provider>
  );
};
