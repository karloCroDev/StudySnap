'use client';

// External packages
import * as React from 'react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useDialogDelete } from '@/hooks/core/home/notes/useDialogDelete';

// Confirmation dialog for removing a note
export const DialogDelete: React.FC<{
  children: React.ReactNode;
  noteName: string;
  noteId: string;
  imageUrl: string | null;
}> = ({ children, noteName, noteId, imageUrl }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { deleteNoteFn, loading } = useDialogDelete({
    imageUrl,
    noteId,
    noteName,
    setIsOpen,
  });
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
