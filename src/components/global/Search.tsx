'use client';
// External packages
import * as React from 'react';
import * as AriaInput from 'react-aria-components'; // note: more readable
import { twMerge } from 'tailwind-merge';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const Search: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    AriaInput.TextFieldProps & {
      label: string;
      inputProps?: React.ComponentPropsWithoutRef<'input'> &
        AriaInput.InputProps;
    }
> = ({ label, inputProps, className }) => {
  const labelRef = React.useRef(null);

  return (
    <AriaInput.TextField
      className={twMerge(
        'text-base text-grayscale-100 outline-none',
        className
      )}
    >
      <div className="flex w-fit items-center rounded bg-blue-900 px-3">
        <MagnifyingGlassIcon className="size-6" />
        <div className="relative">
          <AriaInput.Label
            ref={labelRef}
            className="peer absolute left-3 top-1/2 origin-left -translate-y-1/2 transition-transform data-[label-floating=true]:-translate-y-[22px] data-[label-floating=true]:scale-75"
          >
            {label}
          </AriaInput.Label>

          <AriaInput.Input
            {...inputProps}
            className={twMerge(
              'h-14 w-full rounded border-grayscale-200 bg-blue-900 px-3 outline-none peer-data-[label-floating=true]:pt-3',
              inputProps?.className
            )}
            onChange={(event) => {
              const value = event.target.value;
              const labelElement = labelRef.current as HTMLLabelElement | null;
              if (labelElement !== null) {
                if (value === '') {
                  labelElement.setAttribute('data-label-floating', 'false');
                } else {
                  labelElement.setAttribute('data-label-floating', 'true');
                }
              }
            }}
          />
        </div>
      </div>
    </AriaInput.TextField>
  );
};
