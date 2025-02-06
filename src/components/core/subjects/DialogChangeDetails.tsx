'use client';

// External packages
import * as React from 'react';
import { FileTrigger, Form, Button as AriaButton } from 'react-aria-components';
import { ImageIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogChangeDetails: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [subjectName, setSubjectName] = React.useState('');
  const [details, setDetails] = React.useState('');

  const [image, setImage] = React.useState<File | null>(null);

  const toast = useToastStore((state) => state.setToast);

  const updateSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subjectId', id);
    if (subjectName) formData.append('subjectName', subjectName);
    if (details) formData.append('details', details);
    if (image) formData.append('file', image);
    
    try {
      const response = await fetch(
        'http://localhost:3000/api/core/home/subjects',
        {
          method: 'PATCH',
          headers: {},
          body: formData,
        }
      );

      if (response.ok) {
        toast({
          title: 'Subject updated',
          content: 'You have succesfully updated your subject',
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
        content: 'Failed to update subject',
        variant: 'error',
      });
    }

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
      <Form className="flex flex-col gap-5" onSubmit={updateSubject}>
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
