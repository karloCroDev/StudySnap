'use client';

// External packages
import * as AriaInput from 'react-aria-components';
import { twMerge, twJoin } from 'tailwind-merge';

export const Input: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    AriaInput.TextFieldProps & {
      label: string;
      size?: 'sm' | 'lg';
      isMdHorizontal?: boolean;
      inputProps?: React.ComponentPropsWithoutRef<'input'> &
        AriaInput.InputProps;
      fieldErrorProps?: AriaInput.FieldErrorProps;
    }
> = ({
  label,
  size = 'sm',
  isMdHorizontal = false,
  inputProps,
  fieldErrorProps,
  className,
  ...rest
}) => (
  <AriaInput.TextField
    {...rest}
    className={twMerge(
      'flex flex-col-reverse gap-y-2 text-base outline-none',
      className
    )}
  >
    <AriaInput.FieldError
      {...fieldErrorProps}
      className={twMerge(
        'text-2xs peer w-full text-red-700',
        isMdHorizontal && 'md:text-end',
        typeof fieldErrorProps?.className === 'string'
          ? fieldErrorProps.className
          : undefined
      )}
    />
    <div
      className={twJoin(
        'flex w-full flex-col-reverse gap-y-2',
        isMdHorizontal && 'md:flex-row-reverse md:items-center md:gap-x-6'
      )}
    >
      <AriaInput.Input
        {...inputProps}
        className={twMerge(
          'peer w-full border border-gray-400 bg-inherit outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 data-[invalid]:border-red-700',
          size === 'sm' && 'h-12 p-3',
          size === 'lg' && 'h-14 p-4',
          isMdHorizontal && 'md:max-w-72',
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
        <p>{label}</p>
      </AriaInput.Label>
    </div>
  </AriaInput.TextField>
);
