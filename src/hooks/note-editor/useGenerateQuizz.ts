'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';

// Store
import { useToastStore } from '@/store/useToastStore';

export type QuizzData = {
  question: string;
  content: string[];
  correct: number;
}[];

// Dialog logic to enable user to adapt their application with power of AI
export const useGenerateQuizz = (editor: EditorType) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);
  const [isLoading, setIsLoading] = React.useState(false);

  // Handling the activation of creating a quizz when user enters the dialog, creating only one, if he tries again Quizz himself!
  const [hasBeenActivated, setHasBeenActivated] = React.useState(false);
  const [quizzData, setQuizzData] = React.useState<QuizzData>([]);

  console.log(quizzData);
  React.useEffect(() => {
    const generateQuizzData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/ai/quizz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context: editor?.getText(),
          }),
        });
        const data = await response.json();
        if (response.ok) {
          const dataJSON = JSON.parse(data);
          setQuizzData(dataJSON);
          setHasBeenActivated(true);
        }
      } catch (error) {
        console.error('Failed to generate quizz:', error);
        setIsOpen(false);
        toast({
          title: 'Failed to generate quizz',
          content: 'Please try again later, problem with server',
          variant: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && !hasBeenActivated) {
      generateQuizzData();
    }
  }, [isOpen]);

  return {
    quizzData,
    isLoading,
    setIsOpen,
    isOpen,
  };
};
