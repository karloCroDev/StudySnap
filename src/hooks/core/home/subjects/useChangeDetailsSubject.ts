'use client';

// External packagess
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Logic behind chaning the subject details
export const useChangeDetailsSubject = ({
  id,
  subjectName,
  details,
  image,
  updateFields,
  setIsOpen,
}: {
  id: number;
  subjectName: string;
  details: string;
  image: File | null;
  updateFields: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);

  const updateSubjectReq = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('subjectId', id.toString());
      formData.append('subjectName', subjectName);
      formData.append('details', details);
      if (image) formData.append('file', image);
      setLoading(true);
      const response = await fetch('/api/core/home/subjects', {
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

      toast({
        title: `${subjectName} subject updated`,
        content: data.message,
        variant: 'success',
      });

      updateFields();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to update subject',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return {
    loading,
    updateSubjectReq,
  };
};
