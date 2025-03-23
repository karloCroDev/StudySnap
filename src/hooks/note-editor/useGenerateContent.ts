'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Dialog logic to enable user to adapt their application with power of AI
export const useGenerateContent = ({
  editor,
  setIsOpen,
}: {
  editor: EditorType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toast = useToastStore((state) => state.setToast);
  const [loading, setLoading] = React.useState(false);

  const [prompt, setPrompt] = React.useState('');

  const generateText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const context = editor?.getText();
      const response = await fetch(
        'http://localhost:3000/api/ai/completion-context',
        {
          method: 'POST',
          body: JSON.stringify({ prompt, context }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        editor?.commands.setContent(data);
        toast({
          title: 'Generated successfully',
          content: 'Your text has been generated successfully',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Failed to complete sentence:', error);
      toast({
        title: 'Failed to generate',
        content: 'Please try again later',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return {
    prompt,
    setPrompt,
    loading,
    generateText,
  };
};
