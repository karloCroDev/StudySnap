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
import { useChangeDetailsSubject } from '@/hooks/core/home/subjects/useChangeDetailsSubject';

// Dialog for chaging details for subjects
export const DialogChangeDetails: React.FC<{
  id: number;
  children: React.ReactNode;
  // These are props (from subject card) that are needed in order to update the Subject card on frontend, and to display current details (title, desc...) etc.
  cardTitle: string;
  setCardTitle: React.Dispatch<React.SetStateAction<string>>;
  cardDescription: string;
  setCardDescripton: React.Dispatch<React.SetStateAction<string>>;
  setCardImage: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({
  cardTitle,
  setCardTitle,
  cardDescription,
  setCardDescripton,
  setCardImage,
  id,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [subjectName, setSubjectName] = React.useState(cardTitle);
  const [details, setDetails] = React.useState(cardDescription);
  const [image, setImage] = React.useState<File | null>(null);

  const { loading, updateSubjectReq } = useChangeDetailsSubject({
    details,
    id,
    image,
    setCardDescripton,
    setCardImage,
    setCardTitle,
    setIsOpen,
    subjectName,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Change subject's details"
      triggerProps={{
        children,
      }}
    >
      <Form className="flex flex-col gap-5" onSubmit={updateSubjectReq}>
        <Input
          type="text"
          label="Subject name"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          value={subjectName}
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
          value={details}
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
              label="Image"
              isMdHorizontal
              isReadOnly
              inputProps={{
                placeholder: 'Enter thumbnail image',
                value: image ? image?.name.toString() : '',
              }}
              className="text-start"
            />
          </AriaButton>
        </FileTrigger>
        <Button
          className="self-end"
          type="submit"
          isDisabled={
            subjectName === cardTitle && details === cardDescription && !image
          }
          iconRight={loading && <Spinner />}
        >
          Save
        </Button>
      </Form>
    </Dialog>
  );
};
