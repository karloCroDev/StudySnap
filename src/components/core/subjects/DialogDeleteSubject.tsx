'use client';

// External packages
import * as React from 'react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useDeleteSubject } from '@/hooks/core/home/subjects/useDeleteSubject';

// Confirmation dialog for removing a subject

export const DialogDeleteSubject: React.FC<{
  name: string;
  id: number;
  imageUrl: string | null;
  children: React.ReactNode;
}> = ({ name, id, children, imageUrl }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { loading, deleteSubjectReq } = useDeleteSubject({
    id,
    imageUrl,
    setIsOpen,
    name,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Delete subject"
      triggerProps={{
        children,
      }}
    >
      <div className="flex flex-col items-center">
        <h4 className="text-center text-base md:text-md">
          Are you sure you want to delete your subject
        </h4>
        <div className="mt-6 flex gap-6">
          <Button
            className="uppercase"
            iconRight={loading && <Spinner />}
            onPress={deleteSubjectReq}
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
