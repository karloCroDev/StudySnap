'use client';
// External packages
import * as React from 'react';
import { RadioGroup, Radio, Form } from 'react-aria-components';
import { Editor as EditorType } from '@tiptap/react';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const DialogURL: React.FC<{
  children: React.ReactNode;
  editor: EditorType;
}> = ({ editor, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Add image to document"
      triggerProps={{
        asChild: true,
        children,
      }}
    >
      <Form className="flex flex-col gap-5">
        <Input
          isRequired
          type="text"
          label="URL"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter image URL',
            onChange: (e) => setImageUrl(e.target.value),
          }}
        />
        <Button
          onPress={() => {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setIsOpen(false);
          }}
          className="self-end"
        >
          Add image
        </Button>
      </Form>
    </Dialog>
  );
};
