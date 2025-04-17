'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Saving document
export const useSaveDocument = ({
  noteId,
  setIsEditing,
  editor,
}: {
  noteId: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editor: EditorType | null;
}) => {
  const [loadingSaveDocument, setLoadingSaveDocument] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);
  const saveDocument = async () => {
    try {
      setLoadingSaveDocument(true);
      const formData = new FormData();
      formData.append('content', editor!.getHTML());
      formData.append('noteId', noteId.toString());
      const response = await fetch('/api/core/home/notes', {
        method: 'PATCH',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Problem with getting data',
          content: data.message,
          variant: 'error',
        });
        return;
      }
      toast({
        title: 'Saved 🥳',
        content: data.message,
        variant: 'success',
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Problem with getting data',
        content: 'Problem with getting data, please try again!',
        variant: 'error',
      });
    } finally {
      setLoadingSaveDocument(false);
    }
  };
  return { saveDocument, loadingSaveDocument };
};
