'use client';
// External packages
import { GearIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';

// Components
import { Layout } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { Navigation } from '@/components/core/Navigation';
import { Menu } from '@/components/core/Menu';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed left-0 top-0 z-max h-24 w-full border-b border-gray-900">
        <Layout className="h-full">
          <nav className="h-full">
            <ul className="flex h-full items-center justify-between">
              <li>
                <Logo />
              </li>
              <li className="hidden gap-4 lg:flex">
                <Navigation />
              </li>
              <li className="hidden lg:block">
                <Menu />
              </li>
              <li className="lg:hidden">
                <Drawer />
              </li>
            </ul>
          </nav>
        </Layout>
      </div>
      <Layout>{children}</Layout>
    </>
  );
}

// External packages
import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { HomeIcon, FrameIcon, ExitIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Button } from '@/components/ui/Button';

// Images
import example from '@/public/images/login-image.png';

const Drawer = () => {
  console.log('Hello world');
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild className="cursor-pointer">
        <HamburgerMenuIcon className="size-7" />
      </RadixDialog.Trigger>
      <RadixDialog.Overlay className="fixed left-0 top-0 h-screen w-screen bg-gray-900 opacity-60 data-[state=closed]:animate-overlay-closed data-[state=open]:animate-overlay-open" />
      <RadixDialog.Content className="data-[state=open]:animate-drawer-slide-open data-[state=closed]:animate-drawer-slide-closed text-grayscale-10 fixed left-0 top-0 z-max flex h-full w-3/4 flex-col overflow-scroll overflow-x-hidden rounded-r-xl bg-gray-100 px-3 py-6 outline-none">
        <div className="flex flex-col items-center">
          <Image
            src={example}
            alt="Hello world"
            className="size-36 rounded-full object-cover"
          />
          <h4 className="mt-6 text-lg font-semibold">Ana horvat</h4>
        </div>
        <hr className="mt-3 h-px w-full border-0 bg-gray-900" />
        <ul className="mt-6 flex flex-col gap-3">
          <li>
            <LinkAsButton
              href="/home"
              colorScheme="dark-blue"
              size="lg"
              iconLeft={<HomeIcon className="size-6" />}
              className="justify-start"
            >
              Home
            </LinkAsButton>
          </li>
          <li>
            <LinkAsButton
              href="/discover"
              colorScheme="white"
              size="lg"
              iconLeft={<FrameIcon className="size-6" />}
              className="justify-start"
            >
              Discover
            </LinkAsButton>
          </li>
        </ul>
        <hr className="mt-auto h-px w-full border-0 bg-gray-900" />

        <ul className="mt-6 flex flex-col gap-4">
          <li>
            {/* Dialog treba ubaciti */}
            <LinkAsButton
              href="/discover"
              colorScheme="white"
              iconLeft={<PersonIcon className="size-6" />}
              className="justify-start"
            >
              Edit profile
            </LinkAsButton>
          </li>
          <li>
            <LinkAsButton
              href="/discover"
              colorScheme="white"
              iconLeft={<GearIcon className="size-6" />}
              className="justify-start"
            >
              Public settings
            </LinkAsButton>
          </li>
          <li>
            <Button
              colorScheme="white"
              size="lg"
              iconLeft={<ExitIcon className="size-6" />}
              className="w-full justify-start bg-red-400 text-gray-100"
            >
              Log out
            </Button>
          </li>
        </ul>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};
