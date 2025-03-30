'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Hooks
import { useClientImage } from '@/hooks/useClientImage';

// Store
import { useToastStore } from '@/store/useToastStore';

// Dialog logic to enable user to adapt their application with power of AI
export const useImageOcr = ({
  editor,
  setIsOpen,
}: {
  editor: EditorType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toast = useToastStore((state) => state.setToast);
  const [loading, setLoading] = React.useState(false);

  const [prompt, setPrompt] = React.useState('');

  const [image, setImage] = React.useState<null | File>(null);
  const [pdf, setPdf] = React.useState<null | File>(null);

  const getNotesFromImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('prompt', prompt);

      if (image) formData.append('file', image);
      if (pdf) formData.append('file', pdf);

      const response = await fetch(
        image
          ? 'http://localhost:3000/api/ai/image-note'
          : 'http://localhost:3000/api/ai/pdf-note',
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
