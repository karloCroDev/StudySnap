'use client';

// External packages
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useGeneralInfo } from '@/store/useGeneralInfo';

// Models (types)
import { type Note } from '@/models/note';

export const useCreateNote = ({
  subjectId,
  isPublic,
  noteName,
  details,
  image,
  setNoteName,
  setDetails,
  setImage,
  setIsOpen,
}: {
  subjectId: string;
  isPublic: boolean;
  noteName: string;
  details: string;
  image: File | null;
  setNoteName: React.Dispatch<React.SetStateAction<string>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);
  const addNote = useGeneralInfo((state) => state.addNote);

  const createNoteReq = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('subjectId', subjectId);
      if (noteName) formData.append('noteName', noteName);
      if (details) formData.append('details', details);
      formData.append('isPublic', isPublic.toString());
      if (image) formData.append('file', image);

      const response = await fetch(
        'http://localhost:3000/api/core/home/notes',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Missing required fields',
          content:
            'Please make sure you have entered all the credentials correctly and try again',
          variant: 'error',
        });
        return;
      }
      addNote(data as Note);
      toast({
        title: `${noteName} note created`,
        content: `You have succesfully created ${noteName}`,
        variant: 'success',
      });
      setNoteName('');
      setDetails('');
      setImage(null);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to create note',
        variant: 'error',
      });
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };
  return { loading, createNoteReq };
};
