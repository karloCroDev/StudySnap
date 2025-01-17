'use client';

// External packages
import * as React from 'react';
import { Form, FileTrigger, Button as AriaButton } from 'react-aria-components';
import { useSession } from 'next-auth/react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { DialogDeleteProfile } from '@/components/core/profile/DialogDeleteProfile';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogEditProfile: React.FC<{
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ setIsDialogOpen, children }) => {
  const user = useSession();
  const toast = useToastStore((state) => state.setToast);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsDialogOpen && setIsDialogOpen(isOpen);
  }, [isOpen]);

  const [image, setImage] = React.useState<File | null>(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const saveChanges = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/core/public-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //username, email, password, profile_picture, id
          }), //Todo provide me with this informaiton, place where DialogEditProfile is called has a wrong userId (two places)
        }
      );

      if (response.ok) {
        toast({
          title: 'Profile updated',
          content: 'You have succesfully updated your profile',
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
        content: 'Failed to update profile',
        variant: 'error',
      });
    }

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
        <FileTrigger
          acceptedFileTypes={['.jpg,', '.jpeg', '.png']}
          onSelect={(event) => setImage(event && Array.from(event)[0])}
        >
          <AriaButton className="outline-none">
            <Avatar
              className="cursor-pointer"
              size="lg"
              imageProps={{
                src:
                  (image && URL.createObjectURL(image)) ||
                  user.data?.user?.image ||
                  '',
                alt: 'Your pfp',
              }}
            >
              {user.data?.user?.name}
            </Avatar>
          </AriaButton>
        </FileTrigger>
        <h2 className="mt-4 text-lg font-semibold">
          {username || user.data?.user?.name}
        </h2>
      </div>
      <hr className="h-px w-full border-0 bg-gray-900" />
      <Form className="flex flex-col gap-5">
        <Input
          type="text"
          label="Username"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new username',
          }}
          onChange={(e) => setUsername(e.toString())}
        />
        <Input
          type="text"
          label="Password"
          minLength={8}
          maxLength={16}
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new password',
          }}
          onChange={(e) => setPassword(e.toString())}
        />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <DialogDeleteProfile userId="" />
          <Button onPress={saveChanges}>Save changes</Button>
        </div>
      </Form>
    </Dialog>
  );
};
