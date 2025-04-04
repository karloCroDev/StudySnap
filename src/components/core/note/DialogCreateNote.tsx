'use client';

// External packages
import * as React from 'react';
import {
  RadioGroup,
  Radio,
  Form,
  FileTrigger,
  Button as AriaButton,
} from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useCreateNote } from '@/hooks/core/home/notes/useCreateNote';

// Dialog that activates after pressing the Create new Toast card. Enables user to create their new subject note inside the suvbject
export const DialogCreateNote: React.FC<{
  children: React.ReactNode;
  subjectId: number;
}> = ({ children, subjectId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  const [noteName, setNoteName] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);

  const resetFields = () => {
    // Reseting the form fields in dialog (after successful creation)
    setNoteName('');
    setDetails('');
    setImage(null);
  };
  const { createNoteReq, loading } = useCreateNote({
    details,
    image,
    isPublic,
    noteName,
    subjectId,
    resetFields,
    setIsOpen,
  });
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Create note"
      triggerProps={{
        children,
        asChild: true,
      }}
    >
      <Form className="flex flex-col gap-5" onSubmit={createNoteReq}>
        <Input
          isRequired
          type="text"
          label="Note name"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          value={noteName}
          inputProps={{
            placeholder: 'Enter note name',
          }}
          onChange={(val) => setNoteName(val.toString())}
        />
        <Input
          isRequired
          type="text"
          label="Details "
          minLength={5}
          maxLength={40}
          isMdHorizontal
          value={details}
          inputProps={{
            placeholder: "Enter your note's details ",
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
              isReadOnly
              isMdHorizontal
              inputProps={{
                placeholder: 'Enter thumbnail image (optional)',
                value: image ? image?.name.toString() : '',
              }}
              className="text-start"
            />
          </AriaButton>
        </FileTrigger>
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-0">
          <p className="text-end text-md md:flex-1">Make it public</p>
          <RadioGroup
            className="flex justify-center gap-6 self-center md:flex-[2] md:self-auto"
            defaultValue="false"
            onChange={(val) =>
              val === 'false' ? setIsPublic(false) : setIsPublic(true)
            }
          >
            <Radio
              value="true"
              className="group flex cursor-pointer items-center gap-2 text-md"
            >
              Yes
              <div className="size-8 rounded-full bg-green-400 transition-[border] duration-200 group-data-[selected]:border-[8px] group-data-[selected]:border-gray-900"></div>
            </Radio>
            <Radio
              value="false"
              className="group flex cursor-pointer items-center gap-2 text-md"
            >
              No
              <div className="size-8 rounded-full bg-red-400 transition-[border] duration-200 group-data-[selected]:border-[8px] group-data-[selected]:border-gray-900"></div>
            </Radio>
          </RadioGroup>
        </div>
        <Button
          className="self-end"
          type="submit"
          isDisabled={!noteName || !details}
          iconRight={loading && <Spinner />}
        >
          Add new note
        </Button>
      </Form>
    </Dialog>
  );
};
