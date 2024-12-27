'use client';

// External packages
import * as React from 'react';
import {
  Input as AriaInput,
  InputProps as AriaInputProps,
  TextField,
  TextFieldProps,
  Label,
} from 'react-aria-components';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';

export const Search: React.FC<
  React.ComponentPropsWithRef<'div'> &
    TextFieldProps & {
      placeholderLabel: string;
      inputProps?: React.ComponentProps<'input'> & AriaInputProps;
    }
> = ({ placeholderLabel, inputProps, className, ...rest }) => {
  const placeholderLabelRef = React.useRef<HTMLParagraphElement | null>(null);

  return (
    <TextField
      {...rest}
      className={twMerge('text-base text-gray-100 outline-none', className)}
    >
      <div className="flex w-fit items-center rounded bg-blue-900 px-3">
        <Label>
          <MagnifyingGlassIcon className="size-6" />
        </Label>
        <div className="relative">
          <p
            ref={placeholderLabelRef}
            className="peer pointer-events-none absolute left-3 top-1/2 origin-left -translate-y-1/2 transition-transform data-[label-floating]:-translate-y-[22px] data-[label-floating]:scale-75"
          >
            {placeholderLabel}
          </p>

          <AriaInput
            {...inputProps}
            id="searchId"
            className={twMerge(
              'h-14 w-full rounded border-gray-200 bg-blue-900 px-3 outline-none peer-data-[label-floating]:pt-3',
              inputProps?.className
            )}
            onChange={(event) => {
              const value = event.target.value;
              const placeholderLabelElement = placeholderLabelRef.current;

              if (placeholderLabelElement) {
                placeholderLabelElement.toggleAttribute(
                  'data-label-floating',
                  value !== ''
                );
              }
            }}
          />
        </div>
      </div>
    </TextField>
  );
};
