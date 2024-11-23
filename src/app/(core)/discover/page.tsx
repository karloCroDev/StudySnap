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

export default function Discover() {
  const infoHeader = React.useRef<HTMLDivElement | null>(null);

  return (
    <LayoutRow className="group justify-center">
      {/* Seperate component */}
      <LayoutColumn xs={12} lg={10}>
        <div ref={infoHeader} className="group flex justify-between">
          <h1
            className={twJoin(
              'group-data-[search-visible=true]:animate-heading-closed group-data-[search-visible=false]:animate-heading-open -z-10 w-full text-2xl font-bold !italic underline decoration-2 underline-offset-12 group-data-[search-visible=true]:pointer-events-none group-data-[search-visible=false]:pointer-events-auto group-data-[search-visible=true]:absolute group-data-[search-visible=false]:opacity-100 group-data-[search-visible=true]:opacity-0 md:text-4xl 2xl:text-5xl',
              plus_jakarta_sans.className
            )}
          >
            Discover section
          </h1>

          <Search
            placeholderLabel="Search"
            className="group-data-[search-visible=true]:animate-search-open group-data-[search-visible=false]:animate-search-closed absolute opacity-0 group-data-[search-visible=true]:pointer-events-auto group-data-[search-visible=true]:relative group-data-[search-visible=true]:opacity-100 sm:pointer-events-auto sm:relative sm:opacity-100"
            // data-search-visible="true"
          />
          <AriaButton
            className="rounded-full bg-blue-400 p-3 text-center text-gray-100 outline-none transition-colors duration-300 group-data-[search-visible=true]:bg-red-400 sm:hidden"
            onPress={() => {
              const searchElement = infoHeader.current;

              if (searchElement) {
                const currentValue = searchElement.getAttribute(
                  'data-search-visible'
                );
                const newValue = currentValue === 'true' ? 'false' : 'true';
                searchElement.setAttribute('data-search-visible', newValue); //note: Nisam htio toggleati attribute zbog konflikta pocetnih animaticja koje ne bi trebale biti!
              }
            }}
          >
            <MagnifyingGlassIcon className="h-8 w-8 group-data-[search-visible=true]:hidden" />
            <Cross2Icon className="hidden h-8 w-8 group-data-[search-visible=true]:block" />
          </AriaButton>
        </div>
      </LayoutColumn>
    </LayoutRow>
  );
}
