'use client';

// External packages
import * as React from 'react';
import {
  GearIcon,
  PersonIcon,
  ExitIcon,
  ArrowRightIcon,
} from '@radix-ui/react-icons';
import {
  Menu as AriaMenu,
  MenuTrigger,
  MenuItem,
  Popover,
} from 'react-aria-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { DialogEditProfile } from '@/components/core/profile/DialogEditProfile';

// Hooks
import { useLogout } from '@/hooks/core/useLogout';
import { fetchImage } from '@/utils/fetch-image';

export const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState("")
  const user = useSession();

  React.useEffect(() => {
    if (user.data?.user.image) {
      fetchImage(`http://localhost:3000/api/images?imageUrl=${user.data?.user.image}`, setProfileImage);
    }
  });

  const logout = useLogout();
  if (!user.data?.user.id)
    return (
      <MenuTrigger>
        <Button
          colorScheme="white"
          size="lg"
          iconLeft={
            <Avatar
              imageProps={{
                src: '',
                alt: '',
              }}
              size="md"
            >
              Anonymous
            </Avatar>
          }
          className="text-lg font-medium 2xl:text-xl"
        >
          Anonymous
        </Button>
        <Popover className="!z-20 w-[var(--trigger-width)] outline-none data-[exiting]:pointer-events-none data-[entering]:pointer-events-auto data-[entering]:animate-menu-open data-[exiting]:animate-menu-closed">
          <AriaMenu className="overflow-hidden rounded-md border border-gray-900">
            <MenuItem className="cursor-pointer border-b border-gray-900 bg-gray-100 p-2 outline-none hover:brightness-90">
              <Link href="/login" className="flex items-center gap-2">
                <PersonIcon /> Login
              </Link>
            </MenuItem>
            <MenuItem className="flex cursor-pointer items-center gap-2 bg-blue-400 p-2 text-gray-100 outline-none hover:brightness-90">
              <Link href="/sign-up" className="flex items-center gap-2">
                <ArrowRightIcon /> Sign up
              </Link>
            </MenuItem>
          </AriaMenu>
        </Popover>
      </MenuTrigger>
    );
  return (
    <MenuTrigger isOpen={isMenuOpen}>
      <Button
        colorScheme="white"
        size="lg"
        iconLeft={
          <Avatar
            imageProps={{
              src: profileImage,
              alt: '',
            }}
            size="md"
          >
            {user.data.user.name}
          </Avatar>
        }
        className="text-lg font-medium 2xl:text-xl"
        onPress={() => setIsMenuOpen(!isMenuOpen)}
      >
        {user.data.user.name}
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
              href={`/public-profile/${user.data.user.id}`}
              className="flex items-center gap-2"
            >
              <PersonIcon /> Public profile
            </Link>
          </MenuItem>
          <MenuItem
            className="flex cursor-pointer items-center gap-2 bg-red-400 p-2 text-gray-100 outline-none hover:brightness-90"
            onAction={logout}
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
