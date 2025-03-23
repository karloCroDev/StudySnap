'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Saving document
export const useSaveDocument = ({
  documentId,
  setIsEditing,
  editor,
}: {
  documentId: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editor: EditorType;
}) => {
  const [loadingSaveDocument, setLoadingSaveDocument] = React.useState(false);
  const toast = useToastStore((state) => state.setToast);

  const saveDocument = async () => {
    try {
      setLoadingSaveDocument(true);
      const formData = new FormData();
      formData.append('content', editor!.getHTML());
      formData.append('noteId', documentId);
      const response = await fetch(
        'http://localhost:3000/api/core/home/notes',
        {
          method: 'PATCH',
          body: formData,
        }
      );
      if (!response.ok) {
        toast({
          title: 'Problem with getting data',
          content: 'Problem with getting data, please try again!',
          variant: 'error',
        });
        return;
      }
      toast({
        title: 'Saved 🥳',
        content: 'Your notes have been saved',
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
