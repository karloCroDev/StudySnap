'use client';

// External packages
import * as React from 'react';
import { twJoin } from 'tailwind-merge';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Button as AriaButton } from 'react-aria-components';
// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Search } from '@/components/ui/Search';
import { Button } from '@/components/ui/Button';

export default function Discover() {
  const infoHeader = React.useRef<HTMLDivElement | null>(null);

  return (
    <LayoutRow className="group justify-center">
      {/* Seperate component */}
      <LayoutColumn xs={12} lg={10}>
        <div ref={infoHeader} className="group flex justify-between">
          <h1
            className={twJoin(
              'pointer-events-auto w-full text-2xl font-bold !italic underline decoration-2 underline-offset-12 opacity-100 group-data-[search-visible]:pointer-events-none group-data-[search-visible]:absolute group-data-[search-visible]:opacity-0 md:text-4xl 2xl:text-5xl',
              plus_jakarta_sans.className
            )}
          >
            Discover section
          </h1>

          <Search
            placeholderLabel="Search"
            className="absolute opacity-0 group-data-[search-visible]:pointer-events-auto group-data-[search-visible]:relative group-data-[search-visible]:opacity-100 sm:pointer-events-auto sm:relative sm:opacity-100"
          />
          <AriaButton
            className="rounded-full bg-blue-400 p-3 text-center text-gray-100 outline-none group-data-[search-visible]:bg-red-400 sm:hidden"
            onPress={() => {
              const searchElement = infoHeader.current;

              if (searchElement)
                searchElement.toggleAttribute('data-search-visible');
            }}
          >
            <MagnifyingGlassIcon className="h-8 w-8 group-data-[search-visible]:hidden" />
            <Cross2Icon className="hidden h-8 w-8 group-data-[search-visible]:block" />
          </AriaButton>
        </div>
      </LayoutColumn>
    </LayoutRow>
  );
}
