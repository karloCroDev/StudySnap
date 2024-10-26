// External packages
import * as RadixDialog from '@radix-ui/react-dialog'; // Importing as everything because of readabilty

// Components
import { CloseButton } from '@/components/global/CloseButton';

export const Dialog: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    RadixDialog.DialogProps & {
      triggerProps?: RadixDialog.DialogTriggerProps; // note: I put this optional because in future instance of code I could get dialog after dialog so this is a quick fix
      footer?: React.ReactNode;
    }
> = ({ triggerProps, children, title, footer, ...rest }) => (
  <RadixDialog.Root {...rest}>
    <RadixDialog.Trigger {...triggerProps} asChild>
      {triggerProps?.children}
    </RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed left-0 top-0 h-screen w-screen bg-grayscale-900 opacity-60 data-[state=closed]:animate-overlay-closed data-[state=open]:animate-overlay-open" />
      <RadixDialog.Content className="fixed left-1/2 top-1/2 flex w-5/6 -translate-x-1/2 -translate-y-1/2 flex-col gap-y-8 overflow-y-scroll rounded-2xl bg-grayscale-100 px-8 py-6 outline-none data-[state=closed]:animate-content-closed data-[state=open]:animate-content-open md:w-desktop-dialog">
        <RadixDialog.Title className="text-lg font-semibold">
          {title}
        </RadixDialog.Title>
        {children}
        {footer}
        <RadixDialog.DialogClose asChild>
          <CloseButton />
        </RadixDialog.DialogClose>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);
