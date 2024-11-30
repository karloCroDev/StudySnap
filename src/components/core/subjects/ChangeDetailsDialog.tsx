'use client';
// External packages
import * as React from 'react';
import { FileTrigger, Form } from 'react-aria-components';
import { ImageIcon } from '@radix-ui/react-icons';
// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const ChangeDetailsDialog: React.FC<{
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
      title="Create subject"
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
          inputProps={{
            placeholder: 'Enter subject name',
          }}
        />

        <FileTrigger
          acceptedFileTypes={['.jpg,', '.jpeg', '.png']}
          onSelect={(event) => setImage(event && Array.from(event)[0])}
        >
          <div className="flex items-center gap-2">
            <Button
              className="self-start"
              variant="outline"
              colorScheme="black"
              iconLeft={<ImageIcon className="hidden size-5 md:block" />}
            >
              Image(optional)
            </Button>
            {imageNameArray && (
              <p>
                {imageNameArray[0].slice(0, 5) + '.' + imageNameArray.at(-1)}
              </p>
            )}
          </div>
        </FileTrigger>
        <Button className="self-end">Add new subject</Button>
      </Form>
    </Dialog>
  );
};
