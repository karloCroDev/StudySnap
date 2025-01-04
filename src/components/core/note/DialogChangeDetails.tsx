'use client';
// External packages
import * as React from 'react';
import { RadioGroup, Radio, Form } from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogChangeDetails: React.FC<{
  children: React.ReactNode,
  noteId: string;
}> = ({ children, noteId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  const [noteName, setNoteName] = React.useState('');
  const [details, setDetails] = React.useState('');

  const toast = useToastStore((state) => state.setToast);

  const changeDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/core/home/notes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteName, details, isPublic, noteId }),
      });

      if (response.ok) {
        toast({
          title: `${noteName} note changed`,
          content: `You have succesfully changed ${noteName}`,
          variant: 'success',
        });
      }
      else if (response.status === 400) {
        toast({
          title: 'Missing required fields',
          content: 'Please make sure you have entered all the credentials correctly and try again',
          variant: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content:
          'Failed to create note',
        variant: 'error',
      });
    }

    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Change note's details"
      triggerProps={{
        asChild: true,
        children,
      }}
    >
      <Form className="flex flex-col gap-5" onSubmit={changeDetails}>
        <Input
          type="text"
          label="Note name"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter note name',
            // onChange: (e) => setNoteName(e.target.value),
          }}
          onChange={(val) => setNoteName(val.toString())}
        />
        <Input
          type="text"
          label="Details "
          isMdHorizontal
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
        <Button className="self-end" type="submit">
          Change note
        </Button>
      </Form>
    </Dialog>
  );
};
