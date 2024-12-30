'use client';

// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

// Store
import { useToastStore } from '@/store/useToastStore';
import { useGeneralInfo } from '@/store/useGeneralInfo';

export const DialogDeleteProfile = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const user = useGeneralInfo((state) => state.user);
  const toast = useToastStore((state) => state.setToast);

  const router = useRouter();

  const deleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const data = await response.json();
      router.push('/login');
      toast({
        title: 'Profile deleted!',
        content: `${data}. Refresing the page in 5s`,
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
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
            onPressStart={() => setIsOpen(true)}
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
          <Button className="uppercase" onPress={deleteProfile}>
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
