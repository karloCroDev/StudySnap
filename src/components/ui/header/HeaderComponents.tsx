'use client';

// External packages
import * as React from 'react';
import { GearIcon, PersonIcon, ExitIcon } from '@radix-ui/react-icons';
import {
  Menu as AriaMenu,
  MenuTrigger,
  MenuItem,
  Popover,
} from 'react-aria-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { DialogEditProfile } from '@/components/core/profile/DialogEditProfile';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useRouter } from 'next/navigation';

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const user = useSession();
  const router = useRouter();
  const toast = useToastStore((state) => state.setToast);

  const logOut = async () => {
    try {
      toast({
        title: 'Signed out',
        content: 'Nooo, please come back 😢',
        variant: 'success',
      });
      await signOut({ redirect: false }); // Refreshes the page (with redirect:true)
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
    <MenuTrigger isOpen={isMenuOpen}>
      <Button
        colorScheme="white"
        size="lg"
        iconLeft={
          <Avatar
            imageProps={{
              src: user.data?.user?.image || '',
              alt: '',
            }}
            size="md"
          >
            {user.data?.user?.name}
          </Avatar>
        }
        className="text-lg font-medium 2xl:text-xl"
        onPress={() => setIsMenuOpen(!isMenuOpen)}
      >
        {user.data?.user?.name}
      </Button>
      <Popover
        className="!z-20 w-[var(--trigger-width)] outline-none data-[exiting]:pointer-events-none data-[entering]:pointer-events-auto data-[entering]:animate-menu-open data-[exiting]:animate-menu-closed"
        shouldCloseOnInteractOutside={() => {
          setIsMenuOpen(isDialogOpen);
          return false;
        }}
      >
        <AriaMenu className="overflow-hidden rounded-md border border-gray-900">
          <MenuItem
            className="flex cursor-pointer items-center gap-2 border-b border-gray-900 bg-gray-100 p-2 outline-none hover:brightness-90"
            onAction={() => setIsMenuOpen(true)}
          >
            <DialogEditProfile setIsDialogOpen={setIsDialogOpen}>
              <div className="flex items-center gap-2">
                <GearIcon />
                Edit profile
              </div>
            </DialogEditProfile>
          </MenuItem>

          <MenuItem
            className="cursor-pointer border-b border-gray-900 bg-gray-100 p-2 outline-none hover:brightness-90"
            onAction={() => setIsMenuOpen(false)}
          >
            <Link
              href={`/public-profile/${user.data?.user.id}`}
              className="flex items-center gap-2"
            >
              <PersonIcon /> Public profile
            </Link>
          </MenuItem>
          <MenuItem
            className="flex cursor-pointer items-center gap-2 bg-red-400 p-2 text-gray-100 outline-none hover:brightness-90"
            onAction={logOut}
          >
            <ExitIcon /> Log out
          </MenuItem>
        </AriaMenu>
      </Popover>
    </MenuTrigger>
  );
};

export const Navigation = () => {
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