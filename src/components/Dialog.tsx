// note: This is for standard dialogs, quizz dialog needs seperate one

'use client'; // fix: Remove this because, when I use button I use by default the use client in that component

// External packages
import * as RadixDialog from '@radix-ui/react-dialog';
import { IoIosClose } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

import { Button } from './Button';

export const Dialog: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    RadixDialog.DialogProps & {
      triggerProps?: RadixDialog.DialogTriggerProps;
      footer?: React.ReactNode;
    }
> = ({ triggerProps, children, title, footer, ...rest }) => (
  <RadixDialog.Root {...rest}>
    <RadixDialog.Trigger {...triggerProps} asChild>
      <Button>What the</Button>
    </RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed left-0 top-0 h-screen w-screen bg-grayscale-900 opacity-60" />
      <RadixDialog.Content className="data-[state=open]:animate-modal-open data-[state=closed]:animate-modal-closed w-modal-mobile-screen bg-grayscale-10 md:w-modal-width-screen bg-grayscale-10 min-w-desktop-dialog fixed left-1/2 top-1/2 z-max max-h-[80%] -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-2xl border border-blue-900 bg-grayscale-100 px-8 py-6 outline-none">
        <RadixDialog.Title className="text-lg font-semibold">
          {title}
        </RadixDialog.Title>
        <IoIosClose className="right absolute right-6 top-4 h-6 w-6" />
        {/* note: Remove this div, if this margin won)t look nice and replace with those in figma file */}
        <div className="mt-6">{children}</div>

        {footer && <div className="mt-32">{footer}</div>}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);
