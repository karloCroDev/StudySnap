// Extenral packages
import Link, { LinkProps as LinkProps } from 'next/link';
import { twMerge, twJoin } from 'tailwind-merge';

// Explanation: Shared styles and types between Button.tsx component and LinkAsButtton.tsx component

export interface AdditionalButtonProps {
  variant?: 'solid' | 'outline';
  colorScheme?: 'light-blue' | 'dark-blue' | 'white' | 'black';
  size?: 'sm' | 'lg';
  rounded?: 'none' | 'md' | 'full';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const getButtonClassNames = ({
  size,
  colorScheme,
  variant,
  rounded,
}: {
  size: AdditionalButtonProps['size'];
  colorScheme: AdditionalButtonProps['colorScheme'];
  variant: AdditionalButtonProps['variant'];
  rounded: AdditionalButtonProps['rounded'];
}): string =>
  twJoin(
    'flex items-center justify-center gap-4 outline-none min-w-24', // note: vidi za justify center
    size === 'sm' && 'px-4 h-10 text-md',
    size === 'lg' && 'px-6  h-16 text-lg',
    rounded === 'md' && 'rounded',
    rounded === 'none' && 'rounded-none',
    rounded === 'full' && 'rounded-full',

    // Outline styles
    variant === 'outline' &&
      (colorScheme === 'light-blue'
        ? 'border border-blue-400 text-blue-400 hover:brightness-90'
        : colorScheme === 'dark-blue'
          ? 'border border-blue-900 text-blue-900 hover:brightness-90'
          : (colorScheme === 'black' || colorScheme === 'white') &&
            'border border-gray-900 text-gray-900 hover:brightness-90'),

    // Solid styles
    variant === 'solid' &&
      (colorScheme === 'light-blue'
        ? 'bg-blue-400 text-gray-100 transition-[filter] duration-200 hover:brightness-90'
        : colorScheme === 'dark-blue'
          ? 'bg-blue-900 text-gray-100 transition-[filter] duration-200 hover:brightness-90'
          : colorScheme === 'black'
            ? 'bg-gray-900 text-gray-100 transition-[filter] duration-200 hover:brightness-90'
            : colorScheme === 'white' &&
              'bg-gray-100 text-gray-900 transition-[filter] duration-200 hover:brightness-90')
  );

export const LinkAsButton: React.FC<
  React.ComponentPropsWithoutRef<'a'> & LinkProps & AdditionalButtonProps
> = ({
  colorScheme = 'dark-blue',
  variant = 'solid',
  size = 'sm',
  rounded = 'md',
  iconLeft,
  iconRight,
  children,
  className,
  ...rest
}) => (
  <Link
    {...rest}
    className={twMerge(
      getButtonClassNames({ colorScheme, rounded, size, variant }),
      className
    )}
  >
    {iconLeft}
    {children}
    {iconRight}
  </Link>
);
