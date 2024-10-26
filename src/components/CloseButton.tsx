// External packages
import { IoIosClose } from 'react-icons/io';
// note: Because of SEO, I am not declaring this as a button, because this closing tag will only be used inside of components that will already have close functunality button (I am duplicating button) inside of the components
import { twMerge } from 'tailwind-merge';

export const CloseButton: React.FC<
  React.ComponentPropsWithoutRef<'svg'> & {
    positionTopPadding?: 'sm' | 'md' | 'lg';
  }
> = ({ positionTopPadding = 'lg', className, ...rest }) => (
  <IoIosClose
    {...rest}
    className={twMerge(
      'absolute h-8 w-8 cursor-pointer',
      positionTopPadding === 'sm' && 'right-1.5 top-1.5',
      positionTopPadding === 'md' && 'right-4 top-3',
      positionTopPadding === 'lg' && 'right-6 top-4',
      className
    )}
  />
);
