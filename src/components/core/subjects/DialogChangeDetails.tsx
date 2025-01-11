'use client';

// External packages
import * as React from 'react';
import { FileTrigger, Form } from 'react-aria-components';
import { ImageIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogChangeDetails: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [subjectName, setSubjectName] = React.useState('');
  const [details, setDetails] = React.useState('');

  const [image, setImage] = React.useState<File | null>(null);
  const imageNameArray = image?.name.split('.');

  console.log(imageNameArray);

  const toast = useToastStore((state) => state.setToast);

  const createNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: `Subject created`,
      content: `You have succesfully created Subject`,
      variant: 'success',
    });

    setIsOpen(false);
  };

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
      <Form className="flex flex-col gap-5" onSubmit={createNote}>
        <Input
          type="text"
          label="Subject name"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new subject name',
          }}
          onChange={(val) => setSubjectName(val.toString())}
        />
        <Input
          type="text"
          label="Details"
          minLength={5}
          maxLength={40}
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter new subject details',
          }}
          onChange={(val) => setDetails(val.toString())}
        />
        {/* note: Ako stignemo i sliku bi bilo super */}
        {/* <FileTrigger
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
        </FileTrigger> */}
        <Button
          className="self-end"
          type="submit"
          isDisabled={!subjectName && !details}
        >
          Change subject
        </Button>
      </Form>
    </Dialog>
  );
};
