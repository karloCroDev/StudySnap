'use client';

// External packages
import * as React from 'react';
import { Editor as EditorType } from '@tiptap/react';
import { Button as ReactAriaButton } from 'react-aria-components';
import { CheckCircledIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';

export const DialogQuizz: React.FC<{
  children: React.ReactNode;
  editor: EditorType;
}> = ({ editor, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // React.useEffect(() => {
  //   const generateQuizzData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/quizz', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           context: editor?.getText(),
  //         }),
  //       });
  //       const data = await response.json();
  //       const dataJSON = JSON.parse(data);
  //       console.log(dataJSON);
  //     } catch (error) {
  //       console.error('Failed to generate quizz:', error);
  //     }
  //   };

  //   if (isOpen) generateQuizzData();
  // }, []);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="WWII Quizz"
      triggerProps={{
        asChild: true,
        children: children,
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* <h4 className="text-lg font-medium">Who started WWII?</h4>
        <LayoutRow className="w-full justify-center">
          <LayoutColumn xs={12} md={6} className="p-2">
            <ReactAriaButton className="h-16 w-full rounded border border-blue-400 text-md text-blue-900 outline-none">
              Stalin
            </ReactAriaButton>
          </LayoutColumn>
          <LayoutColumn xs={12} md={6} className="p-2">
            <ReactAriaButton className="h-16 w-full rounded border border-blue-400 text-md text-blue-900 outline-none">
              Stalin
            </ReactAriaButton>
          </LayoutColumn>
          <LayoutColumn xs={12} md={6} className="p-2">
            <ReactAriaButton className="h-16 w-full rounded border border-blue-400 text-md text-blue-900 outline-none">
              Stalin
            </ReactAriaButton>
          </LayoutColumn>
          <LayoutColumn xs={12} md={6} className="p-2">
            <ReactAriaButton className="h-16 w-full rounded border border-blue-400 text-md text-blue-900 outline-none">
              Stalin
            </ReactAriaButton>
          </LayoutColumn>
        </LayoutRow>
        <p className="text-gray-500"> 1/10 questions passed</p> */}

        <CheckCircledIcon className="size-32 text-green-400" />
        <p className="text-center text-md font-medium">
          You have answered 9/10 questions correctly
        </p>
        <Button rounded="full" onPress={() => setIsOpen(false)}>
          Finish
        </Button>
      </div>
    </Dialog>
  );
};
