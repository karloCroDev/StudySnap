// Extenral packages
import Link, { LinkProps as LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

// Shared styles and types
import {
  getButtonClassNames,
  AdditionalButtonProps,
} from '@/components/global/Button';

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
