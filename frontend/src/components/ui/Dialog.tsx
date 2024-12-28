'use client';

// External packages
import * as RadixDialog from '@radix-ui/react-dialog'; // Importing as everything because of readabilty
import { Cross2Icon } from '@radix-ui/react-icons';

export const Dialog: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    RadixDialog.DialogProps & {
      triggerProps?: RadixDialog.DialogTriggerProps; // note: I put this optional because in future instance of code I could get dialog after dialog so this is a quick fix
      footer?: React.ReactNode;
    }
> = ({ triggerProps, children, title, footer, ...rest }) => (
  <RadixDialog.Root {...rest}>
    <RadixDialog.Trigger {...triggerProps}>
      {triggerProps!.children}
    </RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed left-0 top-0 z-max h-screen w-screen bg-gray-900 opacity-60 data-[state=closed]:animate-overlay-closed data-[state=open]:animate-overlay-open" />
      <RadixDialog.Content className="fixed left-1/2 top-1/2 z-max flex max-h-[75%] w-5/6 -translate-x-1/2 -translate-y-1/2 flex-col gap-y-6 overflow-scroll rounded-2xl bg-gray-100 px-8 py-6 outline-none data-[state=closed]:animate-content-closed data-[state=open]:animate-content-open md:w-desktop-dialog">
        <div>
          <RadixDialog.Title className="text-lg font-semibold">
            {title}
          </RadixDialog.Title>
          <hr className="mt-2 h-px w-full border-0 bg-gray-900" />
        </div>
        {children}
        {footer}
        <RadixDialog.DialogClose asChild>
          <Cross2Icon className="absolute right-6 top-4 h-6 w-6 cursor-pointer" />
        </RadixDialog.DialogClose>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);
