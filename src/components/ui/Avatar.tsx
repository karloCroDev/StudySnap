// External packaegs
import { twMerge } from 'tailwind-merge';
import * as RadixAvatar from '@radix-ui/react-avatar';

export const Avatar: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    RadixAvatar.AvatarProps & {
      size?: 'sm' | 'md' | 'lg' | 'xl';
      imageProps: RadixAvatar.AvatarImageProps;
    }
> = ({ imageProps, size = 'sm', children, className, ...rest }) => {
  return (
    <RadixAvatar.Root
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
      <RadixAvatar.Image
        {...imageProps}
        className="size-full rounded-full object-cover"
      />
      <RadixAvatar.Fallback>
        {typeof children === 'string' &&
          children
            .toString()
            .split(' ')
            .map((letter) => letter[0])
            .join('')}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

// 'todo: check out to make image better'
