// External packages
import { Cross2Icon } from '@radix-ui/react-icons';
// note: Because of SEO, I am not declaring this as a button, because this closing tag will only be used inside of components that will already have close functunality button (I am duplicating button) inside of the components
import { twMerge } from 'tailwind-merge';

export const CloseButton: React.FC<
  React.ComponentPropsWithoutRef<typeof Cross2Icon> & {
    positionTopPadding?: 'sm' | 'md' | 'lg';
  }
> = ({ positionTopPadding = 'lg', className, ...rest }) => (
  <Cross2Icon
    {...rest}
    className={twMerge(
      'absolute h-5 w-5 cursor-pointer',
      positionTopPadding === 'sm' && 'right-2 top-2',
      positionTopPadding === 'md' && 'right-4 top-3',
      positionTopPadding === 'lg' && 'right-6 top-4',
      className
    )}
  />
);
