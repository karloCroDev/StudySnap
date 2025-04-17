'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Dialog logic to enable user to adapt their application with power of AI
export const useAnalyseAI = ({
  editor,
  setIsOpen,
  image,
  pdf,
  prompt,
  setImage,
  setPdf,
  setPrompt,
}: {
  editor: EditorType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: File | null;
  pdf: File | null;
  prompt: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setPdf: React.Dispatch<React.SetStateAction<File | null>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const toast = useToastStore((state) => state.setToast);
  const [loading, setLoading] = React.useState(false);

  const getNotesFromImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('prompt', prompt);

      if (image) formData.append('file', image);
      if (pdf) formData.append('file', pdf);

      const response = await fetch(
        image ? '/api/ai/image-note' : '/api/ai/pdf-note',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Failed to get notes',
          content: data, // This data is status text
          variant: 'error',
        });
        return;
      }
      editor?.commands.insertContent(data);
      toast({
        title: 'Notes genearted',
        content: 'Notes generated successfully from your image',
        variant: 'success',
      });
      setPrompt('');
      setPdf(null);
      setImage(null);
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'Failed to get notes',
        content: 'Please try again later, problem with server',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return {
    getNotesFromImage,
    loading,
    prompt,
    image,
    pdf,
    setPrompt,
    setImage,
    setPdf,
  };
};
