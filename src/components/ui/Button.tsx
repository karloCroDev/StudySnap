// External pcakages
import {
  Button as AriaButton,
  ButtonProps as AriaProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

import {
  AdditionalButtonProps,
  getButtonClassNames,
} from '@/components/ui/LinkAsButton';

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
