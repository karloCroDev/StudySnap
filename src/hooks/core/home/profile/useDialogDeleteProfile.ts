'use client';

// External packages
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useProfileDelete = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const user = useSession();
  const toast = useToastStore((state) => state.setToast);
  const router = useRouter();

  const deleteProfile = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/core/public-profile',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.data?.user.id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Uhoh',
          content: data.message,
          variant: 'error',
        });
        return;
      }
      await signOut({ redirect: false });
      router.push('/login');
      toast({
        title: 'Profile deleted',
        content: data.message,
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to delete profile',
        variant: 'error',
      });
    } finally {
      setIsOpen(false);
    }
  };
  return deleteProfile;
};
