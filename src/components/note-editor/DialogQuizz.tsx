'use client';

// External packages
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';
import { Button as ReactAriaButton } from 'react-aria-components';
import { CheckCircledIcon, MagicWandIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useGenerateQuizz } from '@/hooks/note-editor/useGenerateQuizz';

export const DialogQuizz: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [questionCount, setQuestionCount] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const { isLoading, quizzData } = useGenerateQuizz({
    isOpen,
    editor,
    setIsOpen,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Quizz"
      triggerProps={{
        asChild: true,
        children: (
          <>
            <Button
              rounded="full"
              colorScheme="black"
              variant="outline"
              iconLeft={<MagicWandIcon className="size-5" />}
              className="min-w-fit"
              onPress={() => setIsOpen(true)}
            >
              Quizz yourself
            </Button>
          </>
        ),
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
              <LayoutRow
                className="w-full animate-slide-in-quizz justify-center"
                key={questionCount} // This rerenders the quizz animation
              >
                {quizzData[questionCount]?.content.map((answer, index) => (
                  <LayoutColumn xs={12} md={6} className="p-2" key={index}>
                    <ReactAriaButton
                      className="min-h-16 w-full text-balance rounded border border-blue-400 text-md text-blue-900 outline-none"
                      onPress={(e) => {
                        e.target.classList.add('text-gray-100');
                        if (index === quizzData[questionCount]?.correct - 1) {
                          setCorrectAnswers((prev) => prev + 1);
                          e.target.classList.add('bg-green-400');
                        } else {
                          e.target.classList.add('bg-red-400');
                        }
                        setTimeout(() => {
                          setQuestionCount(questionCount + 1);
                          // Waiting for two seconds to display feedback to user
                          e.target.classList.remove('bg-green-400');
                          e.target.classList.remove('bg-red-400');
                          e.target.classList.remove('text-gray-100');
                        }, 2000);
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
