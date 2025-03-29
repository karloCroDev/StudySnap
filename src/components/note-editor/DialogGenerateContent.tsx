'use client';

// External packages
import * as React from 'react';
import { TextField, FieldError, TextArea } from 'react-aria-components';
import { Form } from 'react-aria-components';
import { type Editor as EditorType } from '@tiptap/react';
import { MagicWandIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useGenerateContent } from '@/hooks/note-editor/useGenerateContent';

// Dialog that adapts the text based on users input using AI
export const DialogGenerateContent: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { generateText, loading, setPrompt, prompt } = useGenerateContent({
    setIsOpen,
    editor,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Generate content"
      triggerProps={{
        children: (
          <>
            <Button
              variant="solid"
              rounded="full"
              iconLeft={<MagicWandIcon className="size-5" />}
              className="min-w-fit"
              onPress={() => setIsOpen(true)}
            >
              Generate content
            </Button>
          </>
        ),
        asChild: true,
      }}
    >
      <Form className="flex flex-col" onSubmit={(e) => generateText(e)}>
        <TextField
          isRequired
          minLength={5}
          className="outline-none"
          onChange={(val) => setPrompt(val.toString())}
        >
          <TextArea
            className="h-52 w-full resize-none rounded-lg border-2 border-blue-900 bg-gray-100 p-2 placeholder:text-sm active:border-blue-900"
            placeholder="Enter a prompt to continue (based on context of text) or start new content"
          />
          <FieldError className="text-red-400" />
        </TextField>
        <Button
          type="submit"
          isDisabled={!prompt}
          iconLeft={<MagicWandIcon className="size-5" />}
          iconRight={loading && <Spinner />}
          className="mt-2 self-end"
        >
          Generate
        </Button>
      </Form>
    </Dialog>
  );
};
