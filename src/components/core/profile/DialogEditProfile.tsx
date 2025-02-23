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
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogEditProfile: React.FC<{
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ setIsDialogOpen, children }) => {
  const user = useSession();

  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);

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

  const saveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/core/public-profile',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.data?.user.id,
            username,
            password,
          }),
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

      // if (image) await user.update({ image: '' }); // We need to handle upload of images
      if (username) await user.update({ name: username });

      toast({
        title: 'Profile updated',
        content: 'You have succesfully updated your profile',
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to update profile',
        variant: 'error',
      });
    } finally {
      setLoading(false);
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
      <Form className="flex flex-col gap-5" onSubmit={saveChanges}>
        <Input
          type="text"
          label="Username"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          value={username}
          inputProps={{
            placeholder: 'Enter new username',
          }}
          onChange={(e) => setUsername(e.toString())}
        />
        <Input
          label="New password"
          isPassword
          minLength={8}
          maxLength={16}
          isMdHorizontal
          value={password}
          inputProps={{
            placeholder: 'Enter new password',
          }}
          onChange={(e) => setPassword(e.toString())}
        />
        <div className="flex flex-row items-start justify-between gap-4 sm:items-center">
          <DialogDeleteProfile />
          <Button
            isDisabled={!username && !password && !image}
            type="submit"
            className="text-base md:text-md"
            iconRight={loading && <Spinner />}
          >
            Save changes
          </Button>
        </div>
      </Form>
    </Dialog>
  );
};
