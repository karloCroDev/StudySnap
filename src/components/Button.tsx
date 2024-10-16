'use client'; // fix: Remove this because, when I use button I use by default the use client in that component

// External pcakages
import {
  Button as AriaButton,
  ButtonProps as AriaProps,
} from 'react-aria-components';
import { twMerge, twJoin } from 'tailwind-merge';

// explanation: Shared styles and types between Button.tsx component and LinkAsButtton.tsx component

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
    'flex min-w-24 items-center justify-around outline-none',
    size === 'sm' ? 'px-4 py-2 text-md' : 'px-6 py-3 text-lg',
    rounded === 'md' && 'rounded',
    rounded === 'none' && 'rounded-none',
    rounded === 'full' && 'rounded-full',

    // Outline styles
    variant === 'outline' &&
      (colorScheme === 'light-blue'
        ? 'border border-blue-400 text-blue-400 hover:brightness-90'
        : colorScheme === 'dark-blue'
          ? 'border border-blue-700 text-blue-700 hover:brightness-90'
          : colorScheme === 'black' &&
            'border border-grayscale-900 text-grayscale-900 hover:brightness-90'),

    // Solid styles
    variant === 'solid' &&
      (colorScheme === 'light-blue'
        ? 'bg-blue-400 text-grayscale-100 transition-[filter] duration-200 hover:brightness-90'
        : colorScheme === 'dark-blue'
          ? 'bg-blue-700 text-grayscale-100 transition-[filter] duration-200 hover:brightness-90'
          : colorScheme === 'black'
            ? 'bg-grayscale-900 text-grayscale-100 transition-[filter] duration-200 hover:brightness-90'
            : colorScheme === 'white' &&
              'bg-grayscale-100 text-grayscale-900 transition-[filter] duration-200 hover:brightness-90')
  );

// Button.tsx component
export const Button: React.FC<
  React.ComponentPropsWithoutRef<'button'> & AriaProps & AdditionalButtonProps
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
