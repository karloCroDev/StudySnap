'use client';

// External packages
import * as React from 'react';
import * as AriaInput from 'react-aria-components';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { twMerge, twJoin } from 'tailwind-merge';

export const Input: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    AriaInput.TextFieldProps & {
      label: string;
      size?: 'sm' | 'lg';
      isMdHorizontal?: boolean;
      isPassword?: boolean;
      inputProps?: React.ComponentPropsWithoutRef<'input'> &
        AriaInput.InputProps;
      fieldErrorProps?: AriaInput.FieldErrorProps;
    }
> = ({
  label,
  size = 'sm',
  isMdHorizontal = false,
  isPassword = false,
  inputProps,
  fieldErrorProps,
  className,
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <AriaInput.TextField
      {...rest}
      type={isPassword ? (showPassword ? 'password' : 'text') : rest.type}
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
        <div className="relative">
          <AriaInput.Input
            {...inputProps}
            className={twMerge(
              'peer w-full border border-gray-400 bg-inherit outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 data-[invalid]:border-red-700',
              size === 'sm' && 'h-12 p-3',
              size === 'lg' && 'h-14 p-4',
              isMdHorizontal && 'w-72',
              inputProps?.className
            )}
          />
          {isPassword && (
            <AriaInput.Button className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-blue-400 outline-none transition-transform active:scale-75">
              {showPassword ? (
                <EyeOpenIcon
                  className="size-5"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeNoneIcon
                  className="size-5"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </AriaInput.Button>
          )}
        </div>

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
};
