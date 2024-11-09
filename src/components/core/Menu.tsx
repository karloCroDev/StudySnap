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

// Components
import { Button } from '@/components/ui/Button';

export const Menu = () => (
  <MenuTrigger>
    <Button
      colorScheme="white"
      size="lg"
      iconLeft={
        <div className="w-12 rounded-full bg-grayscale-400 text-center text-md leading-12 text-white">
          AH
        </div>
      }
    >
      <p className="text-lg font-semibold 2xl:text-xl">Ivan Horvat</p>
    </Button>
    <Popover className="z-max w-[var(--trigger-width)] outline-none data-[exiting]:pointer-events-none data-[entering]:pointer-events-auto data-[entering]:animate-menu-open data-[exiting]:animate-menu-closed">
      <AriaMenu className="overflow-hidden rounded-md border border-grayscale-900">
        <MenuItem className="flex cursor-pointer items-center gap-2 border-b border-grayscale-900 bg-grayscale-100 p-2 outline-none hover:brightness-90">
          <GearIcon />
          Edit profile
        </MenuItem>
        <MenuItem className="flex cursor-pointer items-center gap-2 border-b border-grayscale-900 bg-grayscale-100 p-2 outline-none hover:brightness-90">
          <PersonIcon /> Public profile
        </MenuItem>
        <MenuItem className="flex cursor-pointer items-center gap-2 bg-red-400 p-2 text-grayscale-100 outline-none hover:brightness-90">
          <ExitIcon /> Log out
        </MenuItem>
      </AriaMenu>
    </Popover>
  </MenuTrigger>
);
