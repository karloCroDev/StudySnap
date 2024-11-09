'use client'; // fix: Remove this because, when I use button I use by default the use client in that component

// Shared styles and types
import {
  getButtonClassNames,
  AdditionalButtonProps,
} from '@/components/ui/LinkAsButton';

// External pcakages
import {
  Button as AriaButton,
  ButtonProps as AriaProps,
} from 'react-aria-components';
import { twMerge, twJoin } from 'tailwind-merge';

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