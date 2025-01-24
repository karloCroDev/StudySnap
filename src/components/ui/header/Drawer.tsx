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
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Button } from '@/components/ui/Button';
import { DialogEditProfile } from '@/components/core/profile/DialogEditProfile';
import { Avatar } from '@/components/ui/Avatar';

// Store
import { useToastStore } from '@/store/useToastStore';

export const Drawer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const user = useSession();
  const toast = useToastStore((state) => state.setToast);

  const logOut = async () => {
    try {
      toast({
        title: 'Signed out',
        content: 'Nooo, please come back 😢',
        variant: 'success',
      });
      await signOut({ redirect: false }); // Refreshes the page by default
      router.push('/login');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Signed out',
        content: 'Nooo, please come back 😢',
        variant: 'error',
      });
    }
  };

  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild className="cursor-pointer">
        <HamburgerMenuIcon className="size-7" />
      </RadixDialog.Trigger>
      <RadixDialog.Overlay className="fixed left-0 top-0 z-max h-screen w-screen bg-gray-900 opacity-60 data-[state=closed]:animate-overlay-closed data-[state=open]:animate-overlay-open" />
      <RadixDialog.Content className="text-grayscale-10 fixed left-0 top-0 z-max flex h-full w-3/4 max-w-96 flex-col overflow-scroll overflow-x-hidden rounded-r-xl bg-gray-100 px-3 py-6 outline-none data-[state=closed]:animate-drawer-slide-closed data-[state=open]:animate-drawer-slide-open">
        <div className="flex flex-col items-center">
          <Avatar
            size="lg"
            imageProps={{ src: user?.data?.user?.image || '', alt: '' }}
          >
            {user?.data?.user?.name}
          </Avatar>
          <h4 className="mt-6 text-lg font-semibold">
            {user?.data?.user?.name}
          </h4>
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
            <DialogEditProfile>
              <Button
                colorScheme="white"
                iconLeft={<GearIcon className="size-6" />}
                className="w-full justify-start"
              >
                Edit profile
              </Button>
            </DialogEditProfile>
          </li>
          <li>
            <RadixDialog.Close asChild>
              <LinkAsButton
                href={`/public-profile/${user.data?.user.id}`}
                colorScheme="white"
                iconLeft={<PersonIcon className="size-6" />}
                className="justify-start"
              >
                Public profile
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
                onPress={logOut}
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
