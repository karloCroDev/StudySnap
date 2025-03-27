'use client';

// External packages
import * as React from 'react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

// Hooks
import { useDialogDelete } from '@/hooks/core/home/profile/useDialogDeleteProfile';

// Confirmation dialog for deleting the profile
export const DialogDeleteProfile = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const deleteDialog = useDialogDelete(setIsOpen);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Delete profile"
      triggerProps={{
        asChild: true,
        children: (
          <>
            <Button
              variant="outline"
              colorScheme="red"
              className="text-base md:text-md"
              onPress={() => {
                setIsOpen(true);
              }}
            >
              Delete profile
            </Button>
          </>
        ),
      }}
    >
      <div className="flex flex-col items-center">
        <h4 className="text-center text-base md:text-md">
          Are you sure you want to delete your profile?
        </h4>
        <div className="mt-6 flex gap-6">
          <Button className="uppercase" onPress={deleteDialog}>
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
