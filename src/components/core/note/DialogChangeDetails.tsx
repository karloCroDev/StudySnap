'use client';
// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const DialogChangeDetails: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false); // Bit ce slanje podataka paaaaa msm da ne treba close
  const [image, setImage] = React.useState<File | null>(null);
  const imageNameArray = image?.name.split('.');
  console.log(imageNameArray);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Change subject's details"
      triggerProps={{
        asChild: true,
        children,
      }}
    >
      <Form className="flex flex-col gap-5">
        <Input
          isRequired
          type="text"
          label="Subject name"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new subject name',
          }}
        />
        <Button className="self-end" onClick={() => setIsOpen(false)}>
          Change Details
        </Button>
      </Form>
    </Dialog>
  );
};
