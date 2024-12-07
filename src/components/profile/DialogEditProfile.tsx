// External packages
import * as React from 'react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import { Form } from 'react-aria-components';

export const DialogEditProfile: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

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
        <Avatar size="lg">Ivan Horvat</Avatar>
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

        <div className="flex items-center justify-between">
          <Link
            href="/public-profile"
            className="text-gray-600 underline-offset-2 hover:underline"
          ></Link>
          <Button onClick={() => setIsOpen(false)}>Save changes</Button>
        </div>
      </Form>
    </Dialog>
  );
};
