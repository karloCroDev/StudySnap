'use client';

// External packages
import * as React from 'react';
import { RadioGroup, Radio, Form } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import { Pencil1Icon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogChangeDetails: React.FC<{
  noteId: string;
  noteName: string;
  setNoteName: React.Dispatch<React.SetStateAction<string>>;
  setNoteDetails: React.Dispatch<React.SetStateAction<string>>;
}> = ({ noteId, noteName, setNoteName, setNoteDetails }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [isPublic, setIsPublic] = React.useState(false); // Provjeri da li ovo radi na backendu
  const [name, setName] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  console.log(isPublic);

  const toast = useToastStore((state) => state.setToast);

  const changeDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/core/home/notes',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ noteName: name, details, isPublic, noteId }),
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
      const syncName = name || noteName;
      toast({
        title: `${syncName} note updated`,
        content: `You have succesfully updated ${syncName}`,
        variant: 'success',
      });

      if (name) setNoteName(name);
      if (details) setNoteDetails(details);

      setName('');
      setDetails('');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content: 'Failed to create note',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Change note's details"
      triggerProps={{
        children: (
          <Pencil1Icon
            className={twJoin(
              'size-9 transition-colors hover:text-blue-400 lg:size-7'
            )}
          />
        ),
      }}
    >
      <Form className="flex flex-col gap-5" onSubmit={changeDetails}>
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
          iconLeft={loading && <Spinner />}
        >
          Save
        </Button>
      </Form>
    </Dialog>
  );
};
