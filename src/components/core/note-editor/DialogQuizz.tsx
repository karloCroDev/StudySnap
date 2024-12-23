'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';
import { Editor as EditorType } from '@tiptap/react';
import { Button as ReactAriaButton } from 'react-aria-components';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';

export const DialogQuizz: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="WWII Quizz"
      triggerProps={{
        children,
        asChild: true,
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-lg font-medium">Who started WWII?</h4>
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
        <p className="text-gray-500"> 1/10 questions passed</p>
      </div>
    </Dialog>
  );
};
