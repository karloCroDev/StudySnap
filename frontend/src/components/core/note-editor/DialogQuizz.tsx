'use client';

// External packages
import * as React from 'react';
import { Editor as EditorType } from '@tiptap/react';
import { Button as ReactAriaButton } from 'react-aria-components';
import { CheckCircledIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';

export const DialogQuizz: React.FC<{
  children: React.ReactNode;
  editor: EditorType;
}> = ({ editor, children }) => {
  const toast = useToastStore((state) => state.setToast);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasBeenActivated, setHasBeenActivated] = React.useState(false);
  const [quizzData, setQuizzData] = React.useState<
    {
      question: string;
      content: string[];
      correct: number;
    }[]
  >([]);
  const [questionCount, setQuestionCount] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  console.log(quizzData);
  React.useEffect(() => {
    const generateQuizzData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:4000/quizz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context: editor?.getText(),
          }),
        });
        const data = await response.json();
        const dataJSON = JSON.parse(data);
        setQuizzData(dataJSON);
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
      setHasBeenActivated(true);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="WWII Quizz"
      triggerProps={{
        asChild: true,
        children: children,
      }}
    >
      {isLoading ? (
        <div className="flex h-32 items-center justify-center text-blue-400">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {questionCount === quizzData.length ? (
            <>
              <CheckCircledIcon className="size-32 text-green-400" />
              <p className="text-center text-md font-medium">
                You have answered {correctAnswers} / {quizzData.length}{' '}
                questions correctly
              </p>
              <Button rounded="full" onPress={() => setIsOpen(false)}>
                Finish
              </Button>
            </>
          ) : (
            <>
              <h4 className="text-center text-md font-medium">
                {quizzData[questionCount]?.question}
              </h4>
              <LayoutRow className="w-full justify-center">
                {quizzData[questionCount]?.content.map((answer, index) => (
                  <LayoutColumn xs={12} md={6} className="p-2" key={index}>
                    <ReactAriaButton
                      className="h-16 w-full rounded border border-blue-400 text-md text-blue-900 outline-none"
                      onPress={() => {
                        if (index === quizzData[questionCount]?.correct - 1) {
                          setCorrectAnswers((prev) => prev + 1);
                        }
                        setQuestionCount(questionCount + 1);
                      }}
                    >
                      {answer}
                    </ReactAriaButton>
                  </LayoutColumn>
                ))}
              </LayoutRow>
              <p className="text-gray-500">
                {questionCount + 1}/{quizzData.length} questions passed
              </p>
            </>
          )}
        </div>
      )}
    </Dialog>
  );
};
