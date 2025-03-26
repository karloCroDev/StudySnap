// External packagess
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useDialogChangeDetails = ({
  noteId,
  isPublic,
  name,
  details,
  image,
  setNoteName,
  setNoteDetails,
  setNoteImage,
  setIsOpen,
}: {
  noteId: string;
  isPublic: boolean;
  name: string;
  details: string;
  image: File | null;
  setNoteName: React.Dispatch<React.SetStateAction<string>>;
  setNoteDetails: React.Dispatch<React.SetStateAction<string>>;
  setNoteImage: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);

  const changeDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('noteName', name);
      formData.append('details', details);
      formData.append('isPublic', isPublic.toString());
      formData.append('noteId', noteId);
      if (image) formData.append('file', image);

      const response = await fetch(
        'http://localhost:3000/api/core/home/notes',
        {
          method: 'PATCH',
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Missing required fields',
          content: data.statusText,
          variant: 'error',
        });
        return;
      }

      toast({
        title: `${name} note updated`,
        content: data.statusText,
        variant: 'success',
      });

      if (name) setNoteName(name);
      if (details) setNoteDetails(details);
      if (image) setNoteImage(URL.createObjectURL(image));
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
    changeDetails,
  };
};
