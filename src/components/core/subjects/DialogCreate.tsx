'use client';

// External packages
import * as React from 'react';
import { FileTrigger, Form, Button as AriaButton } from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogCreate: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [subjectName, setSubjectName] = React.useState('');
  const [details, setDetails] = React.useState('');

  const [image, setImage] = React.useState<File | null>(null);

  const toast = useToastStore((state) => state.setToast);

  const createSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:3000/api/core/home/subjects',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subjectName, details, image }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast({
          title: `${subjectName} subject created`,
          content: `You have succesfully created ${subjectName}`,
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
        content: 'Failed to create subject',
        variant: 'error',
      });
    }
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Create subject"
      triggerProps={{
        children,
        asChild: true,
      }}
    >
      <Form className="flex flex-col gap-5" onSubmit={createSubject}>
        <Input
          isRequired
          type="text"
          label="Subject name"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter subject name',
          }}
          onChange={(val) => setSubjectName(val.toString())}
        />
        <Input
          type="text"
          label="Details (optional)"
          minLength={5}
          maxLength={40}
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter your subject’s details (optional)',
          }}
          onChange={(val) => setDetails(val.toString())}
        />
        <FileTrigger
          acceptedFileTypes={['.jpg,', '.jpeg', '.png']}
          onSelect={(event) => setImage(event && Array.from(event)[0])}
        >
          <AriaButton className="outline-none">
            <Input
              label="Image (optional)"
              isMdHorizontal
              inputProps={{
                placeholder: 'Enter thumbnail image (optional)',
                value: image ? image?.name.toString() : '',
              }}
              className="text-start"
            />
          </AriaButton>
        </FileTrigger>
        <Button className="self-end" type="submit" isDisabled={!subjectName}>
          Add new subject
        </Button>
      </Form>
    </Dialog>
  );
};
