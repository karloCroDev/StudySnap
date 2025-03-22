'use client';

// External packages
import * as React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { twJoin } from 'tailwind-merge';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useGeneralInfo } from '@/store/useGeneralInfo';

// Confirmation dialog for removing a note
export const DialogDelete: React.FC<{
  children: React.ReactNode;
  noteName: string;
  noteId: string;
  imageUrl: string| null
}> = ({ children, noteName, noteId, imageUrl }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);
  const deleteNote = useGeneralInfo((state) => state.deleteNote);

  const deleteNoteFn = async () => {
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
          content: data.statusText,
          variant: 'error',
        });
        return;
      }

      setTimeout(() => {
        // This is inside the set timeout because the dialog needs to complete the animation, and I am completly removing the subject from the list which means that it doesn't exist anymore --> dialog immediatelly closes without animation
        deleteNote(noteId); // Client deletion
        toast({
          title: `${noteName} subject deleted`,
          content: data.statusText,
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
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Delete note"
      triggerProps={{
        children,
      }}
    >
      <div className="flex flex-col items-center">
        <h4 className="text-center text-base md:text-md">
          Are you sure you want to delete your note
        </h4>
        <div className="mt-6 flex gap-6">
          <Button
            className="uppercase"
            onPress={deleteNoteFn}
            iconRight={loading && <Spinner />}
          >
            yes
          </Button>
          <Button
            onPress={() => setIsOpen(false)}
            variant="outline"
            colorScheme="light-blue"
            className="uppercase"
          >
            no
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
