'use client';

// External packages
import * as React from 'react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogDelete: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);
  const deleteDialog = async() => {

    try {
      const response = await fetch('http://localhost:3000/api/core/home/subjects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast({
          title: 'Subject delted',
          content: 'You have succesfully delete your subject',
          variant: 'success',
        });
      }
      else if (response.status === 400) {
        toast({
          title: 'Missing required fields',
          content: 'Please make sure you have entered all the credentials correctly and try again',
          variant: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content:
          'Failed to delete subject',
        variant: 'error',
      });
    }
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Delete subject"
      triggerProps={{
        asChild: true,
        children,
      }}
    >
      <div className="flex flex-col items-center">
        <h4 className="text-center text-base md:text-md">
          Are you sure you want to delete your subject
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
