'use client';

// External packagess
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useGeneralInfo } from '@/store/useGeneralInfo';

export const useDeleteSubject = ({
  id,
  name,
  imageUrl,
  setIsOpen,
}: {
  id: number;
  name: string;
  imageUrl: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);
  const deleteSubject = useGeneralInfo((state) => state.deleteSubject);

  const deleteSubjectReq = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/core/home/subjects',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, imageUrl }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: `Uhoh couldn't delete ${name}`,
          content: data.statusText,
          variant: 'error',
        });
        return;
      }
      setTimeout(() => {
        // This is inside the set timeout because the dialog needs to complete the animation, and I am completly removing the subject from the list which means that it doesn't exist anymore --> dialog immediatelly closes without animation
        deleteSubject(id); // Client deletion
        toast({
          title: `${name} subject deleted`,
          content: data.statusText,
          variant: 'success',
        });
      }, 500);
    } catch (error) {
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to delete subject',
        variant: 'error',
      });
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return { deleteSubjectReq, loading };
};
