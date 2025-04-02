',use client';

// External packagess
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useNoteStore } from '@/store/useNoteStore';

export const useDeleteNotes = ({
  noteName,
  noteId,
  imageUrl,
  setIsOpen,
}: {
  noteName: string;
  noteId: number;
  imageUrl: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const deleteNoteReq = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/core/home/notes',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ noteId, imageUrl }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: `Uhoh couldn't delete ${noteName}`,
          content: data.message,
          variant: 'error',
        });
        return;
      }

      setTimeout(() => {
        // This is inside the set timeout because the dialog needs to complete the animation, and I am completly removing the subject from the list which means that it doesn't exist anymore --> dialog immediatelly closes without animation
        deleteNote(noteId); // Client deletion
        toast({
          title: `${noteName} note is deleted`,
          content: data.message,
          variant: 'success',
        });
        // Animation duration
      }, 500);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to delete note',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return { deleteNoteReq, loading };
};
