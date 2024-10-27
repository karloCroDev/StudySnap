'use client'; // fix: Remove this because, when I use button I use by default the use client in that component

// External packages
import * as AriaInput from 'react-aria-components'; // note: same reason as Radix library
import { twMerge, twJoin } from 'tailwind-merge';

export const Input: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    AriaInput.TextFieldProps & {
      label: string;
      size?: 'sm' | 'lg';
      isVertical?: boolean;
      inputProps?: React.ComponentPropsWithoutRef<'input'> &
        AriaInput.InputProps;
      fieldErrorProps?: AriaInput.FieldErrorProps;
    }
> = ({
  label,
  size = 'sm',
  isVertical = true,
  inputProps,
  fieldErrorProps,
  className,
  ...rest
}) => (
  <AriaInput.TextField
    {...rest}
    className={twMerge(
      'col-r flex w-full text-base outline-none',
      isVertical
        ? 'flex-col-reverse gap-y-2'
        : 'flex-row-reverse items-center gap-x-6',
      className
    )}
  >
    {/* note: Order is flipped because of peer attribute*/}
    <AriaInput.FieldError
      {...fieldErrorProps}
      className={twMerge(
        'text-2xs peer w-full text-red-700',
        typeof fieldErrorProps?.className === 'string'
          ? fieldErrorProps.className
          : undefined
      )}
    />
    <AriaInput.Input
      {...inputProps}
      className={twMerge(
        'peer w-full border border-grayscale-400 outline-none transition-colors placeholder:text-grayscale-400 focus:border-blue-400 data-[invalid]:border-red-700',
        size === 'sm' && 'h-12 p-3',
        size === 'lg' && 'h-14 p-4',
        inputProps?.className
      )}
    />
    <AriaInput.Label
      className={twJoin(
        'transition-colors peer-focus:text-blue-400 peer-data-[invalid]:text-red-700',
        size === 'sm' && 'text-md',
        size === 'lg' && 'text-lg font-semibold'
      )}
    >
      {label}
    </AriaInput.Label>
  </AriaInput.TextField>
);
