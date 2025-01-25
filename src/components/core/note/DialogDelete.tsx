'use client';

// External packages
import * as React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

// Store
import { useToastStore } from '@/store/useToastStore';
import { twJoin } from 'tailwind-merge';

export const DialogDelete: React.FC<{
  noteId: string;
}> = ({ noteId }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);

  const deleteNote = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/core/home/notes',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ noteId }),
        }
      );

      if (response.ok) {
        toast({
          title: 'Note deleted',
          content: 'You have succesfully delete your note',
          variant: 'success',
        });
      } else if (response.status === 400) {
        toast({
          title: 'Missing required fields',
          content:
            'Please make sure you have entered all the credentials correctly and try again',
          variant: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to delete note',
        variant: 'error',
      });
    }
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Delete note"
      triggerProps={{
        children: (
          <TrashIcon
            className={twJoin(
              'size-9 transition-colors hover:text-blue-400 lg:size-7'
            )}
          />
        ),
      }}
    >
      <div className="flex flex-col items-center">
        <h4 className="text-center text-base md:text-md">
          Are you sure you want to delete your note
        </h4>
        <div className="mt-6 flex gap-6">
          <Button className="uppercase" onPress={deleteNote}>
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
