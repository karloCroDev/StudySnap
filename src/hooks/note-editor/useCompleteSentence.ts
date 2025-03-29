'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Sentecne completion
export const useCompleteSentence = ({
  isEditing,
  editor,
}: {
  isEditing: boolean;
  editor: EditorType;
}) => {
  const [completionLoading, setCompletionLoading] = React.useState(false);
  const completeSentence = async () => {
    const context = editor?.getText();

    try {
      setCompletionLoading(true);
      const response = await fetch('http://localhost:3000/api/ai/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context }),
      });

      const data = await response.json();
      if (response.ok) editor?.commands.insertContent(data);
    } catch (error) {
      console.error('Failed to complete sentence:', error);
    } finally {
      setCompletionLoading(false);
    }
  };

  // Autocompletion AI feature
  React.useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        await completeSentence();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  // Setting the editor to be editable
  React.useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [isEditing, editor]);

  return completionLoading;
};
