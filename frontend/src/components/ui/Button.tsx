'use client';

// External pcakages
import {
  Button as AriaButton,
  ButtonProps as AriaProps,
} from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';

// Explanation: Shared styles and types between LinkAsButton.tsx component and Button.tsx component

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
    'flex items-center justify-center gap-4 min-w-24 outline-none hover:brightness-90 transition-[filter] duration-200 ', // note: vidi za justify center
    size === 'sm' && 'px-4 h-10 text-md',
    size === 'lg' && 'px-6  h-16 text-lg',
    rounded === 'md' && 'rounded',
    rounded === 'none' && 'rounded-none',
    rounded === 'full' && 'rounded-full',
    variant === 'outline' && 'bg-gray-100 border',

    // Outline styles

    variant === 'outline' &&
      (colorScheme === 'light-blue'
        ? 'border-blue-400 text-blue-400'
        : colorScheme === 'dark-blue'
          ? 'border-blue-900 text-blue-900 '
          : (colorScheme === 'black' || colorScheme === 'white') &&
            'border-gray-900 text-gray-900 '),

    // Solid styles
    variant === 'solid' &&
      (colorScheme === 'light-blue'
        ? 'bg-blue-400 text-gray-100 '
        : colorScheme === 'dark-blue'
          ? 'bg-blue-900 text-gray-100 '
          : colorScheme === 'black'
            ? 'bg-gray-900 text-gray-100 '
            : colorScheme === 'white' && 'bg-gray-100 text-gray-900 ')
  );

// Button.tsx component
export const Button: React.FC<
  React.ComponentPropsWithRef<'button'> & AriaProps & AdditionalButtonProps
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
  <AriaButton
    {...rest}
    className={twMerge(
      getButtonClassNames({ size, colorScheme, rounded, variant }),
      className
    )}
  >
    {iconLeft}
    {children}
    {iconRight}
  </AriaButton>
);
