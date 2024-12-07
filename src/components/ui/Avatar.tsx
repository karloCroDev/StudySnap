// External packaegs
import { twMerge } from 'tailwind-merge';

export const Avatar: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    size?: 'sm' | 'md' | 'lg';
  }
> = ({ size = 'sm', children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'rounded-full bg-gray-400 text-center uppercase text-gray-100',
        size === 'sm' && 'w-8 text-sm leading-8',
        size === 'md' && 'w-12 text-md font-medium leading-12',
        size === 'lg' && 'leading-64 w-64 text-9xl font-bold',
        className
      )}
    >
      {children}
    </div>
  );
};
