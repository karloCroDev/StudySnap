'use client';

// External packages
import { usePathname } from 'next/navigation';

// Components
import { LinkAsButton } from '@/components/ui/LinkAsButton';

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
