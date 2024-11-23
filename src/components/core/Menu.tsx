'use client';

// External packages
import {
  Menu as AriaMenu,
  MenuTrigger,
  MenuItem,
  Popover,
  // Button as AriaButton,
} from 'react-aria-components';
import { PersonIcon, ExitIcon, GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

// Components
import { Button } from '@/components/ui/Button';

export const Menu = () => (
  <MenuTrigger>
    <Button
      colorScheme="white"
      size="lg"
      iconLeft={
        <div className="w-12 rounded-full bg-gray-400 text-center text-md leading-12 text-white">
          AH
        </div>
      }
    >
      <p className="text-lg font-semibold 2xl:text-xl">Ivan Horvat</p>
    </Button>
    <Popover className="z-max w-[var(--trigger-width)] outline-none data-[exiting]:pointer-events-none data-[entering]:pointer-events-auto data-[entering]:animate-menu-open data-[exiting]:animate-menu-closed">
      <AriaMenu className="overflow-hidden rounded-md border border-gray-900">
        <MenuItem className="flex cursor-pointer items-center gap-2 border-b border-gray-900 bg-gray-100 p-2 outline-none hover:brightness-90">
          {/* fix: Add Modal after I create it for editing profile */}
          <GearIcon />
          Edit profile
        </MenuItem>
        <MenuItem className="cursor-pointer border-b border-gray-900 bg-gray-100 p-2 outline-none hover:brightness-90">
          <Link href="/home-user" className="flex items-center gap-2">
            {/* fix: user -> users username */}
            <PersonIcon /> Public profile
          </Link>
        </MenuItem>
        <MenuItem
          className="flex cursor-pointer items-center gap-2 bg-red-400 p-2 text-gray-100 outline-none hover:brightness-90"
          onAction={() => console.log('Log out user')}
        >
          <ExitIcon /> Log out
        </MenuItem>
      </AriaMenu>
    </Popover>
  </MenuTrigger>
);
