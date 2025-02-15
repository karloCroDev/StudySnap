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
import { Editor as EditorType } from '@tiptap/react';
import { QuestionMarkCircledIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import ReactMarkdown from 'react-markdown';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useToastStore } from '@/store/useToastStore';
import { Spinner } from '@/components/ui/Spinner';

export const DialogAskAI: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const toast = useToastStore((state) => state.setToast);

  const [isOpen, setIsOpen] = React.useState(false);

  const [prompt, setPrompt] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<
    {
      authorOfMessage: 'ai' | 'user';
      content: string;
    }[]
  >([]);

  const [loading, setLoading] = React.useState(false);

  console.log(chatHistory);
  const getAskAiResponse = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/ai/ask-ai', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          editorContent: editor.getHTML(),
          chatHistory,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Failed to get response',
          content: data.statusText, // This data is status text
          variant: 'error',
        });
        return;
      }

      const { statusText, ...filtredResponse } = data;
      console.log(statusText);
      setChatHistory((prevValue) => [...prevValue, filtredResponse]);
      setPrompt('');
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'Failed to get notes',
        content: 'Please try again later, problem with server',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Ask AI"
      triggerProps={{
        children: (
          <Button
            colorScheme="black"
            variant="outline"
            rounded="full"
            className="min-w-fit"
            iconLeft={<QuestionMarkCircledIcon className="size-5" />}
            iconRight={loading && <Spinner />}
            onPress={() => setIsOpen(true)}
            // onPressStart={() => setIsOpen(true)}
          >
            Ask AI
          </Button>
        ),
        asChild: true,
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
        <div className="overflow-scroll">
          {/* Was having render issues with font, so I need to do like this overflow scroll */}
          <div className="relative flex h-80 flex-col gap-4 rounded p-4">
            {chatHistory.length
              ? chatHistory.map((message) =>
                  message.authorOfMessage === 'ai' ? (
                    <div className="z-[99999] max-w-[75%] rounded bg-blue-400 p-2 text-gray-100">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="max-w-[75%] self-end rounded bg-blue-900 p-2 text-gray-100">
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
              <div className="min-h-4 w-[75%] animate-pulse rounded-full bg-gray-700 text-gray-100"></div>
            )}
          </div>
        </div>
        <TextField
          isRequired
          minLength={5}
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
