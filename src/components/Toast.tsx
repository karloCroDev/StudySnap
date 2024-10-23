'use client';

// External packages
import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { twMerge } from 'tailwind-merge';
// Components
import { CloseButton } from '@/components/CloseButton';

export const Toast: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    RadixToast.ToastProps & {
      descriptionProps?: RadixToast.ToastDescriptionProps;
    }
> = ({ descriptionProps, title, ...rest }) => {
  return (
    <RadixToast.Provider {...rest} swipeDirection="left">
      <RadixToast.Root className="bg-grayscale-10 z-max border border-blue-900 px-6 py-4 md:w-1/6">
        <RadixToast.Title>{title}</RadixToast.Title>
        <RadixToast.Description {...descriptionProps} />
        {/* <RadixToast.Action /> */}
        <RadixToast.Close>
          <CloseButton />
        </RadixToast.Close>
      </RadixToast.Root>

      <RadixToast.Viewport className="fixed bottom-0 left-0 px-6 py-4" />
    </RadixToast.Provider>
  );
};
