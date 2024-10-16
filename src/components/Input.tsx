'use client'; // fix: Remove this because, when I use button I use by default the use client in that component

// External packages
import {
  TextField,
  TextFieldProps,
  Input as AriaInput,
  InputProps,
  Label,
  FieldError,
  FieldErrorProps,
} from 'react-aria-components';
import { twMerge, twJoin } from 'tailwind-merge';

export const Input: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    TextFieldProps & {
      label: string;
      size?: 'sm' | 'lg';
      isVertical?: boolean;
      inputProps?: React.ComponentPropsWithoutRef<'input'> & InputProps;
      fieldErrorProps?: FieldErrorProps;
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
  <TextField
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
    <FieldError
      {...fieldErrorProps}
      className={twMerge(
        'text-2xs peer w-full text-red-700',
        typeof fieldErrorProps?.className === 'string'
          ? fieldErrorProps.className
          : undefined
      )}
    />
    <AriaInput
      {...inputProps}
      className={twMerge(
        'border-grayscale-400 placeholder:text-grayscale-400 peer- peer h-14 w-full border outline-none transition-colors focus:border-blue-400 data-[invalid]:border-red-700',
        size === 'sm' && 'p-3',
        size === 'lg' && 'p-2',
        inputProps?.className
      )}
    />
    <Label
      className={twJoin(
        'transition-colors peer-focus:text-blue-400 peer-data-[invalid]:text-red-700',
        size === 'sm' && 'text-md',
        size === 'lg' && 'text-lg font-semibold'
      )}
    >
      {label}
    </Label>
  </TextField>
);
