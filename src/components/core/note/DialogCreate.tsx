'use client';

// External packages
import * as React from 'react';
import { RadioGroup, Label, Radio, Form } from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const DialogCreate: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false); // Bit ce slanje podataka paaaaa msm da ne treba close
  const [image, setImage] = React.useState<File | null>(null);
  const imageNameArray = image?.name.split('.');
  console.log(imageNameArray);

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
      <Form className="flex flex-col gap-5">
        <Input
          isRequired
          type="text"
          label="Note name"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter note name',
          }}
        />
        <Input
          type="text"
          label="Details (optional)"
          isMdHorizontal
          inputProps={{
            placeholder: "Enter your note's details (optional)",
          }}
        />
        <div className="flex items-center">
          <p className="flex-1 text-end text-md">Make it public</p>
          <RadioGroup
            className="flex flex-[2] justify-center gap-6"
            defaultValue="false"
          >
            <Radio
              value="true"
              className="group flex cursor-pointer items-center gap-2 text-md"
            >
              Yes
              <div className="size-8 rounded-full bg-green-400 transition-[border] duration-300 group-data-[selected]:border-[8px] group-data-[selected]:border-gray-900"></div>
            </Radio>
            <Radio
              value="false"
              className="group flex cursor-pointer items-center gap-2 text-md"
            >
              No
              <div className="size-8 rounded-full bg-red-400 transition-[border] duration-300 group-data-[selected]:border-[8px] group-data-[selected]:border-gray-900"></div>
            </Radio>
          </RadioGroup>
        </div>
        <Button className="self-end" onClick={() => setIsOpen(false)}>
          Add new subject
        </Button>
      </Form>
    </Dialog>
  );
};
