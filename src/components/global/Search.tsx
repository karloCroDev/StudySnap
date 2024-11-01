'use client';
// External packages
import * as React from 'react';
import * as AriaInput from 'react-aria-components'; // note: more readable
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';

export const Search: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    AriaInput.TextFieldProps & {
      placeholderLabel: string; // Custom placehloder that converts to label when user starts typing
      inputProps?: React.ComponentPropsWithoutRef<'input'> &
        AriaInput.InputProps;
    }
> = ({ placeholderLabel, inputProps, className }) => {
  const placeholderLabelRef = React.useRef(null);

  return (
    <AriaInput.TextField
      className={twMerge(
        'text-base text-grayscale-100 outline-none',
        className
      )}
    >
      <div className="flex w-fit items-center rounded bg-blue-900 px-3">
        <label htmlFor="searchId">
          <MagnifyingGlassIcon className="size-6 cursor-pointer" />
        </label>
        <div className="relative">
          <AriaInput.Label
            ref={placeholderLabelRef}
            className="peer absolute left-3 top-1/2 origin-left -translate-y-1/2 transition-transform data-[label-floating=true]:-translate-y-[22px] data-[label-floating=true]:scale-75"
          >
            {placeholderLabel}
          </AriaInput.Label>

          <AriaInput.Input
            {...inputProps}
            id="searchId"
            className={twMerge(
              'h-14 w-full rounded border-grayscale-200 bg-blue-900 px-3 outline-none peer-data-[label-floating=true]:pt-3',
              inputProps?.className
            )}
            onChange={(event) => {
              const value = event.target.value;
              const placeholderLabelElement =
                placeholderLabelRef.current as HTMLLabelElement | null;
              if (placeholderLabelElement !== null) {
                if (value === '') {
                  placeholderLabelElement.setAttribute(
                    'data-label-floating',
                    'false'
                  );
                } else {
                  placeholderLabelElement.setAttribute(
                    'data-label-floating',
                    'true'
                  );
                }
              }
            }}
          />
        </div>
      </div>
    </AriaInput.TextField>
  );
};
