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
  const clientImage = React.useMemo(
    () => image && URL.createObjectURL(image),
    [image]
  );
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const saveChanges = async () => {
    try {
      const payload: Record<string, any> = {
        userId: user.data?.user.id,
        // Delete this under when your done (only setted this now to work)
        email: user.data?.user.email,
        password: '12345678',
        profile_picture: '',
      };
      if (username) payload.username = username;
      if (password) payload.password = password;
      if (image) payload.profile_picture = ''; // We need to handle upload of images
      console.log(payload);
      const response = await fetch(
        'http://localhost:3000/api/core/public-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          // I wrote the explaination in public-profile api
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        // if (image) await user.update({ image: '' }); // We need to handle upload of images
        if (username) await user.update({ name: username });

        toast({
          title: 'Profile updated',
          content: 'You have succesfully updated your profile',
          variant: 'success',
        });
        // Find a better way, this works for now
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
    } finally {
      setIsOpen(false);
    }
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
                src: clientImage || user.data?.user?.image || '',
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
          <DialogDeleteProfile />
          <Button
            onPress={saveChanges}
            isDisabled={!username && !password && !image}
          >
            Save changes
          </Button>
        </div>
      </Form>
    </Dialog>
  );
};
