// External packages
import { twJoin } from 'tailwind-merge';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Search } from '@/components/ui/Search';
import { Button } from '@/components/ui/Button';
export default function Discover() {
  return (
    <LayoutRow className="justify-center">
      <LayoutColumn
        xs={12}
        lg={10}
        className="flex items-center justify-between"
      >
        <h1
          className={twJoin(
            'underline-offset-12 text-2xl font-bold !italic underline decoration-2 md:text-4xl 2xl:text-5xl',
            plus_jakarta_sans.className
          )}
        >
          Discover section
        </h1>
        <Button className="h-auto p-2">
          <MagnifyingGlassIcon className="h-8 w-8" />
        </Button>
        <Button colorScheme="light-blue" className="h-auto p-2">
          <Cross2Icon className="h-8 w-8" />
        </Button>
        <Search
          placeholderLabel="Search"
          className="sm:ab pointer-events-none absolute opacity-0 sm:pointer-events-auto sm:static sm:opacity-100"
        />
      </LayoutColumn>
    </LayoutRow>
  );
}
