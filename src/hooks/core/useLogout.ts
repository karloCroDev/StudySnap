'use client';

// External packages
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useLogout = () => {
  const toast = useToastStore((state) => state.setToast);
  const router = useRouter();
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
        title: 'Error while signing out',
        content: 'Failed to sign out, please try again',
        variant: 'error',
      });
    }
  };

  return logOut;
};
