// External packages
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

export const Spinner: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    size?: 'sm' | 'md' | 'lg';
  }
> = ({ size = 'sm', className }) => (
  <FaSpinner
    className={twMerge(
      'animate-spin',
      size === 'sm' && 'size-4',
      size === 'md' && 'size-8',
      size === 'lg' && 'size-12',
      className
    )}
  />
);
