'use client';

// External packages
import * as React from 'react';
import { TextField, FieldError, TextArea, Label } from 'react-aria-components';
import { Form } from 'react-aria-components';
import { Editor as EditorType } from '@tiptap/react';
import { MagicWandIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useToastStore } from '@/store/useToastStore';
// import { Input } from '@/components/ui/Input';

export const DialogGenerateContent: React.FC<{
  children: React.ReactNode;
  editor: EditorType;
}> = ({ editor, children }) => {
  const toast = useToastStore((state) => state.setToast);

  const [isOpen, setIsOpen] = React.useState(false);

  const [prompt, setPrompt] = React.useState('');

  const generateText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const context = editor?.getText();
    try {
      const response = await fetch('http://localhost:4000/completion-context', {
        method: 'POST',
        body: JSON.stringify({ prompt, context }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      editor?.commands.setContent(data);
      toast({
        title: 'Generated successfully',
        content: 'Your text has been generated successfully',
        variant: 'success',
      });
    } catch (error) {
      console.error('Failed to complete sentence:', error);
      toast({
        title: 'Failed to generate',
        content: 'Please try again later',
        variant: 'success',
      });
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Generate content"
      triggerProps={{
        children,
        asChild: true,
      }}
    >
      <Form className="flex flex-col" onSubmit={(e) => generateText(e)}>
        <TextField
          isRequired
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
          iconLeft={<MagicWandIcon className="size-5" />}
          className="mt-2 self-end"
        >
          Generate
        </Button>
      </Form>
    </Dialog>
  );
};
