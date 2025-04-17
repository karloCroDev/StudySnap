'use client';

// External packages
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Models (types)
import { type Note } from '@/models/note';
import { useNoteStore } from '@/store/useNoteStore';

export const useCreateNote = ({
  subjectId,
  isPublic,
  noteName,
  details,
  image,
  resetFields,
  setIsOpen,
}: {
  subjectId: number;
  isPublic: boolean;
  noteName: string;
  details: string;
  image: File | null;
  resetFields: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);
  const addNote = useNoteStore((state) => state.addNote);

  const createNoteReq = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('subjectId', subjectId.toString());
      formData.append('noteName', noteName);
      formData.append('details', details);
      formData.append('isPublic', isPublic.toString());
      if (image) formData.append('file', image);

      const response = await fetch('/api/core/home/notes', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast({
          title: 'Missing required fields',
          content:
            'Please make sure you have entered all the credentials correctly and try again',
          variant: 'error',
        });
        return;
      }
      console.log(data);
      addNote(data as Note); // Adding the note to the store (upadting the frontend)
      resetFields();
      toast({
        title: `${noteName} note created`,
        content: `You have succesfully created ${noteName}`,
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
      setIsOpen(false);
      setLoading(false);
    }
  };
  return { loading, createNoteReq };
};
