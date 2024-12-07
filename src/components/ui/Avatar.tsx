// External packaegs
import { twMerge } from 'tailwind-merge';

export const Avatar: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    size?: 'sm' | 'md' | 'lg' | 'xl';
  }
> = ({ size = 'sm', children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'flex items-center justify-center rounded-full bg-gray-400 text-center uppercase text-gray-100',
        size === 'sm' && 'size-8 text-sm',
        size === 'md' && 'size-12 text-md font-medium',
        size === 'lg' && 'size-36 text-2xl font-semibold',
        size === 'xl' && 'size-64 text-9xl font-bold',
        className
      )}
    >
      {typeof children === 'string'
        ? children
            .toString()
            .split(' ')
            .map((letter) => letter[0])
            .join('')
        : children}
    </div>
  );
};

// 'todo: check out to make image better'
