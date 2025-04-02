'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Dialog logic to enable user to adapt their application with power of AI
export const useUploadImage = ({
  image,
  editor,
  setIsOpen,
}: {
  editor: EditorType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: File;
}) => {
  const [loading, setLoading] = React.useState(false);

  const uploadUsersImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      if (image) formData.append('file', image); // Karlo: Add better insight while checking
      const response = await fetch(
        'http://localhost:3000/api/core/home/notes/editor',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      editor.chain().focus().setImage({ src: data }).run();
    } catch (error) {
      console.error('Failed to complete sentence:', error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return {
    uploadUsersImage,
    loading,
  };
};
