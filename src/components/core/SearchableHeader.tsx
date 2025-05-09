'use client';

// External packages
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';

// Lib
import { plus_jakarta_sans } from '@/lib/fonts';

// Hooks
import { useToggleSearch } from '@/hooks/core/home/useToggleSearch';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Search } from '@/components/ui/Search';
import { Button as AriaButton } from 'react-aria-components';

// Store
import { useGeneralStore } from '@/store/useGeneralStore';

export const SearchableHeader: React.FC<{
  title: string;
}> = ({ title }) => {
  const setSearch = useGeneralStore((state) => state.setSearch);
  React.useEffect(() => {
    setSearch('');
  }, []);

  const { infoHeader, toggleSearch } = useToggleSearch();

  return (
    <LayoutRow className="justify-center">
      <LayoutColumn xs={11} lg={10}>
        <div ref={infoHeader} className="group flex justify-between gap-4">
          <h1
            // Long classes because of animations at the beggining, on mobile with search etc. and setting up the data attribute
            className={twMerge(
              'w-full text-2xl font-bold !italic underline decoration-2 underline-offset-12 group-data-[search-visible=true]:pointer-events-none group-data-[search-visible=false]:pointer-events-auto group-data-[search-visible=true]:fixed group-data-[search-visible=false]:animate-title-open group-data-[search-visible=true]:animate-title-closed group-data-[search-visible=false]:opacity-100 group-data-[search-visible=true]:opacity-0 md:animate-title-initial-apperance md:text-4xl 2xl:text-5xl',
              plus_jakarta_sans.className
            )}
          >
            {title}
          </h1>

          <Search
            placeholderLabel="Search"
            className="fixed -z-10 opacity-0 group-data-[search-visible=true]:pointer-events-auto group-data-[search-visible=true]:relative group-data-[search-visible=true]:z-10 group-data-[search-visible=false]:w-[calc(100%-48px-108px)] group-data-[search-visible=false]:animate-search-closed group-data-[search-visible=true]:animate-search-open group-data-[search-visible=true]:opacity-100 md:pointer-events-auto md:relative md:animate-search-initial-apperance md:opacity-100 lg:z-0"
            // data-search-visible="true"
            onChange={(val) => setSearch(val.toString())}
          />
          <AriaButton
            className="rounded-full bg-blue-400 p-3 text-center text-gray-100 outline-none transition-colors duration-300 group-data-[search-visible=true]:bg-red-400 md:hidden"
            onPress={toggleSearch}
          >
            <MagnifyingGlassIcon className="h-8 w-8 group-data-[search-visible=true]:hidden" />
            <Cross2Icon className="hidden h-8 w-8 group-data-[search-visible=true]:block" />
          </AriaButton>
        </div>
      </LayoutColumn>
    </LayoutRow>
  );
};
