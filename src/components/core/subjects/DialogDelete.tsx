'use client';

// External packages
import * as React from 'react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useGeneralInfo } from '@/store/useGeneralInfo';

export const DialogDelete: React.FC<{
  name: string;
  id: string;
  children: React.ReactNode;
}> = ({ name, id, children }) => {
  const [loading, setLoading] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);
  const deleteSubject = useGeneralInfo((state) => state.deleteSubject);

  const deleteDialog = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/core/home/subjects',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        }
      );
      if (!response.ok) {
        toast({
          title: 'Missing required fields',
          content:
            'Please make sure you have entered all the credentials correctly and try again',
          variant: 'error',
        });
        return;
      }
      setTimeout(() => {
        // This is inside the set timeout because the dialog needs to complete the animation, and I am completly removing the subject from the list which means that it doesn't exist anymore --> dialog immediatelly closes without animation
        deleteSubject(id);
        toast({
          title: `${name} subject deleted`,
          content: `You have succesfully deleted ${name} subject`,
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
          <Button className="uppercase" onPress={deleteDialog}>
            yes
          </Button>
          <Button
            onPress={() => setIsOpen(false)}
            iconRight={loading && <Spinner />}
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
