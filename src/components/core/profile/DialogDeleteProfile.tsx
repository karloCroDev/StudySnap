'use client';
// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

// Store
import { useToastStore } from '@/store/useToastStore';


export const DialogDeleteProfile : React.FC<{
  userId: string;
}> = ({ userId }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);

  const router = useRouter();

  const deleteDialog = async () => {

    try {
      const response = await fetch('http://localhost:3000/api/core/public-profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        toast({
          title: 'Profile deleted',
          content: 'You have succesfully deleted your profile',
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
          'Failed to delete profile',
        variant: 'error',
      });
    }
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Delete profile"
      triggerProps={{
        asChild: true,
        children: (
          <Button
            variant="outline"
            colorScheme="red"
            onPressStart={() => {deleteDialog(); setIsOpen(true)}}
          >
            Delete profile
          </Button>
        ),
      }}
    >
      <div className="flex flex-col items-center">
        <h4 className="text-center text-base md:text-md">
          Are you sure you want to delete your profile?
        </h4>
        <div className="mt-6 flex gap-6">
          <Button className="uppercase">yes</Button>
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
