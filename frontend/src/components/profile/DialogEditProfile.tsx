'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { DialogDeleteProfile } from '@/components/profile/DialogDeleteProfile';

// Store
import { useToastStore } from '@/store/useToastStore';

// Images
import ImageExample from '@/public/images/login-image.png';

export const DialogEditProfile: React.FC<{
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ setIsDialogOpen, children }) => {
  const toast = useToastStore((state) => state.setToast);

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsDialogOpen && setIsDialogOpen(isOpen);
  }, [isOpen]);

  const saveChanges = () => {
    toast({
      // title: 'Deleted',
      // content: 'You have succesfully delete your note',
      // variant: 'success',
      title: 'Profile updated!',
      content:
        'You have successfuly updated your profile, please refresh to see your changes',
      variant: 'success',
    });
    setIsOpen(false);
    // toast({
    //   title: 'Oooposies',
    //   content: 'Something went wrong, please try again ',
    //   variant: 'error',
    // });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Edit profile"
      triggerProps={{
        asChild: true,
        children,
      }}
    >
      <div className="flex flex-col items-center">
        <Avatar
          size="lg"
          imageProps={{
            src: ImageExample.src,
            alt: '',
          }}
        >
          Ivan Horvat
        </Avatar>
        <h2 className="mt-4 text-lg font-semibold">Ivan Horvat</h2>
      </div>
      <hr className="h-px w-full border-0 bg-gray-900" />
      <Form className="flex flex-col gap-5">
        <Input
          isRequired
          type="text"
          label="Note name"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new note name',
          }}
        />
        <Input
          isRequired
          type="text"
          label="Username"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new username',
          }}
        />
        <Input
          isRequired
          type="text"
          label="Password"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new password',
          }}
        />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <DialogDeleteProfile />
          <Button onPress={saveChanges}>Save changes</Button>
        </div>
      </Form>
    </Dialog>
  );
};
