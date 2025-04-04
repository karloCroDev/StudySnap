'use client';

// External packages
import * as React from 'react';
import { FileTrigger, Form, Button as AriaButton } from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useCreateSubject } from '@/hooks/core/home/subjects/useCreateSubject';

export const DialogCreateSubject: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [subjectName, setSubjectName] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);

  const resetFields = () => {
    // Reseting the fields (for the new use of dialog)
    setSubjectName('');
    setDetails('');
    setImage(null);
  };
  const { createSubjectReq, loading } = useCreateSubject({
    details,
    image,
    resetFields,
    setIsOpen,
    subjectName,
  });

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
      <Form className="flex flex-col gap-5" onSubmit={createSubjectReq}>
        <Input
          isRequired
          type="text"
          label="Subject name"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          value={subjectName}
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
          value={details}
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
              isReadOnly
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
          isDisabled={!subjectName}
          iconRight={loading && <Spinner />}
        >
          Add new subject
        </Button>
      </Form>
    </Dialog>
  );
};
