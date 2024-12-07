'use client';

// External packages
import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog'; // note: Nema drawer componente pa sam morao ovako
import {
  GearIcon,
  HamburgerMenuIcon,
  PersonIcon,
  HomeIcon,
  FrameIcon,
  ExitIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Button } from '@/components/ui/Button';

// Images
import example from '@/public/images/login-image.png';

export const Drawer = () => {
  const pathname = usePathname();

  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild className="cursor-pointer">
        <HamburgerMenuIcon className="size-7" />
      </RadixDialog.Trigger>
      <RadixDialog.Overlay className="fixed left-0 top-0 z-max h-screen w-screen bg-gray-900 opacity-60 data-[state=closed]:animate-overlay-closed data-[state=open]:animate-overlay-open" />
      <RadixDialog.Content className="text-grayscale-10 fixed left-0 top-0 z-max flex h-full w-3/4 flex-col overflow-scroll overflow-x-hidden rounded-r-xl bg-gray-100 px-3 py-6 outline-none data-[state=closed]:animate-drawer-slide-closed data-[state=open]:animate-drawer-slide-open">
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
            <RadixDialog.Close asChild>
              <LinkAsButton
                href="/home/subjects"
                size="lg"
                colorScheme={pathname.includes('/home') ? 'dark-blue' : 'white'}
                iconLeft={<HomeIcon className="size-6" />}
                className="justify-start"
              >
                Home
              </LinkAsButton>
            </RadixDialog.Close>
          </li>
          <li>
            <RadixDialog.Close asChild>
              <LinkAsButton
                href="/discover"
                colorScheme={
                  pathname.includes('/discover') ? 'dark-blue' : 'white'
                }
                size="lg"
                iconLeft={<FrameIcon className="size-6" />}
                className="justify-start"
              >
                Discover
              </LinkAsButton>
            </RadixDialog.Close>
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
            <RadixDialog.Close asChild>
              <LinkAsButton
                href="/public-profile"
                colorScheme="white"
                iconLeft={<GearIcon className="size-6" />}
                className="justify-start"
              >
                Public settings
              </LinkAsButton>
            </RadixDialog.Close>
          </li>
          <li>
            <RadixDialog.Close asChild>
              <Button
                colorScheme="white"
                size="lg"
                iconLeft={<ExitIcon className="size-6" />}
                className="w-full justify-start bg-red-400 text-gray-100"
              >
                Log out
              </Button>
            </RadixDialog.Close>
          </li>
        </ul>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};
