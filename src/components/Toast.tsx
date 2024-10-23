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
      iconLeft?: React.ReactNode;
      iconRight?: React.ReactNode;
      isSuccess?: boolean;
    }
> = ({
  isSuccess = true,
  iconLeft,
  iconRight,
  title,
  content,
  children,
  ...rest
}) => {
  const [openToast, setOpenToast] = React.useState(false);
  return (
    <RadixToast.Provider {...rest} swipeDirection="left" duration={4000}>
      {children}
      <button onClick={() => setOpenToast(true)}>Click me</button>
      <RadixToast.Root
        onOpenChange={setOpenToast}
        open={openToast}
        className={twJoin(
          isSuccess ? 'bg-blue-900' : 'bg-red-400',
          'group relative flex w-full cursor-grab gap-4 rounded-lg px-3 py-4 text-grayscale-100 md:min-w-80',
          'data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out data-[swipe=end]:animate-slide-out data-[swipe=cancel]:-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:-translate-x-1/4 data-[swipe=cancel]:transition-transform data-[swipe=move]:duration-100'
        )}
      >
        {iconLeft}
        <div>
          <RadixToast.Title className="text-md font-semibold">
            {title}
          </RadixToast.Title>
          <RadixToast.Description className="text-xs md:text-sm">
            {content}
          </RadixToast.Description>
        </div>
        <div className="ml-auto">{iconRight}</div>
        <RadixToast.Close onClick={() => setOpenToast(false)}>
          <CloseButton
            positionTopPadding="sm"
            className="pointer-events-none text-grayscale-300 opacity-0 transition-[opacity] duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
          />
        </RadixToast.Close>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-12 md:w-auto" />
    </RadixToast.Provider>
  );
};
