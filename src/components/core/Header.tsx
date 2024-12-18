'use client';

// External packages
import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { GearIcon, PersonIcon, ExitIcon } from '@radix-ui/react-icons';
import {
  Menu as AriaMenu,
  MenuTrigger,
  MenuItem,
  Popover,
  // Button as AriaButton,
} from 'react-aria-components';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { Drawer } from '@/components/core/Drawer';
import { Avatar } from '@/components/ui/Avatar';
import { DialogEditProfile } from '@/components/profile/DialogEditProfile';

// Images
import ImageExample from '@/public/images/login-image.png';

export const Header = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-20 h-24 w-full border-b border-gray-900 bg-gray-100">
        <Layout className="h-full">
          <nav className="h-full">
            <ul className="flex h-full items-center justify-between">
              <li className="flex-1">
                <Logo />
              </li>
              <li className="hidden flex-1 justify-center gap-4 lg:flex">
                <Navigation />
              </li>
              <li className="hidden flex-1 justify-end lg:flex">
                <Menu />
              </li>
              <li className="lg:hidden">
                <Drawer />
              </li>
            </ul>
          </nav>
        </Layout>
      </div>
    </>
  );
};

const Menu = () => {
  return (
    <MenuTrigger>
      <Button
        colorScheme="white"
        size="lg"
        iconLeft={
          <Avatar
            imageProps={{
              src: ImageExample.src,
              alt: '',
            }}
            size="md"
          >
            Ivan Horvat
          </Avatar>
        }
      >
        <p className="text-lg font-medium 2xl:text-xl">Ivan Horvat</p>
      </Button>
      <Popover className="!z-20 w-[var(--trigger-width)] outline-none data-[exiting]:pointer-events-none data-[entering]:pointer-events-auto data-[entering]:animate-menu-open data-[exiting]:animate-menu-closed">
        <AriaMenu className="overflow-hidden rounded-md border border-gray-900">
          <MenuItem className="flex cursor-pointer items-center gap-2 border-b border-gray-900 bg-gray-100 p-2 outline-none hover:brightness-90">
            <DialogEditProfile>
              <div className="flex items-center gap-2">
                <GearIcon />
                Edit profile
              </div>
            </DialogEditProfile>
          </MenuItem>
          <MenuItem className="cursor-pointer border-b border-gray-900 bg-gray-100 p-2 outline-none hover:brightness-90">
            <Link href="/public-profile" className="flex items-center gap-2">
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
};

const Navigation = () => {
  const pathname = usePathname();
  return (
    <>
      <LinkAsButton
        href="/home/subjects"
        colorScheme={pathname.includes('/home') ? 'dark-blue' : 'white'}
      >
        Home
      </LinkAsButton>
      <LinkAsButton
        href="/discover"
        colorScheme={pathname.includes('/discover') ? 'dark-blue' : 'white'}
      >
        Discover
      </LinkAsButton>
    </>
  );
};
