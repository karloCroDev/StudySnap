'use client';

// External packages
import * as React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import {
  MagnifyingGlassIcon,
  Cross2Icon,
  ChevronDownIcon,
} from '@radix-ui/react-icons';
import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
} from 'react-aria-components';
import { useShallow } from 'zustand/shallow';

// Databases
import { plus_jakarta_sans } from '@/lib/fonts';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Search } from '@/components/ui/Search';
import { Button } from '@/components/ui/Button';

// Models (types)
import { type Note } from '@/models/note';

// Hooks
import { useToggleSearch } from '@/hooks/core/home/useToggleSearch';

// Store
import { useGeneralStore } from '@/store/useGeneralStore';
import { useNoteStore } from '@/store/useNoteStore';

export const SelectOption: React.FC<{
  username: string;
  likedNotes: Note[];
  publicNotes: Note[];
}> = ({ username, likedNotes, publicNotes }) => {
  const setNotes = useNoteStore((state) => state.setNotes);
  const setSearch = useGeneralStore((state) => state.setSearch);

  const { infoHeader, toggleSearch } = useToggleSearch();

  const [popoverTitle, setPopoverTitle] = React.useState<
    'All notes' | `What ${string} likes`
  >('All notes');
  const [open, setOpen] = React.useState(false);
  return (
    <LayoutRow className="justify-center">
      <LayoutColumn xs={11} lg={10}>
        <div
          ref={infoHeader}
          className="group flex items-center justify-between gap-4"
        >
          <Select isOpen={open} onOpenChange={setOpen}>
            <Button
              colorScheme="white"
              className={twMerge(
                'h-16 text-2xl font-bold !italic underline decoration-2 underline-offset-12 group-data-[search-visible=true]:pointer-events-none group-data-[search-visible=false]:pointer-events-auto group-data-[search-visible=true]:fixed group-data-[search-visible=false]:animate-title-open group-data-[search-visible=true]:animate-title-closed group-data-[search-visible=false]:opacity-100 group-data-[search-visible=true]:opacity-0 md:h-20 md:animate-title-initial-apperance md:text-4xl 2xl:text-5xl',
                plus_jakarta_sans.className
              )}
            >
              {popoverTitle}
              <ChevronDownIcon className="size-6" />
            </Button>
            <Popover className="!z-20 w-full outline-none data-[exiting]:pointer-events-none data-[entering]:pointer-events-auto data-[entering]:animate-menu-open data-[exiting]:animate-menu-closed md:w-[var(--trigger-width)]">
              <ListBox className="cursor-pointer overflow-hidden rounded border border-gray-900 bg-gray-100 !outline-none">
                <ListBoxItem
                  className={twJoin(
                    'border-b border-b-gray-900 p-4 outline-none transition-colors hover:bg-gray-300',
                    popoverTitle === 'All notes' && 'bg-gray-200'
                  )}
                  onAction={() => {
                    setPopoverTitle('All notes');
                    setNotes(publicNotes);
                    setOpen(false);
                  }}
                >
                  <h4 className="text-md font-semibold">All notes</h4>
                  <p className="text-sm">See all notes from user</p>
                </ListBoxItem>
                <ListBoxItem
                  className={twJoin(
                    'p-4 outline-none transition-colors hover:bg-gray-300',
                    popoverTitle === `What ${username} likes` && 'bg-gray-200'
                  )}
                  onAction={() => {
                    setPopoverTitle(`What ${username} likes`);
                    setNotes(likedNotes);
                    setOpen(false);
                  }}
                >
                  <h4 className="text-md font-semibold">
                    What {username} likes
                  </h4>
                  <p className="text-sm">See all liked posts from {username}</p>
                </ListBoxItem>
              </ListBox>
            </Popover>
          </Select>
          <Search
            placeholderLabel="Search"
            className="fixed -z-10 w-full opacity-0 group-data-[search-visible=true]:pointer-events-auto group-data-[search-visible=true]:relative group-data-[search-visible=true]:z-10 group-data-[search-visible=false]:w-[calc(100%-48px-108px)] group-data-[search-visible=false]:animate-search-closed group-data-[search-visible=true]:animate-search-open group-data-[search-visible=true]:opacity-100 md:pointer-events-auto md:relative md:animate-search-initial-apperance md:opacity-100 lg:z-0 lg:!w-auto"
            // data-search-visible="true"
            onChange={(val) => setSearch(val.toString())}
          />
          <AriaButton
            className="h-fit rounded-full bg-blue-400 p-3 text-center text-gray-100 outline-none transition-colors duration-300 group-data-[search-visible=true]:bg-red-400 md:hidden"
            onPress={toggleSearch}
          >
            <MagnifyingGlassIcon className="size-8 group-data-[search-visible=true]:hidden" />
            <Cross2Icon className="hidden size-8 group-data-[search-visible=true]:block" />
          </AriaButton>
        </div>
      </LayoutColumn>
    </LayoutRow>
  );
};
