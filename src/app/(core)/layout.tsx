'use client';
// External packages
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

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
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';

// // Images
// import

const Drawer = () => {
  console.log('Hello world');
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild className="cursor-pointer">
        <HamburgerMenuIcon className="size-7" />
      </RadixDialog.Trigger>
      <RadixDialog.Overlay className="fixed left-0 top-0 h-screen w-screen bg-gray-900 opacity-60 data-[state=closed]:animate-overlay-closed data-[state=open]:animate-overlay-open" />
      <RadixDialog.Content className="data-[state=open]:animate-drawer-slide-open data-[state=closed]:animate-drawer-slide-closed text-grayscale-10 fixed left-0 top-0 z-max flex h-full w-3/4 flex-col overflow-scroll overflow-x-hidden rounded-r-xl bg-gray-100 px-3 py-6"></RadixDialog.Content>
    </RadixDialog.Root>
  );
};
