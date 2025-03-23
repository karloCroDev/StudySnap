'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useAskAI = ({
  editor,
  setIsOpen,
}: {
  editor: EditorType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toast = useToastStore((state) => state.setToast);
  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState('');

  const [chatHistory, setChatHistory] = React.useState<
    {
      authorOfMessage: 'ai' | 'user';
      content: string;
    }[]
  >([]);

  const getAskAiResponse = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/ai/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          editorContent: editor.getHTML(),
          chatHistory,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Failed to get response',
          content: data.statusText, // This data is status text
          variant: 'error',
        });
        setIsOpen(false);
        return;
      }

      const { statusText, ...filtredResponse } = data;
      console.log(statusText);
      setChatHistory((prevValue) => [...prevValue, filtredResponse]);
      setPrompt('');
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'Failed to get notes',
        content: 'Please try again later, problem with server',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    prompt,
    setPrompt,
    loading,
    getAskAiResponse,
    chatHistory,
    setChatHistory,
  };
};
