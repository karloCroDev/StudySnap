'use client';

// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogDeleteProfile = () => {
  const user = useSession();

  const [isOpen, setIsOpen] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);
  const router = useRouter();

  const deleteDialog = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/core/public-profile',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.data?.user.id }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        await signOut({ redirect: false });
        router.push('/login');
        toast({
          title: 'Profile deleted',
          content: 'You have succesfully deleted your profile',
          variant: 'success',
        });
      } else if (response.status === 400) {
        toast({
          title: 'Uhoh',
          content: 'Please login again, and then try to delete profile',
          variant: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to delete profile',
        variant: 'error',
      });
    } finally {
      setIsOpen(false);
    }
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
            onPressStart={() => {
              setIsOpen(true);
            }}
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
