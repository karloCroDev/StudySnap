'use client';

// External packages
import * as React from 'react';
import {
  Button as AriaButton,
  FieldError,
  Form,
  Input,
  TextField,
} from 'react-aria-components';
import { type Editor as EditorType } from '@tiptap/react';
import { QuestionMarkCircledIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import ReactMarkdown from 'react-markdown';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useAskAI } from '@/hooks/note-editor/useAskAI';

export const DialogAskAI: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    getAskAiResponse,
    loading,
    prompt,
    setPrompt,
    chatHistory,
    setChatHistory,
  } = useAskAI({
    editor,
    setIsOpen,
  });

  const chatContainerRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollToTheResponse = () => {
      const element = chatContainerRef.current;
      if (element) element.scrollTop = element.scrollHeight;
    };
    scrollToTheResponse();
  }, [chatHistory]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Ask AI"
      triggerProps={{
        asChild: true,
        children: (
          <>
            <Button
              colorScheme="black"
              variant="outline"
              rounded="full"
              className="min-w-fit"
              iconLeft={<QuestionMarkCircledIcon className="size-5" />}
              iconRight={loading && <Spinner />}
              onPress={() => setIsOpen(true)}
            >
              Ask AI
            </Button>
          </>
        ),
      }}
    >
      <Form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          setChatHistory((prevValue) => [
            ...prevValue,
            { content: prompt, authorOfMessage: 'user' },
          ]);
          getAskAiResponse();
        }}
      >
        <div className="overflow-scroll scroll-smooth" ref={chatContainerRef}>
          {/* Was having render issues with font, so I need to do like this overflow scroll */}
          <div className="relative flex h-80 flex-col gap-4 rounded p-4">
            {chatHistory.length
              ? chatHistory.map((message, index) =>
                  message.authorOfMessage === 'ai' ? (
                    <div
                      className="z-[99999] max-w-[75%] rounded bg-blue-400 p-2 text-gray-100"
                      key={index}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div
                      className="max-w-[75%] self-end rounded bg-blue-900 p-2 text-gray-100"
                      key={index}
                    >
                      {message.content}
                    </div>
                  )
                )
              : !chatHistory.length && (
                  <p className="absolute top-1/2 w-full -translate-y-1/2 text-center text-sm text-gray-400 sm:text-base">
                    Please ask any question about document...
                  </p>
                )}
            {loading && (
              <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    className="min-h-4 w-[75%] animate-pulse rounded bg-gray-700"
                    key={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <TextField
          isRequired
          minLength={2}
          className="mt-4 outline-none"
          onChange={(val) => setPrompt(val.toString())}
          value={prompt}
        >
          <div className="relative">
            <Input
              placeholder="Enter your question.."
              className="a h-12 w-full rounded border-2 border-blue-900 p-2 focus:border-blue-900"
            />
            <AriaButton
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-400 outline-none"
            >
              {loading ? (
                <Spinner />
              ) : (
                <PaperPlaneIcon className="size-6 bg-gray-100" />
              )}
            </AriaButton>
          </div>

          <FieldError className="!mt-2 text-red-400" />
        </TextField>
      </Form>
    </Dialog>
  );
};
