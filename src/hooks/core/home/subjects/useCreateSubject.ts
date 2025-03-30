'use client';

// External packagess
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useSubjectStore } from '@/store/useSubjectStore';

// Models (types)
import { type Subject } from '@/models/subject';

export const useCreateSubject = ({
  subjectName,
  details,
  image,
  setSubjectName,
  setDetails,
  setImage,
  setIsOpen,
}: {
  subjectName: string;
  details: string;
  image: File | null;
  setSubjectName: React.Dispatch<React.SetStateAction<string>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);
  const addSubject = useSubjectStore((state) => state.addSubject);

  const createSubjectReq = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (subjectName) formData.append('subjectName', subjectName);
    if (details) formData.append('details', details);
    if (image) formData.append('file', image);

    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/core/home/subjects',
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
      addSubject(data as Subject);
      toast({
        title: `${subjectName} subject created`,
        content: `You have succesfully created ${subjectName}`,
        variant: 'success',
      });
      setSubjectName('');
      setDetails('');
      setImage(null);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to create subject',
        variant: 'error',
      });
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };
  return { loading, createSubjectReq };
};
