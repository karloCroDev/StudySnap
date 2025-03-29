'use client';

// External packages
import * as React from 'react';
import { useSession } from 'next-auth/react';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useDialogEditProfile = ({
  username,
  password,
  image,
  setIsOpen,
}: {
  username: string;
  password: string;
  image: File | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useSession();
  const toast = useToastStore((state) => state.setToast);
  const [loading, setLoading] = React.useState(false);
  const saveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('userId', user.data!.user.id.toString());
      if (username) formData.append('username', username);
      if (password) formData.append('password', password);
      if (image) formData.append('file', image);

      const response = await fetch(
        'http://localhost:3000/api/core/public-profile',
        {
          method: 'PATCH',
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Missing required fields',
          content: data.message,
          variant: 'error',
        });
        return;
      }
      if (username) await user.update({ name: username });
      if (data.pfpEncoded) await user.update({ image: data.pfpEncoded });

      toast({
        title: 'Profile updated',
        content: data.message,
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to update profile',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return { saveChanges, loading };
};
