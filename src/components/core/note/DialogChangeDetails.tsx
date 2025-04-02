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
import { useChangeDetailsNote } from '@/hooks/core/home/notes/useChangeDetailsNote';

// Dialog that changes details for each individual note card on frontend
export const DialogChangeDetails: React.FC<{
  noteId: number;
  // These are props (from note card) that are needed in order to update the Note card on frontend, and to display current details (title, desc...) in input fields etc.
  noteName: string;
  setNoteName: React.Dispatch<React.SetStateAction<string>>;
  noteDetails: string;
  setNoteDetails: React.Dispatch<React.SetStateAction<string>>;
  isNotePublic: boolean;
  setNoteImage: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactNode;
}> = ({
  children,
  noteId,
  noteName,
  setNoteName,
  noteDetails,
  setNoteDetails,
  isNotePublic,
  setNoteImage,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [isPublic, setIsPublic] = React.useState(Boolean(isNotePublic));
  const [name, setName] = React.useState(noteName);
  const [details, setDetails] = React.useState(noteDetails);
  const [image, setImage] = React.useState<File | null>(null);

  // Since this is a dialog that changes details for each individual note card, we need to pass these props to the useChangeDetails hook in order to update the Note card on frontend, and to display current details (title, desc...) in input fields etc. That is the reason why this hook is robust and couldn't be more simplified
  const { updateDetailsReq, loading } = useChangeDetailsNote({
    details,
    image,
    isPublic,
    name,
    noteId,
    setNoteDetails,
    setNoteImage,
    setNoteName,
    setIsOpen,
  });
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Change note's details"
      triggerProps={{
        children,
      }}
    >
      <Form className="flex flex-col gap-5" onSubmit={updateDetailsReq}>
        <Input
          type="text"
          label="Note name"
          minLength={3}
          maxLength={24}
          isMdHorizontal
          value={name}
          inputProps={{
            placeholder: 'Enter note name',
          }}
          onChange={(val) => {
            setName(val.toString());
          }}
        />
        <Input
          type="text"
          label="Details"
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
              label="Image"
              isMdHorizontal
              isReadOnly
              inputProps={{
                placeholder: 'Enter thumbnail image ',
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
            defaultValue={isNotePublic ? 'true' : 'false'}
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
          isDisabled={
            !image &&
            name === noteName &&
            details === noteDetails &&
            isPublic == isNotePublic
          }
          iconRight={loading && <Spinner />}
        >
          Save
        </Button>
      </Form>
    </Dialog>
  );
};
