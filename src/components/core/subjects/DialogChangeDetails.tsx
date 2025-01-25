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

export const DialogChangeDetails: React.FC<{
  id: string;
  children: React.ReactNode;
  changeTitle: string;
  setChangeTitle: React.Dispatch<React.SetStateAction<string>>;
  setChangeDescription: React.Dispatch<React.SetStateAction<string>>;
}> = ({ changeTitle, setChangeTitle, setChangeDescription, id, children }) => {
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

    console.log(formData, 'Prethod');

    try {
      const response = await fetch(
        'http://localhost:3000/api/core/home/subjects',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formData, //image is missing here
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

      const syncName = subjectName || changeTitle;
      toast({
        title: `${syncName} subject updated`,
        content: `You have succesfully updated ${syncName} `,
        variant: 'success',
      });

      setChangeTitle(subjectName);
      setChangeDescription(details);
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
          Save
        </Button>
      </Form>
    </Dialog>
  );
};
