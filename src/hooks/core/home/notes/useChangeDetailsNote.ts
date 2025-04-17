'use client';

// External packagess
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Changing the note details logic
export const useChangeDetailsNote = ({
  noteId,
  isPublic,
  name,
  details,
  image,
  updateFields,
  setIsOpen,
}: {
  noteId: number;
  isPublic: boolean;
  name: string;
  details: string;
  updateFields: () => void;
  image: File | null;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);

  const updateDetailsReq = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('noteName', name);
      formData.append('details', details);
      formData.append('isPublic', isPublic.toString());
      formData.append('noteId', noteId.toString());
      if (image) formData.append('file', image);

      const response = await fetch('/api/core/home/notes', {
        method: 'PATCH',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Missing required fields',
          content: data.message,
          variant: 'error',
        });
        return;
      }
      updateFields();
      toast({
        title: `${name} note updated`,
        content: data.message,
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to create note',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return {
    loading,
    updateDetailsReq,
  };
};
